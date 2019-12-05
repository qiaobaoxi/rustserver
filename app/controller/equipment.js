'use strict';

const Controller = require('../core/base_controller');
class EquipmentController extends Controller {
  async saveEquipment(){
    //设备名字和数据
    const {companyId,name}=this.ctx.request.body;
    const isUser = await this.ctx.service.equipment.find({name});
    if(!isUser){
      try {
        await this.ctx.service.equipment.save(name,companyId);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
    }else{
      this.fail({msg:"设备名已存在"})
    }
  }
  async getEquipment(){
    const {sign,id}=this.ctx.request.query;
    try {
      //sign表示是不是登录完之后查询的
      if(sign==1){
        const result = await this.ctx.service.equipment.find({id});
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async getAllEquipment(){
    //sign表示是不是登录完之后查询的
    const {sign,userId}=this.ctx.request.query;
    console.log(userId)
    try {
      if(sign==1){
        if(userId){
          const  user= await this.ctx.service.user.find({id:userId});
          const equipments = await this.ctx.service.equipment.getAll(Number(user.companyId));
          let result=[];
          for(let i=0;i<equipments.result.length;i++){
            const data = await this.ctx.service.equipmentData.getAllByEquipmentnum({equipmentnum:equipments.result[i].name});
            result.push(...data);   
          }
          this.success(result); 
        }else{
          let result = await this.ctx.service.equipmentData.getAll();
          this.success(result);
        }
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async deleteEquipment(){
    const {sign}=this.ctx.request.query;
    const {id}=this.ctx.request.body;
    try {
      if(sign==1){
        await this.ctx.service.equipment.delete(id);
        this.success();  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async updateEquipment(){
    const {id,user,password}=this.ctx.request.body;
    try {
      await this.ctx.service.equipment.update(id,user,password);
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async getEquipmentData(){
    const {menuId,engineerNum,equpmentNumOfArea,equipmentName}=this.ctx.request.query;
    try {
      let associateddevices=await this.ctx.service.associatedDevice.getAllMenuAssociate(menuId);
      let fileName=await this.getFileName(associateddevices,engineerNum,equpmentNumOfArea,equipmentName)
      let result=await this.ctx.curl('http://47.111.115.157/data/'+fileName, {
        dataType: 'text',
        contentType:'application/json'
      });
      if(result.status==200){
        this.success({data:result.data,fileName});  
      }else{
        this.fail({msg:"数据暂时不存在"})
      }
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async fileExisted(){
    const {menuId,engineerNum,twoLevelMenuId,equipmentName}=this.ctx.request.query;
    try {
      let twolevelmenu=await this.ctx.service.twoLevelMenu.find({id:twoLevelMenuId})
      let associateddevices=await this.ctx.service.associatedDevice.getAllMenuAssociate(menuId);
      let result=[]
      for(let i=1;i<=twolevelmenu.equpmentNumOfArea;i++){
        let fileName=await this.getFileName(associateddevices,engineerNum,i,equipmentName)
        let isExisted=0;
        if(fileName){
          isExisted=1
        }
        result.push({index:i,isExisted})
      }
      this.success(result)
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async getFileName(associateddevices,engineerNum,equpmentNumOfArea,equipmentName){
    let fileName="";
    if(equipmentName){
      fileName=equipmentName;
    }else{
      for(let i=0;i<associateddevices.length;i++){
        let equipmentData= await this.ctx.service.equipmentData.getFileName(associateddevices[i].equipmentDataId,engineerNum,equpmentNumOfArea)
        if(equipmentData){
          fileName=equipmentData.name;
        }
      }
    }
    return fileName;
  }
}

module.exports = EquipmentController;

'use strict';

const Controller = require('../core/base_controller');
class TwoLevelMenuController extends Controller {
  async saveTwoLevelMenu(){
    //设备名字和数据
    const {menuId,name}=this.ctx.request.body;
    const isMenu = await this.ctx.service.twoLevelMenu.find({name});
    if(!isMenu){
      try {
        await this.ctx.service.twoLevelMenu.save(menuId,name);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
    }else{
      this.fail({msg:"菜单名已存在"})
    }
  }
  async getAllTwoLevelMenuByMenuId(){
    //sign表示是不是登录完之后查询的
    const {sign,menuId}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.twoLevelMenu.getAll(menuId);
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async getAllTwoLevelMenu(){
    //sign表示是不是登录完之后查询的
    const {sign,nowPage,userId}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.twoLevelMenu.getAllByPage(nowPage,userId);
        result.result=await Promise.all(result.result.map(async(item)=>{
          let equipments=[];
          let associatedDevice=await this.ctx.service.associatedDevice.getAllTwoLevelMenuAssociate(item.id);
          for(let item of associatedDevice){
            let equipment=await this.ctx.service.equipment.find({id:item.equipmentId});
            equipments.push(equipment);
          }
          item.equipments=equipments;
          return item;
        }))
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async associatedDevice(){
    const {sign,twoLevelMenuId,equipments}=this.ctx.request.body;
    try {
      for(let i=0;i<equipments.length;i++){
        await this.ctx.service.associatedDevice.saveTwoLevelMenuAssociate(twoLevelMenuId,equipments[i])
      }
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async updateTwoLevelMenu(){
    //设备名字和数据
    const {id,name}=this.ctx.request.body;
      try {
        await this.ctx.service.twoLevelMenu.update(id,name);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
  }
  async deleteAssociatedDevice(){
    const {sign}=this.ctx.request.query;
    const {twoLevelMenuId,equipmentId}=this.ctx.request.body;
    console.log(twoLevelMenuId,equipmentId)
    try {
      if(sign&&typeof twoLevelMenuId==='number'&&typeof equipmentId==='number'){
        await this.ctx.service.associatedDevice.deleteAssociatedDevice(twoLevelMenuId,equipmentId)
        this.success();
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = TwoLevelMenuController;

'use strict';

const Controller = require('../core/base_controller');
class AssociatedDeviceController extends Controller {
  //给用户分配设备
  async relevanceEquipment(){
    const {userId,equipmentsId}=this.ctx.request.body;
    try {
      await this.ctx.service.relevance.deleteRelevanceByParams({userId});
      for(let i=0;i<equipmentsId.length;i++){
        let equipments = await this.ctx.service.relevance.getRelevanceByParams({userId,equipmentId:equipmentsId[i]});
        if(equipments.length===0){
          await this.ctx.service.relevance.relevance(userId,equipmentsId[i]);
        } 
      }
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  //给工程分配设备
  async associatedDevice(){
    const {sign,menuId,equipments,userId}=this.ctx.request.body;
    try {
      if(userId){
        let user=await this.ctx.service.user.find({id:userId}) 
        if(user.controll==0){
          return this.fail({msg:"当前用户是只看模式"})    
        }
      }else{
        return this.fail({msg:"请登录"})
      }
      let associatedDevice=await this.ctx.service.associatedDevice.getAllMenuAssociate(menuId);
      for(let i=0;i<associatedDevice.length;i++){
        await this.ctx.service.associatedDevice.deleteAssociatedDevice(menuId,associatedDevice[i].equipmentDataId);
      }
      for(let i=0;i<equipments.length;i++){
        await this.ctx.service.associatedDevice.saveMenuAssociate(menuId,equipments[i])
      }
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  //删除工程下的设备
  async deleteAssociatedDevice(){
    const {sign}=this.ctx.request.query;
    const {twoLevelMenuId,equipmentId,userId}=this.ctx.request.body;
    try {
      if(userId){
        let user=await this.ctx.service.user.find({id:userId}) 
        if(user.controll==0){
          return this.fail({msg:"当前用户是只看模式"})    
        }
      }else{
        return this.fail({msg:"请登录"})
      }
      if(sign&&typeof twoLevelMenuId==='number'&&typeof equipmentId==='number'){
        await this.ctx.service.associatedDevice.deleteAssociatedDevice(twoLevelMenuId,equipmentId)
        this.success();
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  //删除用户下的设备
  async deleteUserAssociatedDevice(){
    const {sign}=this.ctx.request.query;
    const {userId,equipmentId}=this.ctx.request.body;
    try {
      
      if(sign&&typeof userId==='number'&&typeof equipmentId==='number'){
        await this.ctx.service.associatedDevice.deleteUserAssociatedDevice(userId,equipmentId)
        this.success();
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  //得到工程下面的设备
  async getAllEquipmentByMenuId(){
    const {sign,menuId}=this.ctx.request.query;
    try {
      if(sign){
        let result=await this.ctx.service.associatedDevice.getAllEquipmentByMenuId(menuId);
        this.success(result);
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = AssociatedDeviceController;

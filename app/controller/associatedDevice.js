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
  //删除工程下的设备
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
  //删除用户下的设备
  async deleteUserAssociatedDevice(){
    const {sign}=this.ctx.request.query;
    const {userId,equipmentId}=this.ctx.request.body;
    console.log(userId,equipmentId,111)
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
  async getAllEquipmentByTwoLevelMenuId(){
    const {sign,twoLevelMenuId}=this.ctx.request.query;
    try {
      if(sign){
        let result=await this.ctx.service.associatedDevice.getAllEquipmentByTwoLevelMenuId(twoLevelMenuId);
        this.success(result);
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = AssociatedDeviceController;

'use strict';

const Controller = require('../core/base_controller');
class EquipmentController extends Controller {
  async saveEquipment(){
    //设备名字和数据
    const {user,password}=this.ctx.request.body;
    const isUser = await this.ctx.service.equipment.find({user});
    if(!isUser){
      try {
        await this.ctx.service.equipment.save(user,password);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
    }else{
      this.fail({msg:"用户已存在"})
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
    try {
      if(sign==1){
        const result = await this.ctx.service.equipment.getAll(Number(userId));
        console.log(result,userId)
        this.success(result);  
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
    const {name}=this.ctx.request.query;
    try {
      console.log('http://139.155.25.81/'+name);
      let result=await this.ctx.curl('http://139.155.25.81/'+name, {
        dataType: 'text',
        contentType:'application/json'
      });
      this.success(result.data);  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
}

module.exports = EquipmentController;

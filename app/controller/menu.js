'use strict';

const Controller = require('../core/base_controller');
class MenuController extends Controller {
  async saveMenu(){
    //设备名字和数据
    const {name,userId}=this.ctx.request.body;
    const isMenu = await this.ctx.service.menu.find({userId,name});
    if(!isMenu){
      try {
        await this.ctx.service.menu.save({name,userId});
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
    }else{
      this.fail({msg:"菜单名已存在"})
    }
  }
  async updateMenu(){
    //设备名字和数据
    const {id,name}=this.ctx.request.body;
      try {
        await this.ctx.service.menu.update(id,name);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
  }
  async getAllMenuByPage(){
    //sign表示是不是登录完之后查询的
    const {sign,nowPage=0,userId}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.menu.getAll(nowPage,userId);
        result.result=await Promise.all(result.result.map(async(item)=>{
          item.twoLevelMenu = await this.ctx.service.twoLevelMenu.getAll(item.id);
          return item;
        }))
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async getAllMenuByUserId(){
    //sign表示是不是登录完之后查询的
    const {sign,userId}=this.ctx.request.query;
    try {
      if(sign==1&&userId){
        const result = await this.ctx.service.menu.getAllByUserId(userId);
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async getAllMenu(){
    //sign表示是不是登录完之后查询的
    const {sign}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.menu.getAll();
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = MenuController;

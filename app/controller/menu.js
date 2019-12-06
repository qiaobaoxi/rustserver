'use strict';

const Controller = require('../core/base_controller');
class MenuController extends Controller {
  async saveMenu(){
    //设备名字和数据
    const {name,userId,companyId}=this.ctx.request.body;
    const isMenu = await this.ctx.service.menu.find({companyId,name});
    if(!isMenu){
      try {
        if(userId){
          let user=await this.ctx.service.user.find({id:userId}) 
          if(user.controll==0){
            return this.fail({msg:"当前用户是只看模式"})    
          }
        }else{
          return this.fail({msg:"请登录"})
        }
        await this.ctx.service.menu.save({name,companyId});
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
    const {id,name,userId}=this.ctx.request.body;
      try {
        if(userId){
          let user=await this.ctx.service.user.find({id:userId}) 
          if(user.controll==0){
            return this.fail({msg:"当前用户是只看模式"})    
          }
        }else{
          return this.fail({msg:"请登录"})
        }
        await this.ctx.service.menu.update(id,name);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
  }
  async getAllMenuByPage(){
    //sign表示是不是登录完之后查询的
    const {sign,nowPage=0,companyId}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.menu.getAll(nowPage,companyId);
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
  async getAllMenuByCompanyId(){
    //sign表示是不是登录完之后查询的
    const {sign,companyId}=this.ctx.request.query;
    try {
      if(sign==1&&companyId){
        const result = await this.ctx.service.menu.getAllByCompanyId(companyId);
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
  async isMatchMenuByCompanyId(){
    //sign表示是不是登录完之后查询的
    const {sign,companyId}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.menu.getAllByCompanyId(companyId);
        let equipments = await this.ctx.service.equipment.getAll(companyId);
        const equipmentArr=[];
        for(let item of equipments.result){
           let equipmentdata=await this.ctx.service.equipmentData.getAllByEquipmentnum({equipmentnum:item.name});
           equipmentArr.push(...equipmentdata);
        }
        let associateddevices=[];
        for(let item of result){
           let associateddevice=await this.ctx.service.associatedDevice.getAllEquipmentByMenuId(item.id);
           associateddevices.push(...associateddevice);
        }
        let signnum=0;
        for(let item of  equipmentArr){
            signnum=0
            for(let it of associateddevices){
                if(item.id===it.equipmentDataId){
                  signnum=1;  
                }
            }
            if(signnum===0){
              break; 
            }          
        }
        if(signnum===1){
          this.success();    
        }else{
          this.ctx.body = {
            code: 2,
            msg:"你有项目文件没有匹配,是否匹配"
          };
        }
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = MenuController;

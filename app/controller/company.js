'use strict';

const Controller = require('../core/base_controller');
class CompanyController extends Controller {
  async saveCompany() {
    //user账户和密码验证
    const {sign}=this.ctx.request.query;
    const {name}=this.ctx.request.body;
    try {
      if(sign&&name){
        await this.ctx.service.company.saveCompany(name)
        this.success();
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async  getAllCompany(){
      //sign表示是不是登录完之后查询的
      const {sign,nowPage}=this.ctx.request.query;
      try {
        if(sign==1){
          const result = await this.ctx.service.company.getAllCompany(nowPage);
          result.result=await Promise.all(result.result.map(async(item)=>{
                let users=await this.ctx.service.user.getAllByCompanyId(item.id);
                let equipments=await this.ctx.service.equipment.getAll(item.id);
                item.users=users;
                item.equipments=equipments.result;
                return item;   
          })) 
          this.success(result);
        }
      } catch (error) {
        this.fail({msg:error.message})
      }
  }
  async getCompany(){
    const {sign,id}=this.ctx.request.query;
    try {
      //sign表示是不是登录完之后查询的
      if(sign==1){
        const result = await this.ctx.service.company.find({id});
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async updateCompany(){
    const {id,name}=this.ctx.request.body;
    try {
      await this.ctx.service.company.update(id,name);
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async deleteCompany(){
    const {sign}=this.ctx.request.query;
    const {id}=this.ctx.request.body;
    try {
      if(sign==1){
       await this.ctx.service.company.delete(id);
        let users=await this.ctx.service.user.getAllByCompanyId(id);
        console.log(users)
        for(let item of users){
          await this.ctx.service.user.delete(item.id);
        }
        this.success();  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = CompanyController;

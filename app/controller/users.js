'use strict';
var pinyin = require("pinyin");
const Controller = require('../core/base_controller');
class UsersController extends Controller {
  async login() {
    //user账户和密码验证
    const {wxSign}=this.ctx.request.query;
    const {userName,password}=this.ctx.request.body;
    try {
      let user = await this.ctx.service.user.find({user:userName,password});
      if(user){
        let time=new Date().getTime();
        let pinyinname=pinyin(user.user,{
          style: pinyin.STYLE_NORMAL, // 设置拼音风格
        }).join();
        let name=wxSign?wxSign+pinyinname+user.id:pinyinname+user.id;
        this.ctx.cookies.set(name,time.toString(), {
          maxAge: 30 * 60 * 1000,
          httpOnly: false, // 默认就是 true
          encrypt: true, // 加密传输
        });
        let company=await this.ctx.service.company.find({id:user.companyId});
        await this.app.redis.set(name, time);
        delete user.password;
        user.companyName=company.name;
        this.success(user)
      }else{
        this.fail({msg:"账户或密码有误"})
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
}

module.exports = UsersController;

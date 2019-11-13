'use strict';

const Controller = require('../core/base_controller');
class UsersController extends Controller {
  async login() {
    //user账户和密码验证
    const {wxSign}=this.ctx.request.query;
    const {userName,password}=this.ctx.request.body;
    try {
      let user = await this.ctx.service.user.find({user:userName,password});
      if(user){
        let date=new Date();
        let time=date.getTime()
        if(wxSign){
          this.config.manageTologin[wxSign+user.user] = time;
        }else{
          this.config.manageTologin[user.user] = time;
        }
        // console.log(this.config.manageTologin)
        user.time=time
        delete user.password;
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

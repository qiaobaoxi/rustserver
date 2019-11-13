module.exports = () => {
    return async function manageToLogin(ctx, next) {
      let {name,time,wxSign}=ctx.query;
      let manageTologin=ctx.app.config.manageTologin
      name=wxSign?manageTologin[wxSign+name]:manageTologin[name]
      if(name==time){
        await next(); 
      }else{
        return ctx.body = {
            code: 0,
            result: "用户未登录",
            msg:2000,
          };
      }
    };
};
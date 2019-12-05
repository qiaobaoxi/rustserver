module.exports = () => {
    return async function manageToLogin(ctx, next) {
      let {name,wxSign,userId}=ctx.query;
      let code=wxSign?await ctx.app.userOverTime(ctx,wxSign+name+userId):await ctx.app.userOverTime(ctx,name+userId)
      if(code===1){
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
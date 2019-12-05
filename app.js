module.exports = app => {
    app.userOverTime = async(ctx,name) => {
      let cookieTime=ctx.cookies.get(name,{
        signed: false,
        encrypt: true
      })
      let redisTime = await app.redis.get(name);
      if(cookieTime==redisTime){
         return 1
      }else{
        return 2000;
      }
    };
  };
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570168695906_9648';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security : {
      csrf: {
        enable: false,
      },
    },
    redis : {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'auth',
        db: 0,
      },
    },
    mysql : {
      // 单数据库信息配置
      client: {
        // host
        host: '47.111.115.157',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'Qiao331751.',
        // 数据库名
        database: 'rust',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    bodyParser:{
      jsonLimit: '10mb',
      formLimit: '10mb',
    },  
    user:'admin',
    password:'ee635e66ee98f5f118b25026ba63bdd4',
  };
  
  return {
    ...config,
    ...userConfig,
  };
};

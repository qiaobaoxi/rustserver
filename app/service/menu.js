const Service = require('egg').Service;

class MenuService extends Service {
  async save(params) {
    const result = await this.app.mysql.insert('menu', { ...params });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('menu', { ...params });
    return result;
  }
  async getAllByUserId(userId){
    let result = await this.app.mysql.select('menu',{where:{userId}});
    return result 
  }
  async getAll(nowPage,userId){
    let result
    if(nowPage){
      result = await this.app.mysql.select('menu',{limit: 10,offset: 10*(nowPage-1),where:{userId}});  
    }else{
      result = await this.app.mysql.select('menu');
    }
    const count = await this.app.mysql.query('select count(*) from menu');
    return {
      result,
      count:count[0]['count(*)']
    };  
  }
  async update(id,name){
    console.log(id,name)
    const result = await this.app.mysql.update('menu', {id,name});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('menu', {id});
    return result;
  }
}

module.exports = MenuService;
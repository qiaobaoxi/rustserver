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
  async getAllByCompanyId(companyId){
    let result = await this.app.mysql.select('menu',{where:{companyId}});
    return result 
  }
  async getAll(nowPage,companyId){
    let result
    let count
    if(nowPage){
      result = await this.app.mysql.select('menu',{limit: 10,offset: 10*(nowPage-1),where:{companyId}});
      count = await this.app.mysql.query(`select count(*) from menu where companyId=${companyId}`);  
    }else{
      result = await this.app.mysql.select('menu');
      count = await this.app.mysql.query('select count(*) from menu');
    }
    
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
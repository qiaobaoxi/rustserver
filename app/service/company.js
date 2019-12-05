const Service = require('egg').Service;

class CompanyService extends Service {
  async saveCompany(name) {
    const result = await this.app.mysql.insert('company', { name });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('company', { ...params });
    return result;
  }
  async getAllCompany(nowPage){
    const result = await this.app.mysql.select('company',{limit: 10,offset: 10*(nowPage-1)});
    const count = await this.app.mysql.query('select count(*) from company');
    return {
      result,
      count:count[0]['count(*)']
    };  
  }
  async update(id,name){
    const result = await this.app.mysql.update('company', {id,name});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('company', {id});
    return result;
  }
  // async delete(id){
  //   const result = await this.app.mysql.delete('users', {id});
  //   return result;
  // }
}

module.exports = CompanyService;
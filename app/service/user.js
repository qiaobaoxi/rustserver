const Service = require('egg').Service;

class UserService extends Service {
  async saveUser(user,password,companyId,onlySee) {
    let controll=onlySee?1:0
    const result = await this.app.mysql.insert('users', { user,password,companyId,controll});
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('users', { ...params });
    return result;
  }
  async getAll(nowPage){
    const result = await this.app.mysql.select('users',{columns: ['id', 'user'],limit: 10,offset: 10*(nowPage-1)});
    const count = await this.app.mysql.query('select count(*) from users');
    return {
      result,
      count:count[0]['count(*)']
    };  
  }
  async getAllByCompanyId(companyId){
    const result = await this.app.mysql.select('users',{columns: ['id', 'user'],where:{companyId}});
    return result;
  }
  async update(id,user,password,onlySee){
    let controll=onlySee?1:0
    const result = await this.app.mysql.update('users', {id,user,password,controll});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('users', {id});
    return result;
  }
}

module.exports = UserService;
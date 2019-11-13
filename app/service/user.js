const Service = require('egg').Service;

class UserService extends Service {
  async saveUser(user,password) {
    const result = await this.app.mysql.insert('users', { user,password });
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
  async update(id,user,password){
    const result = await this.app.mysql.update('users', {id,user,password});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('users', {id});
    return result;
  }
}

module.exports = UserService;
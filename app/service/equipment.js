const Service = require('egg').Service;

class EquipmentService extends Service {
  async save(name,companyId) {
    const result = await this.app.mysql.insert('equipment', { name,companyId });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('equipment', { ...params });
    return result;
  }
  async getAll(companyId){
    let result
    if(companyId){
      result = await this.app.mysql.query(`SELECT * FROM equipment  WHERE companyId=${companyId}`);
    }else{
      result = await this.app.mysql.query(`SELECT * FROM equipment`);
    }
    return {
      result
    };  
  }
  async update(id,user,password){
    const result = await this.app.mysql.update('equipment', {id,user,password});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('equipment', {id});
    return result;
  }
}

module.exports = EquipmentService;
const Service = require('egg').Service;

class EquipmentService extends Service {
  async save(user,password) {
    const result = await this.app.mysql.insert('equipment', { user,password });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('equipment', { ...params });
    return result;
  }
  async getAll(userId){
    let result
    if(userId){
      result = await this.app.mysql.query(`SELECT * FROM relevance LEFT JOIN equipment ON relevance.equipmentId=equipment.id WHERE userId=${userId}`);
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
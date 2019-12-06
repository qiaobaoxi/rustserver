const Service = require('egg').Service;

class EquipmentDataService extends Service {
  async getAllByEquipmentnum(params) {
    const result = await this.app.mysql.select('equipmentdata', { where:{...params}});
    return result;
  }
  async deleteFile(name){
    const result = await this.app.mysql.delete('equipmentdata', {name});
    return result;
  }
  async getAll() {
    const result = await this.app.mysql.select('equipmentdata');
    return result;
  }
  async getFileName(id,engineernum,areanum) {
    const result = await this.app.mysql.get('equipmentdata', {id,engineernum,areanum});
    return result;
  }
}

module.exports = EquipmentDataService;
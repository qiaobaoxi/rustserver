const Service = require('egg').Service;

class AssociatedDeviceService extends Service {
  async getAllMenuAssociate(menuId){
    const result = await this.app.mysql.select('associateddevice', {where:{menuId}});
    return result;
  }
  async saveMenuAssociate(menuId,equipmentDataId){
    const result = await this.app.mysql.insert('associateddevice', {menuId,equipmentDataId});
    return result;
  }
  async deleteAssociatedDevice(menuId,equipmentDataId){
    const result = await this.app.mysql.delete('associateddevice', {menuId,equipmentDataId});
    return result;
  }
  async deleteUserAssociatedDevice(userId,equipmentDataId){
    const result = await this.app.mysql.delete('relevance', {userId,equipmentDataId});
    return result;
  }
  async getAllEquipmentByMenuId(menuId){
    const result = await this.app.mysql.query(`SELECT * FROM associateddevice WHERE menuId=${menuId}`)
    return result;
  }
}

module.exports = AssociatedDeviceService;
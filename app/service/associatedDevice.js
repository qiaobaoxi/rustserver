const Service = require('egg').Service;

class AssociatedDeviceService extends Service {
  async getAllTwoLevelMenuAssociate(twoLevelMenuId){
    const result = await this.app.mysql.select('associatedDevice', {where:{twoLevelMenuId}});
    return result;
  }
  async saveTwoLevelMenuAssociate(twoLevelMenuId,equipmentId){
    const result = await this.app.mysql.insert('associatedDevice', {twoLevelMenuId,equipmentId});
    return result;
  }
  async deleteAssociatedDevice(twoLevelMenuId,equipmentId){
    const result = await this.app.mysql.delete('associatedDevice', {twoLevelMenuId,equipmentId});
    return result;
  }
  async deleteUserAssociatedDevice(userId,equipmentId){
    const result = await this.app.mysql.delete('relevance', {userId,equipmentId});
    return result;
  }
  async getAllEquipmentByTwoLevelMenuId(twoLevelMenuId){
    const result = await this.app.mysql.query(`SELECT * FROM associateddevice LEFT JOIN equipment ON associateddevice.equipmentId=equipment.id WHERE twoLevelMenuId=${twoLevelMenuId}`)
    return result;
  }
}

module.exports = AssociatedDeviceService;
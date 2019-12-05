const Service = require('egg').Service;

class TwoLevelMenuService extends Service {
  async save(menuId,name,equpmentNumOfArea) {
    const result = await this.app.mysql.insert('twolevelmenu', {menuId, name,equpmentNumOfArea });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('twolevelmenu', { ...params });
    return result;
  }
  async getAll(menuId){
      let result = await this.app.mysql.select('twolevelmenu',{where:{menuId}});
      return result;
  }
  async getAllByPage(nowPage,userId){
    // let result = await this.app.mysql.select('twoLevelMenu',{limit: 10,offset: 10*(nowPage-1)});
    const result = await this.app.mysql.query(`SELECT twolevelmenu.id,twolevelmenu.name,menu.id as menuId  FROM twolevelmenu  LEFT JOIN menu ON menu.id= twolevelmenu.menuId WHERE userId=${userId} LIMIT ${10*(nowPage-1)},10`);
    const count = await this.app.mysql.query(`SELECT  count(*) FROM menu LEFT JOIN twolevelmenu ON menu.id= twolevelmenu.menuId WHERE userId=${userId}`);
    // const count = await this.app.mysql.query(`SELECT count(*) FROM menu WHERE userId=${userId} LIMIT ${10*(nowPage-1)},10 INNER JOIN twolevelmenu ON menu.id= twolevelmenu.menuId`);
    return {
      result,
      count:count[0]['count(*)']
    };
  }
  async update(id,name,equpmentNumOfArea){
    const result = await this.app.mysql.update('twolevelmenu', {id,name,equpmentNumOfArea});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('twolevelmenu', {id});
    return result;
  }
}

module.exports = TwoLevelMenuService;
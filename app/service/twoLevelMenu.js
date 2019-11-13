const Service = require('egg').Service;

class TwoLevelMenuService extends Service {
  async save(menuId,name) {
    const result = await this.app.mysql.insert('twoLevelMenu', {menuId, name });
    return result;
  }
  async find(params) {
    const result = await this.app.mysql.get('twoLevelMenu', { ...params });
    return result;
  }
  async getAll(menuId){
      let result = await this.app.mysql.select('twoLevelMenu',{where:{menuId}});
      return result;
  }
  async getAllByPage(nowPage,userId){
    // let result = await this.app.mysql.select('twoLevelMenu',{limit: 10,offset: 10*(nowPage-1)});
    const result = await this.app.mysql.query(`SELECT  * FROM menu LEFT JOIN twolevelmenu ON menu.id= twolevelmenu.menuId WHERE userId=${userId} LIMIT ${10*(nowPage-1)},10`);
    const count = await this.app.mysql.query(`SELECT  count(*) FROM menu LEFT JOIN twolevelmenu ON menu.id= twolevelmenu.menuId WHERE userId=${userId}`);
    // const count = await this.app.mysql.query(`SELECT count(*) FROM menu WHERE userId=${userId} LIMIT ${10*(nowPage-1)},10 INNER JOIN twolevelmenu ON menu.id= twolevelmenu.menuId`);
    return {
      result,
      count:count[0]['count(*)']
    };
  }
  async update(id,name){
    const result = await this.app.mysql.update('twoLevelMenu', {id,name});
    return result;
  }
  async delete(id){
    const result = await this.app.mysql.delete('twoLevelMenu', {id});
    return result;
  }
}

module.exports = TwoLevelMenuService;
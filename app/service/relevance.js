const Service = require('egg').Service;

class RelevanceService extends Service {
  async relevance(userId,equipmentId) {
    const result = await this.app.mysql.insert('relevance', { userId,equipmentId });
    return result;
  }
  async getRelevanceByParams(params) {
    const result = await this.app.mysql.select('relevance', {where: params });
    return result;
  }
  async deleteRelevanceByParams(params) {
    const result = await this.app.mysql.delete('relevance', params);
    return result;
  }
}

module.exports = RelevanceService;
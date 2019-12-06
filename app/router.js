'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.home.login);
  router.post('/saveUser', app.middlewares.manageToLogin(),controller.home.saveUser);
  router.post('/updateUser',app.middlewares.manageToLogin(), controller.home.updateUser);
  router.post('/deleteUser', app.middlewares.manageToLogin(),controller.home.deleteUser);
  router.post('/deleteFile', app.middlewares.manageToLogin(),controller.home.deleteFile);
  router.get('/getAllUser', app.middlewares.manageToLogin(),controller.home.getAllUser);
  router.get('/getUser', app.middlewares.manageToLogin(),controller.home.getUser);
  router.post('/downToExcel', controller.home.downToExcel);

  router.post('/saveEquipment',app.middlewares.manageToLogin(), controller.equipment.saveEquipment);
  router.post('/updateEquipment',app.middlewares.manageToLogin(), controller.equipment.updateEquipment);
  router.post('/deleteEquipment', app.middlewares.manageToLogin(),controller.equipment.deleteEquipment);
  router.get('/getAllEquipment', app.middlewares.manageToLogin(),controller.equipment.getAllEquipment);
  router.get('/getEquipment', app.middlewares.manageToLogin(),controller.equipment.getEquipment);
  router.get('/getEquipmentData', app.middlewares.manageToLogin(),controller.equipment.getEquipmentData);
  router.get('/fileExisted', app.middlewares.manageToLogin(),controller.equipment.fileExisted);
  router.post('/userLogin', controller.users.login);
  
  
  router.post('/saveMenu', app.middlewares.manageToLogin(),controller.menu.saveMenu);
  router.post('/updateMenu', app.middlewares.manageToLogin(),controller.menu.updateMenu);
  router.get('/getAllMenuByPage', app.middlewares.manageToLogin(),controller.menu.getAllMenuByPage);
  router.get('/getAllMenu', app.middlewares.manageToLogin(),controller.menu.getAllMenu);
  router.get('/getAllMenuByCompanyId', app.middlewares.manageToLogin(),controller.menu.getAllMenuByCompanyId);
  router.get('/isMatchMenuByCompanyId', app.middlewares.manageToLogin(),controller.menu.isMatchMenuByCompanyId);

  router.post('/saveTwoLevelMenu',app.middlewares.manageToLogin(), controller.twoLevelMenu.saveTwoLevelMenu);
  router.post('/updateTwoLevelMenu', app.middlewares.manageToLogin(),controller.twoLevelMenu.updateTwoLevelMenu);
  router.get('/getAllTwoLevelMenuByMenuId', app.middlewares.manageToLogin(),controller.twoLevelMenu.getAllTwoLevelMenuByMenuId);
  router.get('/getAllTwoLevelMenu', app.middlewares.manageToLogin(),controller.twoLevelMenu.getAllTwoLevelMenu);
  router.get('/getAllTwoLevelMenuAssociate', app.middlewares.manageToLogin(),controller.twoLevelMenu.getAllTwoLevelMenuAssociate);
  
  router.post('/saveAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.associatedDevice);
  router.post('/deleteAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.deleteAssociatedDevice);
  router.post('/relevanceEquipment', app.middlewares.manageToLogin(),controller.associatedDevice.relevanceEquipment);
  router.post('/deleteUserAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.deleteUserAssociatedDevice);
  router.get('/getAllEquipmentByMenuId', app.middlewares.manageToLogin(),controller.associatedDevice.getAllEquipmentByMenuId);
 
  //company
  router.post('/saveCompany', app.middlewares.manageToLogin(),controller.company.saveCompany);
  router.get('/getAllCompany', app.middlewares.manageToLogin(),controller.company.getAllCompany);
  router.get('/getCompany', app.middlewares.manageToLogin(),controller.company.getCompany);
  router.post('/updateCompany',app.middlewares.manageToLogin(), controller.company.updateCompany);
  router.post('/deleteCompany', app.middlewares.manageToLogin(),controller.company.deleteCompany);
  
};

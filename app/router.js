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
  router.get('/getAllUser', app.middlewares.manageToLogin(),controller.home.getAllUser);
  router.get('/getUser', app.middlewares.manageToLogin(),controller.home.getUser);
  router.post('/downToExcel',app.middlewares.manageToLogin(), controller.home.downToExcel);

  router.post('/saveEquipment',app.middlewares.manageToLogin(), controller.equipment.saveEquipment);
  router.post('/updateEquipment',app.middlewares.manageToLogin(), controller.equipment.updateEquipment);
  router.post('/deleteEquipment', app.middlewares.manageToLogin(),controller.equipment.deleteEquipment);
  router.get('/getAllEquipment', app.middlewares.manageToLogin(),controller.equipment.getAllEquipment);
  router.get('/getEquipment', app.middlewares.manageToLogin(),controller.equipment.getEquipment);
  router.get('/getEquipmentData', app.middlewares.manageToLogin(),controller.equipment.getEquipmentData);

  router.post('/userLogin', controller.users.login);
  
  router.post('/saveMenu', app.middlewares.manageToLogin(),controller.menu.saveMenu);
  router.post('/updateMenu', app.middlewares.manageToLogin(),controller.menu.updateMenu);
  router.get('/getAllMenuByPage', app.middlewares.manageToLogin(),controller.menu.getAllMenuByPage);
  router.get('/getAllMenu', app.middlewares.manageToLogin(),controller.menu.getAllMenu);
  router.get('/getAllMenuByUserId', app.middlewares.manageToLogin(),controller.menu.getAllMenuByUserId);

  router.post('/saveTwoLevelMenu',app.middlewares.manageToLogin(), controller.twoLevelMenu.saveTwoLevelMenu);
  router.post('/updateTwoLevelMenu', app.middlewares.manageToLogin(),controller.twoLevelMenu.updateTwoLevelMenu);
  router.get('/getAllTwoLevelMenuByMenuId', app.middlewares.manageToLogin(),controller.twoLevelMenu.getAllTwoLevelMenuByMenuId);
  router.get('/getAllTwoLevelMenu', app.middlewares.manageToLogin(),controller.twoLevelMenu.getAllTwoLevelMenu);
  
  router.post('/saveAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.associatedDevice);
  router.post('/deleteAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.deleteAssociatedDevice);
  router.post('/relevanceEquipment', app.middlewares.manageToLogin(),controller.associatedDevice.relevanceEquipment);
  router.post('/deleteUserAssociatedDevice', app.middlewares.manageToLogin(),controller.associatedDevice.deleteUserAssociatedDevice);
  router.get('/getAllEquipmentByTwoLevelMenuId', app.middlewares.manageToLogin(),controller.associatedDevice.getAllEquipmentByTwoLevelMenuId);
  
};

var express = require('express');
var router = express.Router();
var userDao = require('../dao/user/userDao');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// 增加用户
router.post('/regist', function(req, res, next) {
	userDao.add(req, res, next);
});
//用户登陆
router.post('/login', function(req, res, next) {
	userDao.query(req, res, next);
});





module.exports = router;

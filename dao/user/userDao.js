// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util');
var $sql = require('./userSqlMapping');
var $token = require('../../service/token');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));



module.exports = {
	//用户注册
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
            var param = req.body;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.account, param.psw], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}

				// 以json形式，把操作结果返回给前台页面
				$util.jsonWrite(res, result);

				// 释放连接 
				connection.release();
			});
		});
	},
	//用户登陆
    query: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            //SELECT user_account,user_psw FROM user WHERE user_account = ?
            connection.query($sql.select, param.account, function(err, array) {
            	var result = {};
                if(array) {
                	if(array[0].user_psw == param.psw){
                        var token =$token.createToken(array[0],30);
							result = {
								success: true,
								successCode: 200,
								successMsg: '查询成功',
								data: token
							}
                        }else{
                            result={
                                success:false,
                                successCode: 200,
                                successMsg:'用户不存在',
                                data:[]
							}
						}
					}

                // 以json形式，把操作结果返回给前台页面
                $util.jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        })
    }
};
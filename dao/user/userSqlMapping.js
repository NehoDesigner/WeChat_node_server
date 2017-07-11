// dao/user/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(user_account, user_psw) VALUES(?,?)',
	select:'SELECT user_account,user_psw FROM user WHERE user_account = ?'
};

module.exports = user;
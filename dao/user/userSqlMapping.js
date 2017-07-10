// dao/user/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(user_account, user_psw) VALUES(?,?)'
};

module.exports = user;
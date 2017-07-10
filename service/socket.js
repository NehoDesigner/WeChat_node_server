var server = require('../bin/www');
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('setName',function (data) {
        var name = data;
        hashName[name] = socket.id;
        console.log(hashName);
    });
    socket.on('sayTo',function (data) {
        var toName = data.to;
        var toId;
        if(toId = hashName[toName]){
            var toSocket = _.findWhere(io.sockets.sockets,{id:toId});
            toSocket.emit('message',data.msg);
        }
    })
    socket.on('disconnect', function(){
        console.log('connection is disconnect!');
    });
});

module.exports = io;
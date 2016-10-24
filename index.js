/*https://github.com/Atinux/node-ftps - documentation for ftps*/

var FTPS = require('ftps');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var JSFtp = require('jsftp');

var Ftp = new JSFtp({
    host: "",
    port: 21, // defaults to 21
    user: "", // defaults to "anonymous"
    pass: "" // defaults to "@anonymous"
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/webdocs/index.html');
});
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + '/webdocs/style.css');
});
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + '/webdocs/script.js');
});

http.listen(1338, function() {
    console.log('listening on *:1338');
});

io.on('connection', function(socket) {
    socket.emit("info", 'welcome');
    var ftps = new FTPS({
        host: '', // required
        username: '', // required
        password: '', // required
        protocol: 'sftp', // optional, values : 'ftp', 'sftp', 'ftps',... default is 'ftp'
        // protocol is added on beginning of host, ex : sftp://domain.com in this case
        port: 22, // optional
        // port is added to the end of the host, ex: sftp://domain.com:22 in this case
        escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
        retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
        timeout: 10,
        requiresPassword: true, // Optional, defaults to true
        autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
        cwd: '' // Optional, defaults to the directory from where the script is executed
    });
    ftps.raw('echo "Downloading test.txt Now!"').exec(function(err, res) {
        socket.emit('info', res['data'].toString());
    });
    ftps.cd('files/').get('test.txt', 'file.txt').exec(function(err, res) {});

    Ftp.ls("files/", function(err, res) {
        res.forEach(function(file) {
            if (file.type === 1) {
                socket.emit('directory', file.name);
            }
            if (file.type === 0) {
                socket.emit('file', file.name);
            }
            console.log(file.name);
        });
    });

});

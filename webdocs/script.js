var socket = io();
socket.on('info', function(d) {
    $('#output').append($('<li>').text(d + ''));
});
socket.on('file', function(d) {
    $('#listfiles').append($('<li>').text(d));
    $("#listfiles").addClass("file");
})
socket.on('directory', function(d) {
    $('#listdirs').append($('<li>').text(d));
    $("#listdirs").addClass("dir");
})

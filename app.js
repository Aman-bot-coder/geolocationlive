const express = require('express')
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection",function(socket){

    socket.on("send-location",function(data){
        socket.broadcast.emit('received-location', data);
    })
    console.log("Connected")
})

app.get("/", (req,res)=>{
    res.render('index')
})

server.listen(3000);
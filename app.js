const express = require("express");
const cors = require("cors");

const socket = require("socket.io");
const app = express();

app.use(cors());

app.use(express.json());
const server = app.listen(5000, () => console.log(`Server started on ${5000}`));

const io = socket(server, {
  cors: {
    origin: "https://heroic-beijinho-d9e039.netlify.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();
global.a = [];
io.on("connection", (socket) => {
  global.chatSocket = socket;
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });




  socket.on("add-user", (roomId) => {
   console.log("rrr",roomId.length==0)
   if(roomId.length!=0){
    addValueToMap(onlineUsers, roomId, socket.id);
   console.log("user added")
   }

  
  });

  function addValueToMap(map, key, value) {
    if (!map.has(key)) {
      
      map.set(key, []);
    }
    map.get(key).push(value);
  }


  socket.on("leave-room", (data) => {
    removeUserFromRooms(socket.id);
  
    
  });

  function removeUserFromRooms(socketId) {
    console.log("removed ",socketId)
    for (let [key, value] of onlineUsers.entries()) {
      onlineUsers.set(key, value.filter(id => id !== socketId));
      if (onlineUsers.get(key).length === 0) {
        onlineUsers.delete(key);
        console.log("empty")
      }
    }
  }
  socket.on("send-msg", (data) => {
    
     // Access the global `a`
     global.a=onlineUsers.get(data.room)
     console.log("online",global.a);
     console.log("msg send",data.value)
    if (global.a) {
      global.a.forEach((sId) => {
        if (sId) {
          socket.to(sId).emit("msg-recieve", data.value,data.langu);
        }
      });
    }
  });

  socket.on("send-lang", (data) => {
    
    // Access the global `a`
   
    global.a=onlineUsers.get(data.room)
    console.log("online",global.a);
    console.log("msg send",data.langu)
   if (global.a) {
     global.a.forEach((sId) => {
       if (sId) {
         socket.to(sId).emit("lang-recieve", data.langu);
       }
     });
   }
 });





});

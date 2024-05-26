const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const app=express()


app.use(cors())



app.use(express.json());
const server = app.listen(5000, () =>
  console.log(`Server started on ${5000}`)
);






  
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });


const express=require('express')
require('dotenv').config()
require('express-async-errors')
const cors=require('cors')
const Message = require('./models/message')
const User =require("./models/user")
const {StatusCodes}=require('http-status-codes')

const app=express()
const connectDB=require('./db/connect')
const AuthRoute=require("./routes/auth")
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handaler');
const { STATUS_CODES } = require('http')
const rooms = ['#general', '#tech', '#science', '#generous'];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>res.send("Home Page"))
app.use('/api/v1/auth',AuthRoute)
const server = require('http').createServer(app);
const io=require('socket.io')(
    server,{
        cors:{
            origin:process.env.CLIENT_URL ,
            methods:['GET','POST']
        }
       
    })
    const getLastMessagesFromRoom=async(room)=>{
      let roomMessages = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
      ])
      return roomMessages;
    }
    
    const  sortRoomMessagesByDate=(messages)=>{
      return messages.sort(function(a, b){
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');
    
        date1 = date1[2] + date1[0] + date1[1]
        date2 =  date2[2] + date2[0] + date2[1];
    
        return date1 < date2 ? -1 : 1
      })
    }
    
    // socket connection
    
    io.on('connection', (socket)=> {
    
      socket.on('new-user', async ()=> {
        const members = await User.find();
        io.emit('new-user', members)
      })
    
      socket.on('join-room', async(newRoom, previousRoom)=> {
        socket.join(newRoom);
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)
      })
    
      socket.on('message-room', async(room, content, sender, time, date) => {
        const newMessage = await Message.create({content, from: sender, time, date, to: room});
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        // sending message to room
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room)
      })
    
      app.delete('/logout', async(req, res)=> {
        try {
          const {_id, newMessages} = req.body;
          const user = await User.findById(_id);
          user.status = "offline";
          user.newMessages = newMessages;
          await user.save();
          const members = await User.find();
          socket.broadcast.emit('new-user', members);
          res.status(StatusCodes.OK).send();
        } catch (e) {
          console.log(e);
          res.status(StatusCodes.BAD_REQUEST).send()
        }
      })
    
    })

app.get('/api/v1/rooms', (req, res)=> {
    res.json(rooms)
  })

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT||5000;

const Start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(port,()=>console.log(`Server is listening on port ${port}.....`))
        
    } catch (error) {
        console.log(error);
        
    }
}
Start()

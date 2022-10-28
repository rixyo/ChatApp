require('dotenv').config()
const io=require('socket.io')(
    server,{
        cors:{
            origin: process.env.CLIENT_URL,
            methods:['GET','POST']
        }
       
    }
)
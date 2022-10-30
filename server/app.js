const express=require('express')
require('dotenv').config()
require('express-async-errors')
const cors=require('cors')

const app=express()
const connectDB=require('./db/connect')
const AuthRoute=require("./routes/auth")
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handaler');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>res.send("Home Page"))
app.use('/api/v1/auth',AuthRoute)


//app.use(notFoundMiddleware)
//app.use(errorHandlerMiddleware)

const port=process.env.PORT||5000;

const Start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>console.log(`Server is listening on port ${port}.....`))
        
    } catch (error) {
        console.log(error);
        
    }
}
Start()

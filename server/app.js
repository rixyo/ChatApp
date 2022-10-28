const express=require('express')
require('dotenv').config()
const cors=require('cors')
const room=['gossip','study','helps','artical']
const app=express()
const connectDB=require('./db/connect')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',(req,res)=>res.send("Home Page"))

const port=process.env.PORT||5000;

const Start=async()=>{
    try {
        await connectDB(process.env.MONGOOSE_URI)
        app.listen(port,()=>console.log(`Server is listening on port ${port}.....`))
        
    } catch (error) {
        console.log(error);
        
    }
}
Start()

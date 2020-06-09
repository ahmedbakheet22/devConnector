const express = require('express');
const connectDB =require('./config/db')
const app = express();
connectDB()
app.get('/',(req,res)=>{res.send('API running')})
const port =process.env.PORT || 5000
app.listen(port,()=>{console.log(`server started in port ${port}`)})

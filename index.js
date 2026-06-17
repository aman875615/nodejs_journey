const express = require('express');
const {connectMongoDB} = require('./connection');
const {logReqREs} = require('./middlewares');
const UserRoutes = require('./routes/user');
const app = express();
const PORT = 3000;

connectMongoDB('mongodb://127.0.0.1:27017/youtube-app1')
.then(()=>{console.log('connected to mongodb')});

//app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(logReqREs("log.txt"));

   

app.use("/api/users",UserRoutes);
app.listen(3000,()=>{console.log(`servered sucess ${PORT}`)});


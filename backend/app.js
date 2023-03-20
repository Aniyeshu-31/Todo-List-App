const express  =  require('express');
var cors = require('cors');
const app= express();
const port=5000;
app.use(express.json()); // if we want to use req.body in json format then we have to use this middleware

app.use(cors());
const MongooseServer = require('./db/db');
const auth=require('./routes/auth');
const notes=require('./routes/notes');
app.use('/api/auth',auth);
app.use('/api/notes',notes);
MongooseServer().then(()=>{
    console.log(`connected to mongoose successfully and server ${port}`);
    app.listen(port,()=>{
        console.log(`server connected ${port}`)
    });
});
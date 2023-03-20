const mongoose=require('mongoose');

const MONGOURI="mongodb+srv://Aniyeshu:Aniyeshu@todo-list.urehtey.mongodb.net/todo?retryWrites=true&w=majority"

const MongooseServer= ()=>{
    return mongoose.connect(MONGOURI);
}

module.exports = MongooseServer;

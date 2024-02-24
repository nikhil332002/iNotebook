const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true"
const connectToMongo=()=>{
    try {
        mongoose.connect(mongoURI)
        console.log('connected to database successfully!');
    } catch (error) {
        console.error(error);
    }  
}

module.exports=connectToMongo;
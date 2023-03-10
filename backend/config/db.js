
const mongoose = require('mongoose')

const connectDB = async (server) =>{
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        const port = process.env.Port || 5000;
        server.listen(port,()=>{
            console.log(`listening on port ${port} ...`);
        })
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
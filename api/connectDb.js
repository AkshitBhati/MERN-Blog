import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(process.env.mongo_uri)
        console.log(`server is connect to ${connect.connection.host}`)
    }
    catch(err){
        console.error(err)
    }
}

export default connectDb
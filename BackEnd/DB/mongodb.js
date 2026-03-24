import  { connect } from "mongoose"
import { MDB_URL } from "../config/env.js"

if(!MDB_URL) throw new Error("MongoDB url is undifined")

const connectToMongoDB = async ()=>{
    try {
        await connect(MDB_URL)
        .then(console.log("MongoDb connected"))

    } catch (e) {
        console.log(e.message)
    }
}

export default connectToMongoDB; 
import mongoose from "mongoose";




const connectToDatabase = (connectString) => {
    mongoose.connect(connectString)
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.error("MongoDB connection error:", err.message));
};



export default connectToDatabase;
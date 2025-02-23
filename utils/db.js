import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected.")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;
/* import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Prevents timeout issues
        });
        console.log("✅ MongoDB Connected.");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the app if DB fails
    }
};

export default connectDB; */
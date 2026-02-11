import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("runValidators", true); // ðŸ”¥ always validate updates

    await mongoose.connect(process.env.MONGO_URI);

    console.log("âœ… MongoDB connected");
  } catch (error) {
    console.error("âŒ MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;

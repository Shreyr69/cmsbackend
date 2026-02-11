import "dotenv/config.js";
import fs from "fs";
import path from "path";

import app from "./app.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`Listening on PORT ${PORT}`);
    }
});

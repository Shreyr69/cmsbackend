import "dotenv/config.js";
import fs from "fs";
import path from "path";

import app from "./app.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { testing } from "./crons/testing.js";
import { archiveDraftArtifacts } from "./crons/archiveDrafts.js";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

connectDB();
connectCloudinary();
testing();
archiveDraftArtifacts();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`Listening on PORT ${PORT}`);
    }
});

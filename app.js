import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import artifactRoutes from "./routes/artifacts.route.js";
import likeRoutes from "./routes/likes.routes.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import webhookRoutes from "./routes/webhook.route.js";
import chatRoutes from "./routes/chats.routes.js";


const app = express();

app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "CMS is Running."
    });
})


app.use("/webhook", webhookRoutes);
app.use("/auth",authRoutes);
app.use("/artifact",artifactRoutes);
app.use("/likes",likeRoutes);
app.use("/comments",commentRoutes);
app.use("/chats", chatRoutes);


export default app;

import express from "express";
import {
    createArtifact,
    getArtifacts
} from "../controllers/artifact.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { apiLimiter } from "../middlewares/rateLimiter.middleware.js";


const router = express.Router();

router.post("/create",authMiddleware,createArtifact);
router.post("/createWithFile", authMiddleware, apiLimiter, upload.single("file"), createArtifact);
router.get("/", authMiddleware, apiLimiter, getArtifacts);


export default router;

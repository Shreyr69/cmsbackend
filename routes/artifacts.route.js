import express from "express";
import {
    createArtifact,
    getArtifacts
} from "../controllers/artifact.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middlware.js";
import { upload } from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post("/create",authMiddleware,createArtifact);
router.post("/createWithFile",authMiddleware,upload.single("file"), createArtifact);
router.get("/", authMiddleware, getArtifacts);


export default router;
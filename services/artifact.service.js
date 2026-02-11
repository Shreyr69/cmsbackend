import Artifact from "../models/artifact.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const createArtifactService = async ({
    title,
    content,
    userId,
    filePath
}) => {

    try {

        if (!title || !content) {
            throw new Error("Title and Content are required");
        }

        let mediaUrl = null;

        if (filePath) {

            const uploadResult = await cloudinary.uploader.upload(
                filePath,
                {
                    folder: "cms_artifacts"
                }
            );

            mediaUrl = uploadResult.secure_url;

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            console.log("Media uploaded:", mediaUrl);
        }

        const artifact = await Artifact.create({
            title,
            content,
            author: userId,
            media: mediaUrl
        });

        console.log("Artifact created:", artifact);

        return artifact;

    } catch (error) {

        console.error("Create Artifact Error:", error.message);
        throw error;

    }
};


export const getArtifactsService = async ({ userId, role }) => {

    try {

        if (role === "ADMIN") {

            return await Artifact.find()
                .populate("author", "name email role")
                .sort({ createdAt: -1 });

        }

        return await Artifact.find({ author: userId })
            .sort({ createdAt: -1 });

    } catch (error) {

        console.error("Get Artifacts Error:", error.message);
        throw error;

    }

};


import Artifact from "../models/artifact.js";

// Create a new artifact
export const createArtifactService = async ({
    title,
    content,
    userId,
    filePath
}) => {
    if(!title || !content) {
        throw new Error('Title and Content are required');
    }

    const artifact = await Artifact.create({
        title,
        content,
        author: userId,
        media: filePath || null
    });
    console.log("Artifact created:", artifact);
    return artifact;    
};

export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") { 
    return await Artifact.find().populate("author", "name email role");
  }

  return await Artifact.find({ author: userId });
};

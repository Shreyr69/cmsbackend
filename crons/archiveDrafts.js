import cron from 'node-cron';
import Artifact from '../models/artifact.js';

export const archiveDraftArtifacts = () => {
    console.log("Archive drafts cron job initialized");
    cron.schedule('0 */12 * * *', async () => {
        try {
            console.log("Running archive drafts cron job...");
            
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const result = await Artifact.updateMany(
                {
                    status: "DRAFT",
                    createdAt: { $lt: sevenDaysAgo }
                },
                {
                    status: "ARCHIVED"
                }
            );
            
            console.log(`Archived ${result.modifiedCount} old draft artifacts`);
        } catch (error) {
            console.error("Archive drafts cron error:", error.message);
        }
    });
};

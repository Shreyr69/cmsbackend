import cron from 'node-cron';

export const testing = () => {
    console.log("Testing function schedule");
    cron.schedule('32 15 * * *', () => {
        console.log('Cron job executed');
    });
};
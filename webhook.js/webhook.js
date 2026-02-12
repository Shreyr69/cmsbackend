import express from 'express';

const router = express.Router();

router.post('/test', (req, res) => {
    console.log('Github webhook received:');
    console.log(req.body);
    res.status(200).send('Webhook received');

    res.json({
        success: true,
        message: "Webhook received successfully"
    });
});

export default router;
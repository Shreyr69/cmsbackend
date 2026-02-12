import { processWebhookService } from "../services/webhook.service.js";

export const handleWebhook = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Webhook payload is required"
      });
    }

    const result = await processWebhookService(payload);

    res.status(200).json({
      success: true,
      message: "Webhook received and processed",
      data: result
    });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

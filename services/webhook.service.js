export const processWebhookService = async (payload) => {
  try {
    console.log("Processing webhook payload:", payload);

    if (payload.event === "test") {
      console.log("Test webhook received");
      return {
        event: "test",
        timestamp: new Date(),
        status: "processed"
      };
    }

    return {
      event: payload.event || "unknown",
      timestamp: new Date(),
      status: "processed"
    };
  } catch (error) {
    console.error("Webhook service error:", error.message);
    throw error;
  }
};

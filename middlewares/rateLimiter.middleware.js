import rateLimit from "express-rate-limit"

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 2,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false
});
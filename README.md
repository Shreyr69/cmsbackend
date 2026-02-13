# CMS Backend

A Node.js and Express backend for a content management system with authentication, artifacts, comments, likes, file uploads, chat (REST + Socket.IO), webhooks, and scheduled jobs.

## Features

- Email OTP signup flow and login
- JWT auth via HTTP-only cookie or Authorization header
- Artifact creation with optional file upload and Cloudinary storage
- Comments and likes on artifacts
- Chat messages and threads (REST + Socket.IO)
- Webhook test endpoint
- Scheduled jobs with node-cron
- Rate limiting on selected routes

## Requirements

- Node.js 22.x
- MongoDB connection string
- Cloudinary account (optional but required for media uploads)

## Setup

1. Install dependencies:

   npm install

2. Create a .env file in the project root:

   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

3. Start the server:

   npm run dev

The server listens on PORT (default 3000) and serves the chat UI at /chat.

## Scripts

- npm run dev: Start with nodemon
- npm start: Start with node

## API Routes

Base URL: http://localhost:3000

Auth
- POST /auth/signup/initiate
  Body: { "email": "user@example.com" }
- POST /auth/signup/verify
  Body: { "email": "user@example.com", "otp": "123456", "name": "User", "password": "password", "role": "VIEWER" }
- POST /auth/login
  Body: { "email": "user@example.com", "password": "password" }

Artifacts
- POST /artifact/create
- POST /artifact/createWithFile (multipart/form-data, field name: file)
- GET /artifact

Comments
- POST /comments/:id/comments
- GET /comments/:id/comments

Likes
- POST /likes/:id/like
- GET /likes/:id/likes

Chat (REST)
- POST /chats
  Body: { "receiverId": "...", "message": "..." }
- GET /chats/thread/:threadId

Webhook
- POST /webhook/test
  Body: { "event": "test", "data": "..." }

## Chat UI and Socket.IO

- Open http://localhost:3000/chat to use the test UI.
- Socket events:
  - user-online: emits the current userId
  - send-message: emits { senderId, receiverId, message }
  - receive-message: received on the other client
  - message-sent: received by the sender

## Cron Jobs

- Archive drafts: runs every 12 hours, moves DRAFT artifacts older than 7 days to ARCHIVED
- Testing cron: sample schedule in crons/testing.js

## File Uploads

- Local uploads are stored in uploads/ before Cloudinary upload
- Cloudinary secure URL is saved to the artifact media field

## Rate Limiting

Rate limiting is applied to the artifact routes where enabled in routes/artifacts.route.js.

## Deployment (Render)

1. Create a new Web Service
2. Build command: npm install
3. Start command: npm start
4. Set environment variables listed in Setup

## Troubleshooting

- If styles do not load in /chat, open the page via http://localhost:3000/chat, not via a local file or Live Server.
- If uploads fail, make sure uploads/ exists and Cloudinary env vars are set.
- If chat messages are not delivered across tabs, confirm both users clicked Connect and have unique user IDs.

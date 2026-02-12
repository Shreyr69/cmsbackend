const senderInput = document.getElementById("senderId");
const receiverInput = document.getElementById("receiverId");
const messageInput = document.getElementById("message");
const goOnlineBtn = document.getElementById("goOnline");
const sendBtn = document.getElementById("sendMessage");
const log = document.getElementById("log");

const socket = io();

const addLog = (text) => {
  const line = document.createElement("div");
  line.textContent = text;
  log.appendChild(line);
};

socket.on("connect", () => {
  addLog(`Connected: ${socket.id}`);
});

socket.on("sent-message", (message) => {
  addLog(`You: ${message}`);
});

socket.on("received-message", (message) => {
  addLog(`Them: ${message}`);
});

socket.on("disconnect", () => {
  addLog("Disconnected");
});

goOnlineBtn.addEventListener("click", () => {
  const senderId = senderInput.value.trim();
  if (!senderId) {
    addLog("Enter your user id before going online");
    return;
  }
  socket.emit("user-online", senderId);
  addLog("Status: online");
});

sendBtn.addEventListener("click", () => {
  const senderId = senderInput.value.trim();
  const receiverId = receiverInput.value.trim();
  const message = messageInput.value.trim();

  if (!senderId || !receiverId || !message) {
    addLog("Sender, receiver, and message are required");
    return;
  }

  socket.emit("send-message", {
    senderId,
    receiverId,
    message
  });

  messageInput.value = "";
});

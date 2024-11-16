import { io } from "socket.io-client";

// Initialize a single socket connection
const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

// Add event listeners (optional logging)
socket.on("connect", () => console.log("Socket connected with ID:", socket.id));
socket.on("disconnect", (reason) =>
  console.log("Socket disconnected:", reason)
);
socket.on("reconnect_attempt", (attempt) =>
  console.log("Reconnection attempt:", attempt)
);
socket.on("reconnect_error", (error) =>
  console.error("Reconnection error:", error)
);
socket.on("reconnect_failed", () => console.error("Reconnection failed"));

export default socket;

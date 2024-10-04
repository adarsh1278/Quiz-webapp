import app from './app.js'; // Importing the Express app
import { Server } from 'socket.io'; // Importing Socket.IO
import http from 'http'; // Node.js HTTP module
import { handleSocketConnection } from './controllers/studentSocketcontroller.js';
import { instrument } from "@socket.io/admin-ui";
// Set the port, defaulting to 5000 if not set in environment variables
const PORT = process.env.PORT || 5000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up the Socket.IO server
export const io = new Server(server, {
  cors: {
    origin: '*', // Frontend (Next.js) origin, adjust this to your frontend URL
    methods: ['GET', 'POST'],         // Allowed HTTP methods for WebSocket communication
    credentials: true,                // Enable credentials (cookies and headers)
  },
});
//admin ui
instrument(io, {
  auth: false,
  mode: "development",
});

export const AdminNameSpace = io.of('/qadmin');
export const StudentNameSpace = io.of('/student');


// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

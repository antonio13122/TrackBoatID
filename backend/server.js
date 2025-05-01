require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
const boatRoutes = require("./routes/boatRoutes");
const boatImageRoutes = require("./routes/boatImageRoutes");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // pormijenit kasnije
  },
});

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/boats", boatRoutes);

// pass io to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/image", boatImageRoutes);

io.on("connection", (socket) => {
  console.log("New client connected ✅");

  socket.on("disconnect", () => {
    console.log("Client disconnected ❌");
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

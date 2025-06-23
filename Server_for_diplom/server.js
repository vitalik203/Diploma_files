const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [
      "https://imr-controller-app.vercel.app",
      "https://imr-department.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: [
      "https://imr-controller-app.vercel.app",
      "https://imr-department.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// === Стан маніпулятора ===
let robotState = {
  joints: [0, 0, 0, 0, 0], // суглоби: [shoulder, elbow, wrist]
};

const maxClientsCount = 1;

const countsIp = {};

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
  // const ip =
  //   socket.handshake.headers["x-forwarded-for"]?.split(",")[0].trim() ||
  //   socket.handshake.address;

  // countsIp[ip] = (countsIp[ip] || 0) + 1;

  // if (countsIp[ip] > maxClientsCount) {
  //   socket.emit("error", "Занадто багато підключень з однієї IP");
  //   socket.disconnect(true);
  //   return;
  // }

  // socket.on("disconnect", () => {
  //   countsIp[ip]--;
  //   if (countsIp[ip] <= 0) {
  //     delete countsIp[ip];
  //   }
  // });

  // Надіслати поточний стан новому клієнту
  socket.emit("robot-state", robotState);

  // Обробити зміни суглобів від контролера
  socket.on("update-joints", (newJoints) => {
    console.log("🔧 Нові кути суглобів:", newJoints);
    robotState.joints = newJoints;
    io.emit("robot-state", robotState); // транслювати на всі клієнти
  });

  // Старі команди залишаємо на всяк випадок
  socket.on("control-command", (command) => {
    console.log("🕹️ Отримано команду:", command);
    // Можна адаптувати під forward/backward для бази, якщо потрібно
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

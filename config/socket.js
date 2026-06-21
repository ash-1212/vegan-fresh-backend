const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join user to their own room
    socket.on('join-user', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`📍 User ${userId} joined room`);
    });

    // Order status update
    socket.on('order-status-update', (data) => {
      io.to(`user-${data.userId}`).emit('order-updated', {
        orderId: data.orderId,
        status: data.status,
        message: `Your order is ${data.status}`,
        timestamp: new Date(),
      });
    });

    // Real-time tracking
    socket.on('track-order', (orderId) => {
      socket.emit('tracking-data', {
        orderId,
        currentLocation: 'In transit',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      });
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = { initializeSocket, getIO };
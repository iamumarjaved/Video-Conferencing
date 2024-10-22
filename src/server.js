// server.js
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const server = http.createServer(app);
const socketIo = require('socket.io');
const generateCertificate = require('./utils/generateCertificate');
const connectDB = require('./database');


connectDB();

const startServer = async () => {
    const { privateKeyPath, certPath } = await generateCertificate();
  
    const httpsOptions = {
      key: fs.readFileSync(privateKeyPath),
      cert: fs.readFileSync(certPath)
    };
  
    const server = https.createServer(httpsOptions, app);
    const io = socketIo(server);
  

    io.on('connection', (socket) => {
        console.log('New client connected: ' + socket.id);
      
        socket.on('join-room', (room, userId) => {
          socket.join(room);
          socket.to(room).broadcast.emit('user-connected', userId);
      
          socket.on('disconnect', () => {
            socket.to(room).broadcast.emit('user-disconnected', userId);
          });
        });
      
        socket.on('offer', (offer, room) => {
          socket.to(room).broadcast.emit('offer', offer, socket.id);
        });
      
        socket.on('answer', (answer, room) => {
          socket.to(room).broadcast.emit('answer', answer, socket.id);
        });
      
        socket.on('candidate', (candidate, room) => {
          socket.to(room).broadcast.emit('candidate', candidate, socket.id);
        });
      });
      

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIO(server);

  io.on('connection', socket => {
    console.log('A user connected');
   
  });
}

const emitNewTicket = (ticket) => {
  if (io) {
    io.emit('newTicket', { ticket });
  }
}

module.exports = { initSocket, emitNewTicket };
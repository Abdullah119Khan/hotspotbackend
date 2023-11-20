const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIO(server);

}

const emitNewTicket = (ticket) => {
  if (io) {
    io.emit('newTicket', { ticket });
  }
}

module.exports = { initSocket, emitNewTicket };
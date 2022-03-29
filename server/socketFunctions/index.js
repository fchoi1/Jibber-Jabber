const channel = require('../models/Channel');

module.exports = {
  channelJoin: (io, socket) => {
    socket.join('channel1');
  },
  newChat: (io, socket) => {
    socket.on('newChat', (data) => {
      console.log('new chat', data.messageData.textValue);
      socket.to(data.channelId).emit('new-chat-update', data.messageData);
    });
  },
  joinRoom: (io, socket) => {
    socket.on('joined a room', (channelId) => {
      socket.join(channelId);

      console.log('a client joined the room', channelId);

      const clients = io.sockets.adapter.rooms.get(channelId);
      const numClients = clients ? clients.size : 0;
      console.log(numClients, ' client(s) in room', clients);
    });
  }
};

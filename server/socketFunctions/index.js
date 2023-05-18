module.exports = {
  newChat: (io, socket) => {
    socket.on('newChat', (data) => {
      socket.to(data.channelId).emit('new-chat-update', data.messageData);
    });
  },
  joinRoom: (io, socket) => {
    socket.on('joined a room', ({ channelId, userId }) => {
      socket.join(channelId);

      const userRoom = io.sockets.adapter.rooms.get(userId);

      socket.emit('joined-room-response', channelId);

      const clients = io.sockets.adapter.rooms.get(channelId);
      const numClients = clients ? clients.size : 0;
    });
  },
  channelAlert: (io, socket) => {
    socket.on('new-chats-for-users', ({ users, channelId }) => {
      users.forEach((id) =>
        socket.to(id).emit('new-chat-in-channel', channelId)
      );
    });
  }
};

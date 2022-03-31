module.exports = {
  newChat: (io, socket) => {
    socket.on('newChat', (data) => {
      console.log('new chat', data.messageData.textValue);
      socket.to(data.channelId).emit('new-chat-update', data.messageData);
    });
  },
  joinRoom: (io, socket) => {
    socket.on('joined a room', ({ channelId, userId }) => {
      socket.join(channelId);

      console.log('a client joined the room', channelId);
      const userRoom = io.sockets.adapter.rooms.get(userId);
      console.log(userId, ' a user in room', userRoom);

      socket.emit('joined-room-response', channelId);

      const clients = io.sockets.adapter.rooms.get(channelId);
      const numClients = clients ? clients.size : 0;
      console.log(numClients, ' client(s) in room', clients);
    });
  },
  channelAlert: (io, socket) => {
    socket.on('new-chats-for-users', ({ users, channelId }) => {
      console.log('sending alert now');
      users.forEach((id) =>
        socket.to(id).emit('new-chat-in-channel', channelId)
      );
    });
  }
};

module.exports = {
  channelJoin: (io, socket) => {
    socket.join('channel1');
  },
  newChat: (io, socket) => {
    socket.on('newChat', (data) => {
      console.log('new chat', data.textValue);
      io.emit('new-chat-update', data);
    });
  }
};

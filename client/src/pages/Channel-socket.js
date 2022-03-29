import React, { useEffect, useState, useContext } from 'react';

//Material UI
import { Box, Button, Container, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../components/Message';

import { useParams } from 'react-router-dom';
import { QUERY_CHANNEL } from '../utils/queries';
import { SEND_MESSAGE } from '../utils/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';

import auth from '../utils/auth';

// Css
// import './channel.css';

// SocketIO
import { useSocket } from '../contexts/socket';

const Channel = (props) => {
  const currUser = auth.getProfile().data; // get current user logged in

  const socket = useSocket(); //Socket context

  const { channelId } = useParams(); // get channel ID

  //get channel data from query
  const [getChannel, { loading, data: channelData }] = useLazyQuery(
    QUERY_CHANNEL
  );

  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  // for the send message form
  const [users, setUsers] = useState([]);

  const [channelName, setChannelName] = useState('');

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // load previous messages on first load
  useEffect(() => {
    console.log('calling once');

    if (socket) socket.emit('joined a room', channelId);

    getChannel({
      variables: { channelId },
      onCompleted: (data) => {
        setMessageList(data.singleChannel.messages);
        setChannelName(data.singleChannel.channelName);
        setUsers(data.singleChannel.users);
      }
    });
  }, [getChannel, channelId, socket]);

  useEffect(() => {
    if (socket == null) return;
    socket.on('new-chat-update', (data) => {
      console.log('someone sent a signal a new message: ', data.textValue);
      setMessageList((oldMessages) => [...oldMessages, data]);
    });
    return () => socket.off('new-chat-update');
  }, [socket, getChannel]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    console.log('sending message to channel', channelId);
    const messageFormData = {
      textValue: message,
      senderId: currUser._id,
      channelId: channelId
    };

    try {
      // call mutation
      const updatedChannel = await sendMessage({ variables: messageFormData });

      // grabs last message
      const messageData = updatedChannel.data.sendMessage.messages.at(-1);

      socket.emit('newChat', { messageData, channelId });

      setMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="box">
      {/* name of channel */}
      <h1>{channelName}</h1>
      {/* map through all users to display their names */}
      <div>
        {users.map((user) => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>

      <Container className="container">
        {/* map through all messages to show their content */}
        <div className="chat-container">
          {messageList.map((message) => {
            return message.sender._id === currUser._id ? (
              <div key={message._id} align="right" className="message">
                <Message
                  username={message.sender.username}
                  textContent={message.textValue}
                  createdAt={message.createdAt}
                />
              </div>
            ) : (
              <div key={message._id} align="left" className="message">
                <Message
                  username={message.sender.username}
                  textContent={message.textValue}
                  createdAt={message.createdAt}
                />
              </div>
            );
          })}
        </div>
        <form className="textMessageForm" onSubmit={handleSendMessage}>
          <TextField
            className="messageInput"
            label="send a message"
            onChange={onChange}
            value={message}
          />
          <Button
            className="sendButton"
            variant="contained"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Channel;

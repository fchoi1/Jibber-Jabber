import React, { useEffect, useState, useContext } from 'react';

//Material UI
import { Button, Container, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../components/Message';
import { Box } from '@mui/material';

import { useParams } from 'react-router-dom';
import { QUERY_CHANNELS } from '../utils/queries';
import { SEND_MESSAGE } from '../utils/mutations';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

// Css
import './channel.css';

// SocketIO
import { SocketContext } from '../context/socket';

const Channel = (props) => {
  const socket = useContext(SocketContext); //Socket context

  const { channelId } = useParams(); // get channel ID

  //get channel data from query
  const [getChannel, { loading, data: channelData }] =
    useLazyQuery(QUERY_CHANNELS);

  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  const { messages, users, channelName } = channelData
    ? channelData.singleChannel
    : { messages: [], users: [], channelName: '' };

  // for the send message form
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // load previous messages on first load
  useEffect(() => {
    console.log('calling once');

    getChannel({
      variables: { channelId: '623f88a6fda81384e8c40aad' },
      onCompleted: (data) => setMessageList(data.singleChannel.messages)
    });
  }, [getChannel]);

  useEffect(() => {
    if (socket == null) return;
    socket.on('new-chat-update', (data) => {
      console.log('someone sent a signal a new message: ', data.textValue);
      getChannel({
        variables: { channelId: '623f88a6fda81384e8c40aad' },
        onCompleted: (data) => setMessageList(data.singleChannel.messages)
      });
    });
    return () => socket.off('new-chat-update');
  }, [socket, getChannel]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const messageFormData = {
      textValue: message,
      senderId: '623bc8d72e7e0cc89212673a',
      channelId: '623f88a6fda81384e8c40aad'
    };

    try {
      // call mutation
      const updatedChannel = await sendMessage({ variables: messageFormData });

      const messageData = updatedChannel.data.sendMessage.messages.at(-1);

      socket.emit('newChat', messageData);

      setMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {/* name of channel */}
      <h1>{channelName}</h1>
      {/* map through all users to display their names */}
      <div>
        {users.map((user) => (
          <div key={user._id}>{user.name}</div>
        ))}
      </div>

      <Container sx={{ border: 'solid', padding: '10px' }}>
        {/* map through all messages to show their content */}
        <div>
          {messageList.map((message) => (
            <div key={message._id}>
              <Message
                username={message.sender.username}
                textContent={message.textValue}
                createdAt={message.createdAt}
              />
            </div>
          ))}
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

// {
//   "data": {
//     "singleChannel": {
//       "_id": "623f88a6fda81384e8c40aad",
//       "users": [
//         {
//           "username": "test",
//           "_id": "623bb62e48768e4b9aeebbcc"
//         },
//         {
//           "username": "test2",
//           "_id": "623bc8d72e7e0cc89212673a"
//         }
//       ],
//       "messages": [
//         {
//           "textValue": "test message 2",
//           "sender": {
//             "username": "test",
//             "_id": "623bb62e48768e4b9aeebbcc"
//           },
//           "createdAt": "Mar 26th, 2022 at 8:48 pm"
//         },
//         {
//           "textValue": "test message 2",
//           "sender": {
//             "username": "test",
//             "_id": "623bb62e48768e4b9aeebbcc"
//           },
//           "createdAt": "Mar 26th, 2022 at 8:49 pm"
//         }
//       ],
//       "channelName": "test channel"
//     }
//   }
// }

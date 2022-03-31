import React, { useEffect, useState, useRef } from 'react';

//Material UI
import { Box, Button, Container, Grid, TextField, Paper } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Typography from '@material-ui/core/Typography';

import SendIcon from '@mui/icons-material/Send';
import Message from '../components/Message';

import { useParams } from 'react-router-dom';
import { QUERY_CHANNEL } from '../utils/queries';
import { SEND_MESSAGE } from '../utils/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';

import auth from '../utils/auth';
import { useSocket } from '../contexts/socket';

// Css
import './channel.css';

const GreyTextTypography = withStyles({
  root: {
    color: 'gray'
  }
})(Typography);

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  }
});

// SocketIO

const Channel = (props) => {
  const currUser = auth.getProfile().data; // get current user logged in

  const socket = useSocket(); //Socket context

  const { channelId } = useParams(); // get channel ID

  //get channel data from query
  const [getChannel, { loading, data: channelData }] =
    useLazyQuery(QUERY_CHANNEL);

  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  // for the send message form
  const [users, setUsers] = useState([]);

  const [channelName, setChannelName] = useState('');

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const channelNotif = JSON.parse(localStorage.getItem('channelNotif'));
    if (channelNotif) {
      if (channelNotif.includes(channelId))
        localStorage.setItem(
          'channelNotif',
          JSON.stringify(channelNotif.filter((id) => id !== channelId))
        );
    }
  }, [channelId]);

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
    if (message === '') return;

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

      const otherUsers = users.map((user) => {
        if (user._id !== currUser._id) {
          return user._id;
        }
      });
      console.log(otherUsers);

      socket.emit('newChat', { messageData, channelId });
      socket.emit('new-chats-for-users', {
        users: otherUsers,
        channelId
      });

      setMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messageList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="box">
      {/* name of channel */}
      <h2>{channelName}</h2>
      {/* map through all users to display their names */}
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <h3>Users:</h3>
        </Grid>

        {users.map((user) => (
          <Grid
            item
            xs="auto"
            sx={{
              diplay: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <GreyTextTypography
              variant="h5"
              sx={{ padding: 0, margin: 0 }}
              key={user._id}
            >
              {user.username === currUser.username ? 'You' : user.username}
            </GreyTextTypography>
          </Grid>
        ))}
      </Grid>

      <Container className="container">
        <Paper
          sx={{
            maxHeight: '50vh',
            overflow: 'auto',
            backgroundColor: '#485460',
            border: '5px solid black',
            borderRadius: 2,
            minHeight: '30vh'
          }}
        >
          {/* map through all messages to show their content */}
          <div className="chat-container">
            {messageList.map((message) => {
              return (
                <Message
                  key={message._id}
                  align={message.sender._id === currUser._id ? 'right' : 'left'}
                  username={message.sender.username}
                  textContent={message.textValue}
                  createdAt={message.createdAt}
                />
              );
            })}
            <div ref={scrollRef}></div>
          </div>
        </Paper>

        <form
          className="textMessageForm"
          onSubmit={handleSendMessage}
          style={{ marginTop: '1%' }}
        >
          <Grid container spacing={0}>
            <Grid item sm={11}>
              <ThemeProvider theme={theme}>
                <TextField
                  autoComplete="off"
                  inputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{
                    style: { color: '#fff' }
                  }}
                  sx={{ width: '100%' }}
                  color="primary"
                  className="messageInput"
                  label="send a message"
                  onChange={onChange}
                  value={message}
                />
              </ThemeProvider>
            </Grid>

            <Grid item sm={1}>
              <Button
                sx={{ height: '56px', width: '100%' }}
                className="sendButton"
                variant="contained"
                color="primary"
                type="submit"
              >
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Channel;

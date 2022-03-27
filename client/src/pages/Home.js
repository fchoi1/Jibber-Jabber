import React, { useEffect, useContext } from 'react';

import ChatList from '../components/ChatList';
import FriendList from '../components/FriendList';
import FriendListMobile from '../components/FriendListMobile';

import { Box, Grid } from '@mui/material';
import './home.css';

// SocketIO
import { SocketContext } from '../context/socket';

const Home = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
    });
  }, [socket]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 0 }} columns={{ xs: 4, sm: 12 }}>
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: 'block', sm: 'none' },
            border: 'solid',
            minHeight: 0,
            minWidth: 0
          }}
        >
          <FriendListMobile />
        </Grid>
        <Grid item xs={8} sx={{ border: 'solid' }}>
          <ChatList />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: { xs: 'none', sm: 'block' }, border: 'solid' }}
        >
          <FriendList />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;

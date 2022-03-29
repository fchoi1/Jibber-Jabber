import React, { useEffect } from 'react';

import ChatList from '../components/ChatList';
import FriendList from '../components/FriendList';
import FriendListMobile from '../components/FriendListMobile';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import { Box, Grid } from '@mui/material';
import './home.css';

// SocketIO
import { useSocket } from '../contexts/socket';

const Home = () => {
  const { data: userData, loading } = useQuery(QUERY_ME);
  const socket = useSocket();
  const { channelModel: channels, friends } = userData?.me || {};

  useEffect(() => {
    if (!socket) return;
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
    });
  }, [socket]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <FriendListMobile friends={friends} />
        </Grid>
        <Grid item xs={8} sx={{ border: 'solid' }}>
          <ChatList friends={friends} channelIdList={channels} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: { xs: 'none', sm: 'block' }, border: 'solid' }}
        >
          <FriendList friends={friends} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;

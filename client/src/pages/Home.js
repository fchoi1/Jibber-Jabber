import React from 'react';

import ChatList from '../components/ChatList';
import FriendList from '../components/FriendList';
import FriendListMobile from '../components/FriendListMobile';

import { Box, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12 }}>
        <Grid
          item
          xs={12}
          sx={{ display: { xs: 'block', sm: 'none' }, border: 'solid' }}
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

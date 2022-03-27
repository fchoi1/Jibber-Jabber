import React from 'react';

import ChatList from '../components/ChatList';
import FriendList from '../components/FriendList';
import FriendListMobile from '../components/FriendListMobile';

import { Box, Grid } from '@mui/material';
import './home.css';

const Home = () => {
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
        <Grid item xs={8} className={'main-section'}>
          <ChatList />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: { xs: 'none', sm: 'block' } }}
          className={'main-section'}
        >
          <FriendList />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;

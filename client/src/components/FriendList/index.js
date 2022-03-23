import React from 'react';

import { Box, List, Divider } from '@mui/material';
import FriendListItem from '../FriendListItem';

const FriendList = () => {
  return (
    <Box>
      <h1>Friend lists</h1>
      <List alignitems="flex-start">
        <FriendListItem name="Remy Sharp" isOnline="false" />
        <Divider variant="inset" component="li" />
        <FriendListItem name="Bob Dillion" isOnline={true} />
        <Divider variant="inset" component="li" />
        <FriendListItem name="Richard Smith" isOnline="false" />
        <Divider variant="inset" component="li" />
      </List>
    </Box>
  );
};
export default FriendList;

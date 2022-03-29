import React from 'react';

import { Box, List, Divider } from '@mui/material';
import FriendListItem from '../FriendListItem';

const FriendList = ({ friends }) => {
  return (
    <Box>
      <h2 style={{ paddingLeft: '16px' }}>Friend lists</h2>
      <List alignitems="flex-start">
        {friends &&
          friends.map((friend) => (
            <div key={friend._id}>
              <FriendListItem name={friend.username} isOnline={false} />
              <Divider />
            </div>
          ))}

        {/* <FriendListItem name="Bob Dillion" isOnline={true} />
        <Divider />
        <FriendListItem name="Richard Smith" isOnline={false} />
        <Divider /> */}
      </List>
    </Box>
  );
};
export default FriendList;

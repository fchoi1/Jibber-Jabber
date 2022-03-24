import React from 'react';
import { Stack, Divider } from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';

import FriendListItem from '../FriendListItem';
import './friendlistmobile.css';

const FriendListMobile = () => {
  return (
    <ScrollContainer className="mobile-scroll-container">
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <div>
          <FriendListItem name="Remy Sharp" isOnline={false} />
        </div>

        <div>
          <FriendListItem name="Bob Dillion" isOnline={true} />
        </div>

        <div>
          <FriendListItem name="Richard Smith" isOnline={false} />
        </div>
        <div>
          <FriendListItem name="Richard Smith" isOnline={false} />
        </div>
        <div>
          <FriendListItem name="Richard Smith" isOnline={false} />
        </div>
        
      </Stack>
    </ScrollContainer>
  );
};
export default FriendListMobile;

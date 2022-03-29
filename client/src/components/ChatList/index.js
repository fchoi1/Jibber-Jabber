import React, { useEffect, useState } from 'react';
import { Divider, List } from '@mui/material';

import ChatListItem from '../ChatListItem';
import { QUERY_CHANNEL_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const ChatList = ({ friends }) => {
  const { loading, data: channelData } = useQuery(QUERY_CHANNEL_ME);
  const channels = channelData?.channelMe;

  console.log(channels)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 style={{ paddingLeft: '16px' }}>Your recent chats!</h2>
      <List dense={true}>
        {channels &&
          channels.map((channel) => (
            <div key={channel._id}>
              <ChatListItem channel={channel} />
              <Divider />
            </div>
          ))}

        {/* <ChatListItem channel={channel2} />
        <Divider /> */}
      </List>
    </>
  );
};
export default ChatList;

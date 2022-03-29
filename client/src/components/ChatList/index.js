import React from 'react';
import { Divider, List } from '@mui/material';

import ChatListItem from '../ChatListItem';
import { QUERY_CHANNEL } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const ChatList = ({ channels }) => {

  const channel1 = {
    users: [
      { name: 'John', isOnline: true },
      { name: 'Bob', isOnline: true },
      { name: 'Jake', isOnline: true },
      { name: 'Leo', isOnline: false },
      { name: 'Nathan', isOnline: false },
      { name: 'Lucas', isOnline: true },
      { name: 'Alex', isOnline: false }
    ],
    messages: { sender: 'Bob', textValue: 'this is a test message' },

    channelName: 'test Channel'
  };

  const channel2 = {
    users: [
      { name: 'John', isOnline: true },
      { name: 'Bob', isOnline: true }
    ],
    messages: { sender: 'Bob', textValue: 'this is a test message' },

    channelName: 'test Channel'
  };

  return (
    <>
      <h2 style={{ paddingLeft: '16px' }}>Your recent chats!</h2>
      <List dense={true}>
        {channels &&
          channels.map((channel) => (
            <div key={channel._id}>
              <ChatListItem channel={channel1} />
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

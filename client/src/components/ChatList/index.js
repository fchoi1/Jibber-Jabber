import React from 'react';
import { List } from '@mui/material';

import ChatListItem from '../ChatListItem';

const ChatList = () => {
  const channel = {
    users: [
      { name: 'John', isOnline: true },
      { name: 'Bob', isOnline: true },
      { name: 'Jake', isOnline: true },
      { name: 'Leo', isOnline: false },
      { name: 'Nathan', isOnline: false },
      { name: 'Lucas', isOnline: true },
      { name: 'Alex', isOnline: false }
    ],
    channelName: 'test Channel'
  };

  return (
    <List>
      <ChatListItem channel={channel} />
    </List>
  );
};
export default ChatList;

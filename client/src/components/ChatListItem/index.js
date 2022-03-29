import React from 'react';

import {
  Link,
  ListItem,
  AvatarGroup,
  Avatar,
  ListItemText,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

import auth from '../../utils/auth';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor'
    }
  }
}));

const ChatListItem = ({ channel }) => {
  const currUser = auth.getProfile().data;
  const usersList = channel.users.filter((user) => user._id !== currUser._id);
  console.log(channel);

  return (
    <Link href={`/channel/${channel._id}`} style={{ textDecoration: 'none' }}>
      <ListItem alignItems="flex-start">
        <AvatarGroup max={4} sx={{ pr: 1 }}>
          {usersList.map((user) => (
            <StyledBadge
              key={user._id}
              overlap="circular"
              color={user.isOnline ? 'primary' : 'secondary'}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt={user.username} src="/static/images/avatar/1.jpg" />
            </StyledBadge>
          ))}
        </AvatarGroup>

        <ListItemText
          primary={channel.channelName}
          secondary={
            channel.messages.length > 0 && (
              <>
                <strong>{channel.messages.at(-1).sender.username}</strong> -{' '}
                {channel.messages.at(-1).textValue}
              </>
            )
          }
        />
      </ListItem>
    </Link>
  );
};
export default ChatListItem;

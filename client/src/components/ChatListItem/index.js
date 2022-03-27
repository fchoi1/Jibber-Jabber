import React from 'react';
import {
  ListItem,
  AvatarGroup,
  Avatar,
  ListItemText,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
      //   animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor'
      //   content: '""'
    }
  }
  //   '@keyframes ripple': {
  //     '0%': {
  //       transform: 'scale(.8)',
  //       opacity: 1
  //     },
  //     '100%': {
  //       transform: 'scale(2.4)',
  //       opacity: 0
  //     }
  //   }
}));

const ChatListItem = (props) => {
  const currUser = 'Bob';
  const { channel } = props;

  const usersList = channel.users.filter((user) => user.name !== currUser);

  console.log(usersList);

  return (
    <ListItem alignItems="flex-start">
      <AvatarGroup max={4} sx={{ pr: 1 }}>
        {usersList.map((user) => (
          <StyledBadge
            key={user.name}
            overlap="circular"
            color={user.isOnline ? 'primary' : 'secondary'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
          </StyledBadge>
        ))}
      </AvatarGroup>

      <div>
        <span className={'h-text'}>
          <strong>{channel.channelName}</strong>
        </span>
        <p>
          <strong>{channel.messages.sender}</strong> -{' '}
          {channel.messages.textValue}
        </p>
      </div>
    </ListItem>
  );
};
export default ChatListItem;

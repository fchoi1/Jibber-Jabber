import React from 'react';

import {
  ListItem,
  ListItemAvatar,
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

const FriendListItem = (props) => {
  const { name, isOnline } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <StyledBadge
          color={isOnline ? 'primary' : 'secondary'}
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={name} src="/static/images/avatar/1.jpg" />
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText>
        <h3>{name}</h3>
      </ListItemText>
    </ListItem>
  );
};
export default FriendListItem;

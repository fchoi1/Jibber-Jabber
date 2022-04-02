import React, { useState } from 'react';
import { TextField, List, ListItem, Button } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL_USERS } from '../../utils/queries';
import { CREATE_CHANNEL } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Auth from '../../utils/auth';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[700]),
  backgroundColor: grey[700],
  '&:hover': {
    backgroundColor: grey[900]
  }
}));

function SearchBarUser(props) {
  const [value, setValue] = useState('');
  const [userList, setUserList] = useState([]);

  const [showUserList, setShowUserlist] = useState(false);

  const currentUserId = Auth.getProfile().data._id;
  const currentUsername = Auth.getProfile().data.username;

  const [createChannel] = useMutation(CREATE_CHANNEL);

  let navigate = useNavigate();

  const { loading, data: userData } = useQuery(QUERY_ALL_USERS, {
    onCompleted: (data) => {
      setUserList(data.users);
    }
  });

  const { chats } = props;

  const users = userData?.users;

  const handleChange = (e) => {
    e.preventDefault();
    setShowUserlist(true);

    setValue(e.target.value);
    const filtered = users.filter((user) => {
      return (
        (user.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          e.target.value === '') &&
        !user.username.toLowerCase().includes(currentUsername.toLowerCase())
      );
    });
    setUserList(filtered);
  };

  // check if convo exist between user
  const handleUserClick = async (e) => {
    const userId = e.target.dataset.userid;
    const username = e.target.value;

    for (let i = 0; i < chats.length; i++) {
      const checkuserlist = chats[i].users.filter(
        (u) => u._id === currentUserId || u._id === userId
      );

      if (chats[i].users.length === 2 && checkuserlist.length === 2) {
        // previous chat exists redirect
        return navigate(`/chat/${chats[i]._id}`);
      }
    }
    // create a new chat

    const newChannel = await createChannel({
      variables: {
        users: [{ _id: userId }],
        channelName: `${username}`
      }
    });

    const newChannelId = newChannel.data.createChannel._id;

    return navigate(`/chat/${newChannelId}`);
  };


  const hideList = () => {
    setShowUserlist(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ClickAwayListener onClickAway={hideList}>
      <div>
        <TextField
          InputLabelProps={{
            style: { color: '#fff' }
          }}
          inputProps={{ style: { color: 'white' } }}
          className="searchUsers"
          value={value}
          onChange={handleChange}
          variant="filled"
          size="small"
          label="Search for user"
          autoComplete="off"
        />

        {showUserList && (
          <List dense sx={{ maxHeight: 300, maxWidth: 360 }}>
            {userList &&
              userList.map((u) => (
                <ListItem key={u._id}>
                  <ColorButton
                    variant="contained"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: '#fffff',
                      width: '100%'
                    }}
                    data-userid={u._id}
                    onClick={handleUserClick}
                    value={u.username}
                  >
                    {u.username}
                  </ColorButton>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SearchBarUser;

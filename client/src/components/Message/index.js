import React from 'react';
import Moment from 'react-moment';
import { Grid, ListItemText } from '@mui/material';

const Message = (props) => {
  // extract variables from props object
  const { username, textContent, createdAt, align } = props;
  console.log('timestamp', createdAt);
  return (
    <>
      <Grid
        container
        sx={{
          paddingLeft: '1%',
          paddingRight: '1%',
          display: 'flex',
          justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
        }}
      >
        <Grid
          item
          xs="auto"
          align={align}
          sx={{
            padding: align === 'left' ? '0.4% 3% 0.4% 1%' : '0.4% 1% 0.4% 3%',
            margin: '0.4%',
            border: '1px dashed gray',
            borderRadius: 4,
            fontSize: 'small'
          }}
        >
          <ListItemText primary={textContent} sx={{ margin: 0 }}></ListItemText>
          <h6 style={{ margin: 0 }}>{align === 'left' ? username : 'You'}</h6>
          <Moment
            parse="MMM Do, YYYY at LT"
            fromNow
            className="messageTimestamp"
          >
            {createdAt}
          </Moment>{' '}
        </Grid>
      </Grid>
    </>
  );
};

export default Message;

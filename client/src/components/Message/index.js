import React from 'react';
import Moment from 'react-moment';
import { Grid, ListItemText } from '@mui/material';

import './message.css'


const Message = (props) => { 
  // extract variables from props object
  const { username, textContent, createdAt, align } = props;
  return (
    <>
      <Grid
      className="c-container"
        sx={{
          display: 'flex',
          justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
        }}
      >
        <Grid
        className="item"
          sx={{
            color:'white',
            backgroundColor: align === 'left' ? '#43CC47': '#1982FC'
          }}
        >
          <span id="textMessage">{textContent}</span>
          <p className="sentBy"style={{ margin: 0 }}>{align === 'left' ? username : 'You'}</p>
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

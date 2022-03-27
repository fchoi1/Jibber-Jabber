import React from 'react';
import Moment from 'react-moment';

import './message.css';

const Message = (props) => {
  // extract variables from props object
  const { username, textContent, createdAt } = props;
  return (
    <div className='messageRow'>
      <div className='messageSender'>{username}: </div>
      <div className='messageBody'>{textContent}</div>
      <Moment parse="MMM Do, YYYY at LT" fromNow className="messageTimestamp">
        {createdAt}
      </Moment>
    </div>
  );
};

export default Message;

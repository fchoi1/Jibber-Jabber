import React from 'react';
import Moment from 'react-moment';

const Message = (props) => {
  // extract variables from props object
  const { username, textContent, timeStamp } = props;

  return (
    <>
      <h1>{username}</h1>
      <p>{textContent}</p>
      <Moment fromNow> {timeStamp}</Moment>
    </>
  );
};

export default Message;

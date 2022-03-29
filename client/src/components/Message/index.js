import React from 'react';
import Moment from 'react-moment';

const Message = (props) => {
  // extract variables from props object
  const { username, textContent, createdAt } = props;
  console.log("timestamp" ,createdAt)
  return (
    <>
      <h1>{username}</h1>
      <p>{textContent}</p>
      <Moment parse="MMM Do, YYYY at LT" fromNow className="messageTimestamp">
        {createdAt}
      </Moment>
      
    </>
  );
};

export default Message;

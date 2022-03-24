import React from 'react';

const Message = (props) => {
  // extract variables from props object
  const { username, textContent, timeStamp } = props;

  return (
    <>
      <h1>{username}</h1>
      <p>{textContent}</p>
      <p>{timeStamp}</p>
    </>
  );
};

export default Message;

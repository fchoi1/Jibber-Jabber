import React from 'react';
import Message from '../Message';

const Channel = (props) => {
  // extract variables from props object
  const { channelName, messages, users } = props;

  return (
    <>
      {/* name of channel */}
      <h1>{channelName}</h1>
      {/* map through all users to display their names */}
      <div>
        {users.map((user) => {
          <div key={user._id}>{user}</div>;
        })}
      </div>
      {/* map through all messages to show their content */}
      <div>
        {messages.map((message) => {
          <div key={message._id}>
            <Message
              username={message.username}
              textContent={message.textContent}
              timeStamp={message.timeStamp}
            />
          </div>;
        })}
      </div>
    </>
  );
};

export default Channel;

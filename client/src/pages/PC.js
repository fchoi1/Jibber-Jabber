import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { Query_Channel } from '../utils/mutations';

import { Mutation_SendMessage } from '../utils/mutations';

import {
  useParams,
 
} from 'react-router-dom';

export default function PC() {
  const { channelId } = useParams();
  const senderId = Auth.getProfile().data._id;

  const {  data, refetch } = useQuery(Query_Channel, {
    variables: { id: channelId }
  });

  setInterval(() => {
    refetch();
  }, 2000);

  const [msg, setMessage] = useState('');
  const [sendNow, { error }] = useMutation(Mutation_SendMessage);
  const userFormData = {
    id: channelId,
    textValue: msg,
    senderId: { _id: senderId }
  };
  async function sendMessage(e) {
    e.preventDefault();

    //we can send the message now
    try {
      const response = await sendNow({ variables: userFormData });

      if (!response.data.login) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
    setMessage('');
  }

  return (
    <div className="border border-dark m-4">
      {data
        ? data.channel.messages.map((msg) => {
            if (msg.sender._id === senderId)
              return <p className="border m-3 text-center">{msg.textValue}</p>;
            else return <p className="border m-3 text-left">{msg.textValue}</p>;
          })
        : 'Loading'}

      <div className="p-3 text-center">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={msg}
            placeholder="Your message..."
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

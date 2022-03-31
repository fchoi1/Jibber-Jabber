import React, { createContext, useContext, useState } from 'react';

//instatiate global state object empty
const NotifyContext = createContext();

const NotifyProvider = ({ children }) => {
  // state is most up to date flobal state
  // dispatch is the method to execut to update state

  const [channelNotify, setchannelNotify] = useState(false);

  return (
    <NotifyContext.Provider value={{ channelNotify, setchannelNotify }}>
      {children}
    </NotifyContext.Provider>
  );
};

const useNotifyContext = () => {
  return useContext(NotifyContext);
};

export { NotifyProvider, useNotifyContext };

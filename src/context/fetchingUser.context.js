import { createContext, useState } from "react";

const FetchingUserContext = createContext();

function FetchingUserWrapper({ children }) {
  const [fetchingUser, setFetching] = useState(true);

  return (
    <FetchingUserContext.Provider value={{ fetchingUser, setFetching }}>
      {children}
    </FetchingUserContext.Provider>
  );
}

export { FetchingUserContext, FetchingUserWrapper };

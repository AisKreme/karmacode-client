import { createContext, useState } from "react";

const MyOrgaContext = createContext();

function MyOrgaWrapper({ children }) {
  const [myOrga, setMyOrga] = useState(null);

  return (
    <MyOrgaContext.Provider value={{ myOrga, setMyOrga }}>
      {children}
    </MyOrgaContext.Provider>
  );
}

export { MyOrgaContext, MyOrgaWrapper };

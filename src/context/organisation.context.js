import { createContext, useState } from "react";

const OrganisationContext = createContext();

function OrganisationWrapper({ children }) {
  const [organisation, setOrganisation] = useState(null);

  return (
    <OrganisationContext.Provider value={{ organisation, setOrganisation }}>
      {children}
    </OrganisationContext.Provider>
  );
}

export { OrganisationContext, OrganisationWrapper };

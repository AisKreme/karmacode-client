import { createContext, useState } from "react";

const LandingContext = createContext();

function LandingWrapper({ children }) {
  const [landing, setLanding] = useState(true);

  return (
    <LandingContext.Provider value={{ landing, setLanding }}>
      {children}
    </LandingContext.Provider>
  );
}

export { LandingContext, LandingWrapper };

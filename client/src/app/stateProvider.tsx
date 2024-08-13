import { createContext, Dispatch, SetStateAction, useContext, useReducer, useState } from "react";

export interface StateInterface {
  user: string | null;
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
}

const StateContext = createContext({
  globalState: {} as Partial<StateInterface>,
  setGlobalState: {} as Dispatch<SetStateAction<Partial<StateInterface>>>,
});

const StateProvider = ({ children, value = {} as StateInterface }: { children: React.ReactNode; value?: Partial<StateInterface> }) => {
  const [globalState, setGlobalState] = useState(value);
  return <StateContext.Provider value={{ globalState, setGlobalState }}>{children}</StateContext.Provider>;
};

const useGlobalStateValue = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { StateProvider, useGlobalStateValue };

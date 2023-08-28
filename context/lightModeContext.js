import { createContext, useReducer } from 'react';
import LightModeReducer from './lightModeReducer';

const INITIAL_STATE = {
  lightMode: false,
};

export const LightModeContext = createContext(INITIAL_STATE);

export const LightModeContextProvider = ({ children }) => {
  const [state, dispatchh] = useReducer(LightModeReducer, INITIAL_STATE);

  return (
    <LightModeContext.Provider
      value={{ lightMode: state.lightMode, dispatchh }}
    >
      {children}
    </LightModeContext.Provider>
  );
};

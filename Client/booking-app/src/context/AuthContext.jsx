import { Children, createContext, useReducer } from "react";

const INITIAL_STATE = {
 user: null,
 loading: false,
 error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
   case "LOGIN_START":
    return {
        user: null,
        loading: true,
       error: null,
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children} 
    </AuthContext.Provider>
  );
};

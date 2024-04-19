import React, { ReactNode, createContext, Dispatch, useReducer, useEffect } from 'react';
import { LoginResponse } from '@/pages/admin/types';

type ExtractTypeAndPayload<T> = {

  [K in keyof T]: {
    type: K,
    payload?: T[K]
  }
}
const authKey = 'proc-swift-auth'
interface AuthProviderProps {
  children: ReactNode;
}
type AuthState = {
  user: LoginResponse | null
}
// type AuthStateActionType = "LOGOUT" | "LOGIN"
type AuthStateActionsMap = {
  LOGOUT: void,
  LOGIN: LoginResponse
}

type AuthStateActions = ExtractTypeAndPayload<AuthStateActionsMap>[keyof AuthStateActionsMap]



const initialState = (localStorage.getItem(authKey) ? JSON.parse(localStorage.getItem(authKey)!) : JSON.parse("{}")) as AuthState
const AuthContext = createContext<{ state: AuthState; dispatch: Dispatch<AuthStateActions> }>({ state: initialState, dispatch: () => null })

const authReducer = (state: AuthState, action: AuthStateActions): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload! }
    }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }

}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  useEffect(() => {
    localStorage.setItem(authKey, JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider
      value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext }
export default AuthProvider;

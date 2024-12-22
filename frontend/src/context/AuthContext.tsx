import { UserContextData, UserData } from '@/types/User';
import { createContext, PropsWithChildren, useReducer } from 'react';
import {
  authReducer,
  InitialState,
  initialState,
} from '@/reducers/authReducer';
import { jwtDecode } from 'jwt-decode';

if (localStorage.getItem('jwtToken')) {
  const decodedToken: UserContextData = jwtDecode(
    JSON.stringify(localStorage.getItem('jwtToken'))
  );

  if (decodedToken.exp! * 1000 < Date.now()) {
    localStorage.clear();
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<InitialState>(initialState);

const AuthProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: UserData) {
    localStorage.setItem('jwtToken', userData.token);

    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.clear();

    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

import { AuthContextActions } from '@/context/AuthContext.types';
import { UserContextData, UserData } from '@/types/User';

export type InitialState = {
  user?: UserContextData | null;
  login: (userData: UserData) => void;
  logout: () => void;
};

export const initialState: InitialState = {
  user: null,
  login: () => null,
  logout: () => null,
};

export const authReducer = (
  state: InitialState,
  action: AuthContextActions
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

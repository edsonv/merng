import { UserContextData, UserData } from '@/types/User';

export type AuthContextActions = {
  type: string;
  payload?: UserContextData | null;
};

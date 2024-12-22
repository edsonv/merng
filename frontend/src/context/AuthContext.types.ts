import {  UserData } from '@/types/User';

export type AuthContextActions = {
  type: string;
  payload?: UserData | null;
};

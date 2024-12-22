export type UserData = UserContextData &{
  id: string;
  email: string;
  username: string;
  createdAt?: Date;
  token?: string;
};

export type UserContextData = {
  exp?: number;
  iat?: number;
};

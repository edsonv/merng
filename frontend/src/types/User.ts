export type UserData = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  token: string;
  __typename: string;
};

export type UserContextData = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  username: string;
};

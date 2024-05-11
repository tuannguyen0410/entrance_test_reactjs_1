export type UserInformation = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
};

export type LoginDataResponse = {
  accessToken: string,
  refreshToken: string;
  user: UserInformation;
};

export type LoginParams = {
  email: string,
  password: string,
};

export type LogoutParams = {
  refreshToken: string,
};

export type SignUpParams = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

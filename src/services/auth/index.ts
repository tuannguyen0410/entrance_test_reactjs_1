import {
  LoginParams,
  LoginDataResponse,
  SignUpParams,
  UserInformation,
  LogoutParams,
} from './types';

import axiosInstance from 'services/common/instance';

export const getCustomerInformationService = async (): Promise<UserInformation> => {
  const res = await axiosInstance.get('auth/user');
  return res.data.data;
};

export const loginService = async (params: LoginParams): Promise<LoginDataResponse> => {
  const res = await axiosInstance.post('auth/signin', params);
  return res.data;
};

export const signOutService = async (params: LogoutParams): Promise<void> => {
  await axiosInstance.post('auth/signout', params);
};

export const signUpService = async (params: SignUpParams): Promise<void> => {
  await axiosInstance.post('auth/signup', params);
};

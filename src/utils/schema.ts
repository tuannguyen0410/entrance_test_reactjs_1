/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';

import { LoginParams, SignUpParams } from 'services/auth/types';

export const phoneRegExp = /^0[1-9]\d{8}$/;

type LoginForm = LoginParams & { remember: boolean };

const useSchemas = () => {
  const loginSchema: yup.ObjectSchema<LoginForm> = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    remember: yup.boolean().default(false),
  });

  const signUpSchema: yup.ObjectSchema<SignUpParams> = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    firstName: yup.string().required('Firstname is required'),
    lastName: yup.string().required('Lastname is required'),
  });

  return {
    loginSchema,
    signUpSchema,
  };
};

export default useSchemas;

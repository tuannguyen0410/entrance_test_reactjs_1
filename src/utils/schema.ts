/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';

import { LoginParams, SignUpParams } from 'services/auth/types';

export const phoneRegExp = /^0[1-9]\d{8}$/;

type LoginForm = LoginParams & { remember: boolean };

type SignUpform = SignUpParams & { term: boolean };

const useSchemas = () => {
  const loginSchema: yup.ObjectSchema<LoginForm> = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean().default(false),
  });

  const signUpSchema: yup.ObjectSchema<SignUpform> = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(18, 'Password must be at most 18 characters long')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,18}$/,
        'Password must contain at least one digit, one special character, and one letter'
      ),
    firstName: yup.string().required('Firstname is required'),
    lastName: yup.string().required('Lastname is required'),
    term: yup.boolean().default(false),
  });

  return {
    loginSchema,
    signUpSchema,
  };
};

export default useSchemas;

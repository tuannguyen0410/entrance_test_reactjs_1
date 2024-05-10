/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';

import { LoginParams } from 'services/auth/types';

export const phoneRegExp = /^0[1-9]\d{8}$/;

const useSchemas = () => {
  const loginSchema: yup.ObjectSchema<LoginParams> = yup.object().shape({
    email: yup.string().required('Please enter this field').email(),
    password: yup.string().required('Please enter this field').min(6, 'Password must be at least 6 characters long'),
  });

  const signUpSchema = yup.object().shape({
    email: yup.string().required('Please enter this field').email(),
    password: yup.string().required('Please enter this field').min(6, 'Password must be at least 6 characters long'),
    firstName: yup.string().required('Please enter this field'),
    lastName: yup.string().required('Please enter this field'),
  });

  return {
    loginSchema,
    signUpSchema,
  };
};

export default useSchemas;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import loginBg from 'assets/images/signIn_bg.png';
import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import AuthenticateLayout from 'components/organisms/AuthenticateLayout';
import { signUpService } from 'services/auth';
import { SignUpParams } from 'services/auth/types';
import { getAccessToken, setAccessToken } from 'services/common/storage';
import useSchemas from 'utils/schema';

const SignUp: React.FC = () => {
  const { signUpSchema } = useSchemas();
  const navigator = useNavigate();
  const method = useForm<SignUpParams>({
    mode: 'onSubmit',
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const { mutate: signUpMudate } = useMutation(
    ['signUpService'],
    async (data: SignUpParams) => signUpService(data),
    {
      onSuccess: (data) => {
        navigator('/login');
      },
      // onError: () => {
      //   // setModalLogin(true);
      // }
    }
  );
  const handleSubmit = (data: SignUpParams) => {
    signUpMudate(data);
    console.log('🚀 ~ handleSubmit ~ data:', data);
  };
  return (
    <div className="p-signUp">
      <AuthenticateLayout leftBgImage={loginBg}>
        <Typography.Heading modifiers={['cadet', '500', '18x21']}>
          Adventure starts here
        </Typography.Heading>
        <div className="u-mt-8">
          <Typography.Text modifiers={['oldLavender', '400', '16x18']}>
            Make your app management easy and fun!
          </Typography.Text>
        </div>
        <div className="p-signUp_form u-mt-16">
          <FormProvider {...method}>
            <Controller
              name="email"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  label="Email"
                  error={fieldState.error?.message}
                />
              )}
            />
            <div className="u-mt-16">
              <Controller
                name="password"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="password"
                    placeholder=""
                    required
                    label="Password"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="u-mt-16">
              <Controller
                name="firstName"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder=""
                    required
                    label="firstName"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="u-mt-16">
              <Controller
                name="lastName"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder=""
                    required
                    label="lastName"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Button
              variant="primary"
              sizes="h38"
              type="submit"
              handleClick={method.handleSubmit(handleSubmit)}
            >
              Sign Up
            </Button>
          </FormProvider>
          <Link href="/signup">Sign Up</Link>
        </div>
      </AuthenticateLayout>
    </div>
  );
};

export default SignUp;

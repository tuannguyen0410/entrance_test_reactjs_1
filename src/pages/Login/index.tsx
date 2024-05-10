/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import loginBg from 'assets/images/signIn_bg.png';
import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import AuthenticateLayout from 'components/organisms/AuthenticateLayout';
import { LoginParams } from 'services/auth/types';
import useSchemas from 'utils/schema';

const SignIn: React.FC = () => {
  const { loginSchema } = useSchemas();
  const method = useForm<LoginParams>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = (data: LoginParams) => {
    console.log('🚀 ~ handleSubmit ~ data:', data);
  };
  console.log('🚀 ~ method:', method.formState.errors);
  return (
    <div className="p-signIn">
      <AuthenticateLayout leftBgImage={loginBg}>
        <Typography.Heading modifiers={['cadet', '500', '18x21']}>
          Welcome to Entrance Test Interview!
        </Typography.Heading>
        <div className="u-mt-8">
          <Typography.Text modifiers={['oldLavender', '400', '16x18']}>
            Please sign-in to your account and start the adventure
          </Typography.Text>
        </div>
        <div className="p-signIn_form u-mt-16">
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
            <Button
              variant="primary"
              sizes="h38"
              type="submit"
              handleClick={method.handleSubmit(handleSubmit)}
            >
              Login
            </Button>
          </FormProvider>
          <Checkbox id="remember" name="Remember me" checked>
            Remember me
          </Checkbox>
          <Link href="/signup">Sign Up</Link>
        </div>
      </AuthenticateLayout>
    </div>
  );
};

export default SignIn;

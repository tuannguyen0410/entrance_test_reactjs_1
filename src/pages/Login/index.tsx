/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
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
import SocialBtnGroup from 'components/organisms/SocialBtnGroup';
import { loginService } from 'services/auth';
import { LoginParams } from 'services/auth/types';
import { getAccessToken, setAccessToken, setRefreshToken } from 'services/common/storage';
import { setUserProfile } from 'store/auth';
import { useAppDispatch } from 'store/hooks';
import { socialList } from 'utils/constant';
import useSchemas from 'utils/schema';

type LoginForm = LoginParams & { remember: boolean };

const Login: React.FC = () => {
  const token = getAccessToken();
  const dispatch = useAppDispatch();
  const { loginSchema } = useSchemas();
  const navigator = useNavigate();
  const [actionStatus, setActionStatus] = useState<{
    isOpen: boolean,
    isSuccess: boolean,
    message: string,
  }>({
    isOpen: false,
    isSuccess: false,
    message: ''
  });
  const method = useForm<LoginForm>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const { mutate: loginMutate, isLoading } = useMutation(
    ['loginService'],
    async (data: LoginParams) => loginService(data),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        dispatch(setUserProfile(data.user));
        setActionStatus({
          isOpen: true,
          isSuccess: true,
          message: 'Login successfully',
        });
        navigator('/');
      },
      onError: () => {
        setActionStatus({
          isOpen: true,
          isSuccess: false,
          message: 'Login failed !',
        });
      }
    }
  );
  const handleSubmit = (data: LoginParams) => {
    loginMutate(data);
  };
  useEffect(() => {
    if (token) {
      navigator('/');
    }
  }, [token, navigator]);
  return (
    <div className="p-login">
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1 }}
      >
        <Toast bg={actionStatus.isSuccess ? 'success' : 'danger'} show={actionStatus.isOpen} delay={3000} autohide>
          <Toast.Body>
            <Typography.Text modifiers={['white', '400', '16x18']}>
              {actionStatus.message}
            </Typography.Text>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <AuthenticateLayout leftBgImage={loginBg}>
        <div className="p-login_form">
          <Typography.Heading modifiers={['cadet', '500', '18x21']}>
            Welcome to Entrance Test Interview!
          </Typography.Heading>
          <div className="u-mt-8">
            <Typography.Text modifiers={['oldLavender', '400', '16x18']}>
              Please sign-in to your account and start the adventure
            </Typography.Text>
          </div>
          <div className="u-mt-16">
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
                      onChange={(el) => onChange(el.target.value)}
                      type="password"
                      placeholder=""
                      required
                      label="Password"
                      error={fieldState.error?.message}
                      link={{
                        title: 'Forgot Password?',
                        onClick: () => { }
                      }}
                    />
                  )}
                />
              </div>
              <div className="u-mt-16">
                <Controller
                  name="remember"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      variant="normal"
                      onChange={onChange}
                      checked={value}
                      label="Remember me"
                    />
                  )}
                />
              </div>
              <div className="u-mt-16">
                <Button
                  variant="primary"
                  sizes="h38"
                  type="submit"
                  disabled={isLoading}
                  handleClick={method.handleSubmit(handleSubmit)}
                >
                  Login
                </Button>
              </div>
            </FormProvider>
          </div>
          <div className="a-text-center u-mt-16">
            <Typography.Text type="span" modifiers={['oldLavender', '400', '14x21']}>
              New on our platform?
              {' '}
            </Typography.Text>
            <Link customClassName="a-text-mediumSlateBlue" href="/signup">Create an account</Link>
          </div>
          <div className="a-text-center u-mt-16">
            <div className="separator">
              or
            </div>
          </div>
          <div className="a-text-center u-mt-16">
            <SocialBtnGroup socialList={socialList} />
          </div>
        </div>
      </AuthenticateLayout>
    </div>
  );
};

export default Login;

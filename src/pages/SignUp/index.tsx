/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
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
import { signUpService } from 'services/auth';
import { SignUpParams } from 'services/auth/types';
import { socialList } from 'utils/constant';
import useSchemas from 'utils/schema';

type SignUpform = SignUpParams & { term: boolean };

const SignUp: React.FC = () => {
  const { signUpSchema } = useSchemas();
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
  const method = useForm<SignUpform>({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      term: false,
    },
  });

  const watchTerm = method.watch('term');

  const { mutate: signUpMudate, isLoading } = useMutation(
    ['signUpService'],
    async (data: SignUpParams) => signUpService(data),
    {
      onSuccess: () => {
        setActionStatus({
          isOpen: true,
          isSuccess: true,
          message: 'Sign Up successfully',
        });
        navigator('/login');
      },
      onError: () => {
        setActionStatus({
          isOpen: true,
          isSuccess: false,
          message: 'Sign Up failed !',
        });
      }
    }
  );
  const handleSubmit = (data: SignUpParams) => {
    signUpMudate(data);
  };
  return (
    <div className="p-signUp">
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
        <div className="p-signUp_form u-mt-16">
          <Typography.Heading modifiers={['cadet', '500', '18x21']}>
            Adventure starts here
          </Typography.Heading>
          <div className="u-mt-8">
            <Typography.Text modifiers={['oldLavender', '400', '16x18']}>
              Make your app management easy and fun!
            </Typography.Text>
          </div>
          <div className="u-mt-16">
            <FormProvider {...method}>
              <Controller
                name="firstName"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="johndoe"
                    required
                    label="FirstName"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <div className="u-mt-16">
                <Controller
                  name="lastName"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      type="text"
                      placeholder="johndoe"
                      required
                      label="LastName"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <div className="u-mt-16">
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
              </div>
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
                  name="term"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      variant="normal"
                      onChange={onChange}
                      checked={value}
                      label="I agree to"
                      link={{
                        title: 'privacy policy & terms',
                        onClick: () => { }
                      }}
                    />
                  )}
                />
              </div>
              <div className="u-mt-16">
                <Button
                  variant="primary"
                  sizes="h38"
                  type="submit"
                  handleClick={method.handleSubmit(handleSubmit)}
                  disabled={!watchTerm || isLoading}
                >
                  Sign Up
                </Button>
              </div>
            </FormProvider>
          </div>
          <div className="a-text-center u-mt-16">
            <Typography.Text type="span" modifiers={['oldLavender', '400', '14x21']}>
              Already have an account?
              {' '}
            </Typography.Text>
            <Link customClassName="a-text-mediumSlateBlue" href="/login">Sign in instead</Link>
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

export default SignUp;

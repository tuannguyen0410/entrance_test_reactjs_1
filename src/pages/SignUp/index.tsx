import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import signUpBg from 'assets/images/signUp_bg.png';
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

  const { mutate: signUpMutate, isLoading } = useMutation(
    ['signUpService'],
    async (data: SignUpParams) => signUpService(data),
    {
      onSuccess: () => {
        toast.success('SignUp Successfully!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigator('/login');
      },
      onError: () => {
        toast.error('Sign Up Failed!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  );
  const handleSubmit = (data: SignUpParams) => {
    signUpMutate(data);
  };
  return (
    <div className="p-signUp">
      <AuthenticateLayout leftBgImage={signUpBg}>
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
                  disabled={!watchTerm || isLoading || !method.formState.isValid}
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

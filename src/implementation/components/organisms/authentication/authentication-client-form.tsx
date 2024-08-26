'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { AuthenticationClientFormProps } from './authentication.types';
import { ErrorLabel } from '@/components/atoms/error-label';
import { initialState } from '@/utils/next/constants';
import { useFormState, useFormStatus } from 'react-dom';

const fieldsToRenderMap = {
  signIn: ['emailOrUserName', 'password'],
  signUp: ['email', 'userName', 'password', 'confirmPassword'],
  forgotPassword: ['emailOrUserName'],
  resetPassword: ['password', 'confirmPassword'],
};

const cta = {
  signIn: 'Log in',
  signUp: 'Sign Up',
  forgotPassword: 'Send Reset Password Email',
  resetPassword: 'Reset Password',
};

const informationText = {
  signIn: '',
  signUp: 'Please enter your details to create an account',
  forgotPassword: 'Please enter your email or username to reset your password',
  resetPassword: 'Please enter your new password',
};

export function AuthenticationClientForm({
  serverAction,
  state,
}: AuthenticationClientFormProps): JSX.Element {
  const [formState, formAction] = useFormState(serverAction, initialState);
  const { pending } = useFormStatus();
  const fieldsToRender = fieldsToRenderMap[state];

  return (
    <>
      <form className="flex flex-col" action={formAction}>
        {informationText[state] && (
          <p className="text-center">{informationText[state]}</p>
        )}
        {fieldsToRender.includes('emailOrUserName') && (
          <>
            <Input
              className="mt-5"
              name="emailOrUserName"
              type="text"
              label="User or Email"
            />
            <ErrorLabel
              className="mt-1"
              error={formState.errors.emailOrUserName}
            />
          </>
        )}
        {fieldsToRender.includes('userName') && (
          <>
            <Input
              className="mt-5"
              name="userName"
              type="text"
              label="User Name"
            />
            <ErrorLabel className="mt-1" error={formState.errors.userName} />
          </>
        )}
        {fieldsToRender.includes('email') && (
          <>
            <Input className="mt-5" name="email" type="email" label="Email" />
            <ErrorLabel className="mt-1" error={formState.errors.email} />
          </>
        )}
        {fieldsToRender.includes('password') && (
          <>
            <Input
              className="mt-5"
              name="password"
              type="password"
              label={state === 'resetPassword' ? 'New Password' : 'Password'}
            />
            <ErrorLabel className="mt-1" error={formState.errors.password} />
          </>
        )}
        {fieldsToRender.includes('confirmPassword') && (
          <>
            <Input
              className="mt-5"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <ErrorLabel
              className="mt-1"
              error={formState.errors.confirmPassword}
            />
          </>
        )}
        {!pending && (
          <Button className="mt-5" color="primary" type="submit">
            {cta[state]}
          </Button>
        )}
        <ErrorLabel className="mt-1" error={formState.errors.submit} />
      </form>
    </>
  );
}

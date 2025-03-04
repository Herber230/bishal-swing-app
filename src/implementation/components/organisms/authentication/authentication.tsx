'use client';

import { useEffect, useState, useActionState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@heroui/button';
import { ErrorLabel } from '@/components/atoms/error-label';
import { PhoneInputFormField } from '@/components/molecules/phone-input-fom-field';
import { TextInputFormField } from '@/components/molecules/text-input-form-field';
import { NonCtrlSwitchInputFormField } from '@/components/molecules/switch-input-form-field';
import { initialState } from '@/utils/next/constants';
import { AuthenticationProps } from './authentication.types';
import { useRouter } from 'next/navigation';

const fieldsToRenderMap = {
  signIn: ['userName', 'phone', 'usePhone', 'password'],
  signUp: [
    'userName',
    'phone',
    'firstName',
    'lastName',
    'password',
    'confirmPassword',
  ],
  forgotPassword: ['userName', 'phone', 'usePhone'],
  resetPassword: ['password', 'confirmPassword'],
};

const cta = {
  signIn: 'Log in',
  signUp: 'Sign Up',
  forgotPassword: 'Send Reset Password Link',
  resetPassword: 'Reset Password',
};

const informationText = {
  signIn: 'Please enter your details to log in',
  signUp: 'Please enter your details to create an account',
  forgotPassword: 'Please enter your phone or username to reset your password',
  resetPassword: 'Please enter your new password',
};

const successText = {
  signIn: undefined,
  signUp: {
    notification: 'Account created successfully',
    fixedInformation: 'Please check your whatsapp for a verification link',
  },
  forgotPassword: {
    notification: 'Reset password request sent successfully',
    fixedInformation: 'Please check your whatsapp for a verification link',
  },
  resetPassword: {
    notification: 'Password reset successfully',
    fixedInformation: undefined,
  },
};

const successRedirect = {
  signIn: undefined,
  signUp: undefined,
  forgotPassword: undefined,
  resetPassword: '/auth/sign-in',
};

export function Authentication({ serverAction, state }: AuthenticationProps) {
  const [formState, formAction] = useActionState(serverAction, initialState);
  const [usingPhone, setUsingPhone] = useState(false);
  const router = useRouter();

  const fieldsToRender = fieldsToRenderMap[state];
  const showPhoneField =
    state === 'signUp' || (fieldsToRender.includes('phone') && usingPhone);

  useEffect(() => {
    if (formState.success) {
      if (successText[state]?.notification)
        toast.success(successText[state].notification);
      if (successRedirect[state]) router.push(successRedirect[state]);
    }
  }, [state, formState.success, router]);

  if (formState.success && successText[state]?.fixedInformation)
    return <p className="text-center">{successText[state].fixedInformation}</p>;

  return (
    <form className="flex flex-col" action={formAction}>
      {informationText[state] && (
        <p className="text-center mb-5">{informationText[state]}</p>
      )}
      {fieldsToRender.includes('userName') && !usingPhone && (
        <TextInputFormField
          label="User Name"
          name="userName"
          externalError={formState.errors.userName}
        />
      )}
      {showPhoneField && (
        <PhoneInputFormField externalError={formState.errors.phone} />
      )}
      {fieldsToRender.includes('usePhone') && (
        <NonCtrlSwitchInputFormField
          name="usePhone"
          label="Use Phone"
          value={usingPhone}
          onChange={setUsingPhone}
        />
      )}
      {fieldsToRender.includes('firstName') && (
        <TextInputFormField
          label="First Name"
          name="firstName"
          externalError={formState.errors.firstName}
        />
      )}
      {fieldsToRender.includes('lastName') && (
        <TextInputFormField
          label="Last Name"
          name="lastName"
          externalError={formState.errors.lastName}
        />
      )}
      {fieldsToRender.includes('password') && (
        <TextInputFormField
          label={state === 'resetPassword' ? 'New Password' : 'Password'}
          name="password"
          type="password"
          externalError={formState.errors.password}
        />
      )}
      {fieldsToRender.includes('confirmPassword') && (
        <TextInputFormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          externalError={formState.errors.confirmPassword}
        />
      )}
      <Button className="mt-5" color="primary" type="submit">
        {cta[state]}
      </Button>
      <ErrorLabel className="mt-1" error={formState.errors.submit} />
    </form>
  );
}

'use client';

import { useState, useActionState } from 'react';
import { Button } from '@heroui/button';
import { ErrorLabel } from '@/components/atoms/error-label';
import { PhoneInputFormField } from '@/components/molecules/phone-input-fom-field';
import { TextInputFormField } from '@/components/molecules/text-input-form-field';
import { NonCtrlSwitchInputFormField } from '@/components/molecules/switch-input-form-field';
import { initialState } from '@/utils/next/constants';
import { AuthenticationProps } from './authentication.types';
import { useTranslations } from 'next-intl';
import {
  fieldsToRenderMap,
  useFormSuccess,
  successRedirect,
  getWordingKeysByState,
} from './lib';

export function Authentication({
  serverAction,
  state,
  ns = 'authentication',
}: AuthenticationProps) {
  const t = useTranslations(ns);
  const [formState, formAction] = useActionState(serverAction, initialState);
  const [usingPhone, setUsingPhone] = useState(false);

  const stateWording = getWordingKeysByState(state);
  const fieldsToRender = fieldsToRenderMap[state];
  const showPhoneField =
    state === 'signUp' || (fieldsToRender.includes('phone') && usingPhone);

  useFormSuccess(
    formState.success,
    stateWording('successNotification') &&
      t(stateWording('successNotification') as string),
    successRedirect[state],
  );

  if (formState.success && stateWording('successFixedMessage'))
    return (
      <p className="text-center">
        {t(stateWording('successFixedMessage') as string)}
      </p>
    );

  return (
    <form className="flex flex-col" action={formAction}>
      {stateWording('infoHead') && (
        <p className="text-center mb-5">
          {t(stateWording('infoHead') as string)}
        </p>
      )}
      {fieldsToRender.includes('userName') && !usingPhone && (
        <TextInputFormField
          label={t('userName')}
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
          label={t('usePhone')}
          value={usingPhone}
          onChange={setUsingPhone}
        />
      )}
      {fieldsToRender.includes('firstName') && (
        <TextInputFormField
          label={t('firstName')}
          name="firstName"
          externalError={formState.errors.firstName}
        />
      )}
      {fieldsToRender.includes('lastName') && (
        <TextInputFormField
          label={t('lastName')}
          name="lastName"
          externalError={formState.errors.lastName}
        />
      )}
      {fieldsToRender.includes('password') && (
        <TextInputFormField
          label={state === 'resetPassword' ? t('newPassword') : t('password')}
          name="password"
          type="password"
          externalError={formState.errors.password}
        />
      )}
      {fieldsToRender.includes('confirmPassword') && (
        <TextInputFormField
          label={t('confirmPassword')}
          name="confirmPassword"
          type="password"
          externalError={formState.errors.confirmPassword}
        />
      )}
      <Button className="mt-5" color="primary" type="submit">
        {t(stateWording('cta') as string)}
      </Button>
      <ErrorLabel className="mt-1" error={formState.errors.submit} />
    </form>
  );
}

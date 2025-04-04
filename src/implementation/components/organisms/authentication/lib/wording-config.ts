import type { AuthenticationState } from '../authentication.types';

const validKeys = {
  signIn: ['signIn.cta', 'signIn.infoHead'],
  signUp: [
    'signUp.cta',
    'signUp.infoHead',
    'signUp.successNotification',
    'signUp.successFixedMessage',
  ],
  forgotPassword: [
    'forgotPassword.cta',
    'forgotPassword.infoHead',
    'forgotPassword.successNotification',
    'forgotPassword.successFixedMessage',
  ],
  resetPassword: [
    'resetPassword.cta',
    'resetPassword.infoHead',
    'resetPassword.successNotification',
  ],
};

export const getWordingKeysByState =
  (state: AuthenticationState) => (keyPart: string) =>
    validKeys[state].find(key => key.includes(keyPart));

export const fieldsToRenderMap = {
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

export const successRedirect = {
  signIn: '/home',
  signUp: undefined,
  forgotPassword: undefined,
  resetPassword: '/auth/sign-in',
};

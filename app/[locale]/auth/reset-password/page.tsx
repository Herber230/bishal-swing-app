import { verifyForgotPasswordTokenFromServer } from './actions';
import { AuthenticationWithResetPasswordContext } from './client';
import { getServerTranslations } from '@/utils/i18n/get-server-translations';

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { t } = await getServerTranslations();

  const token = searchParams['token'];
  if (!token) {
    return <p>{t('authentication.forgotPassword.badUrl')}</p>;
  }

  const verifyResult = await verifyForgotPasswordTokenFromServer(token);
  if (!verifyResult.success) {
    return <p>{verifyResult.message}</p>;
  }

  // Hack to bind the server action to the client component
  return <AuthenticationWithResetPasswordContext token={token} />;
}

import { Authentication } from '@/components/organisms/authentication';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { SignInWithFacebook } from '@/components/atoms/sign-in-with-facebook';
import { SignInWithGoogle } from '@/components/atoms/sign-in-with-google';
import { performSignInFromServer } from './actions';
import { getServerTranslations } from '@/utils/i18n/get-server-translations';

export default async function Page() {
  const { t } = await getServerTranslations();

  return (
    <>
      <Authentication
        className="mx-auto"
        state="signIn"
        serverAction={performSignInFromServer}
      />
      <Link className="block mt-5" href="/auth/forgot-password">
        {t('authentication.forgotPasswordQuestion')}
      </Link>
      <Link className="block mt-2" href="/auth/sign-up">
        {t('authentication.createAccountQuestion')}
      </Link>
      <Divider className="my-5" />
      <div className="flex flex-col">
        <p className="text-center font-light text-gray-500">
          {t('authentication.externalAccount')}
        </p>
        <SignInWithGoogle className="mt-5" />
        <SignInWithFacebook className="mt-5" />
      </div>
    </>
  );
}

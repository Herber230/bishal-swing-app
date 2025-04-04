import { VerifyToken } from './client';
import { getServerTranslations } from '@/utils/i18n/get-server-translations';

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { t } = await getServerTranslations();

  const token = searchParams['token'];
  if (!token) return <p>{t('authentication.verifyAccount.invalidLink')}</p>;

  return (
    <>
      <VerifyToken token={token} />
      <p>{t('authentication.verifyAccount.weAreVerifying')}</p>
    </>
  );
}

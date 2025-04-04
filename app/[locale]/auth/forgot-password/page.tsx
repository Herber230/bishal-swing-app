import { Authentication } from '@/components/organisms/authentication';
import { performForgotPasswordFromServer } from './actions';

export default async function Page() {
  return (
    <div className="flex">
      <Authentication
        className="mx-auto"
        state="forgotPassword"
        serverAction={performForgotPasswordFromServer}
      />
    </div>
  );
}

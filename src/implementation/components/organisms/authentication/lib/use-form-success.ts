import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function useFormSuccess(
  formSuccess: boolean,
  notification = '',
  redirect = '',
) {
  const router = useRouter();

  useEffect(() => {
    if (formSuccess) {
      if (notification) {
        toast.success(notification);
      }
      if (redirect) {
        router.push(redirect);
      }
    }
  }, [formSuccess, notification, redirect, router]);
}

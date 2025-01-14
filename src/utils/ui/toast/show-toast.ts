import { toast } from 'react-toastify';
import { ToastType } from './toast.types';

export function showToast(type: ToastType, message: string) {
  switch (type) {
    case 'info':
      toast.info(message);
      break;
    case 'success':
      toast.success(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'error':
      toast.error(message);
      break;
  }
}

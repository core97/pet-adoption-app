import { Notfication } from '@notification/model';

export interface NotificationItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification?: Notfication;
  onOpen?: () => void;
}

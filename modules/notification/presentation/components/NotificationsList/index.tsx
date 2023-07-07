'use client';

import { useState, useCallback } from 'react';
import {
  UnorderedList,
  ListItem,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Notfication } from '@notification/model';
import { NotificationItemModal } from '@notification/presentation/components/NotificationItemModal';
import { updateNotificationHasBeenSeen } from '@notification/presentation/notification-fetcher';
import { NotificationsListProps } from './NotificationsList.interface';

export const NotificationsList = ({
  notifications,
}: NotificationsListProps) => {
  const [list, setList] = useState(notifications);

  const [notificationSelected, setNotificationSelected] =
    useState<Notfication>();

  const modalHandler = useDisclosure();

  const handleOnOpenModal = useCallback(async () => {
    if (notificationSelected) {
      await updateNotificationHasBeenSeen({
        notificationId: notificationSelected?.id,
      });

      setList(prev =>
        prev.map(item => ({
          ...item,
          hasBeenSeen: item.id === notificationSelected?.id,
        }))
      );
    }
  }, [notificationSelected]);

  return (
    <>
      <UnorderedList listStyleType="none">
        {list.map(item => (
          <ListItem key={item.id}>
            <Button
              variant="ghost"
              colorScheme={item.hasBeenSeen ? 'gray' : 'red'}
              onClick={() => {
                setNotificationSelected(item);
                modalHandler.onOpen();
              }}
            >
              {item.type}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
      <NotificationItemModal
        isOpen={modalHandler.isOpen}
        notification={notificationSelected}
        onOpen={handleOnOpenModal}
        onClose={() => {
          setNotificationSelected(undefined);
          modalHandler.onClose();
        }}
      />
    </>
  );
};

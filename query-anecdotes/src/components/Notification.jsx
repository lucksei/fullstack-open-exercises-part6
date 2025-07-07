import { useContext, useEffect } from 'react';
import NotificationContext, {
  setNotificationHelper,
} from '../context/NotificationContext';

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return <></>;

  return <div style={style}>{notification}</div>;
};

export default Notification;

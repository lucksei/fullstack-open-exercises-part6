import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  console.log(notification, notificationDispatch);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (true) return null;

  return <div style={style}></div>;
};

export default Notification;

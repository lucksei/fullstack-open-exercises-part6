import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};
NotificationContextProvider.propTypes = {
  children: PropTypes.node,
};

const setNotificationHelper = (dispatch, text, time) => {
  dispatch({ type: 'ADD_NOTIFICATION', payload: text });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  }, time);
};

export { setNotificationHelper };
export default NotificationContext;

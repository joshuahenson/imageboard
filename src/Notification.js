import React, { PropTypes } from 'react';

const Notification = ({ notificationState, hideNotification }) => {
  return (
    <div className={`modal ${notificationState.active && 'is-active'}`}>
      <div className="modal-background" onClick={() => hideNotification()} />
      <div className="modal-content">
        <div className={`notification ${notificationState.type}`}>
          <button className="delete" onClick={() => hideNotification()} />
          {notificationState.message}
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notificationState: PropTypes.object,
  hideNotification: PropTypes.func
};

export default Notification;

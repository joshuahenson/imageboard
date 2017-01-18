import React, { PropTypes } from 'react';

const Notification = ({ notificationState, closeNotification }) => {
  return (
    <div className={`modal ${notificationState.active && 'is-active'}`}>
      <div className="modal-background" onClick={() => closeNotification()} />
      <div className="modal-content">
        <div className={`notification ${notificationState.type}`}>
          <button className="delete" onClick={() => closeNotification()} />
          {notificationState.message}
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notificationState: PropTypes.object,
  closeNotification: PropTypes.func
};

export default Notification;

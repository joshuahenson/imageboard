import React, { PropTypes } from 'react';

// TODO: fix sizing
// TODO: delete button
const ImageModal = ({ active, url, description, closeModal }) => {
  return (
    <div className={`modal ${active && 'is-active'}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" />
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <img src={url} alt={description} />
          <p className="modal-card-body">
            {description}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger">Show delete if user</button>
        </footer>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  active: PropTypes.bool,
  url: PropTypes.string,
  description: PropTypes.string,
  closeModal: PropTypes.func
};

export default ImageModal;

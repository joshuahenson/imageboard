import React, { PropTypes, Component } from 'react';

// TODO: fix sizing
// TODO: delete button
class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleError = this.handleError.bind(this);
    this.close = this.close.bind(this);
  }
  handleError() {
    this.setState({ error: true });
  }
  close() {
    this.props.closeModal();
    this.setState({ error: false });
  }
  render() {
    const { active, url, id, userImage, description, deleting, handleDelete } = this.props;
    const { error } = this.state;
    return (
      <div className={`modal ${active && 'is-active'}`}>
        <div className="modal-background" onClick={this.close} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" />
            <button className="delete" onClick={this.close} />
          </header>
          <section className="modal-card-body">
            <img src={error ? '/camera.png' : url} alt={description} onError={this.handleError} />
            <p className="modal-card-body">
              {description}
            </p>
          </section>
          {
            userImage &&
              <footer className="modal-card-foot">
                <button className={`button is-danger ${deleting && 'is-loading'}`} onClick={() => handleDelete(id)}>
                  Show delete if user
                </button>
              </footer>
          }
        </div>
      </div>
    );
  }
}

ImageModal.propTypes = {
  active: PropTypes.bool,
  url: PropTypes.string,
  id: PropTypes.string,
  deleting: PropTypes.bool,
  userImage: PropTypes.bool,
  description: PropTypes.string,
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func
};

export default ImageModal;

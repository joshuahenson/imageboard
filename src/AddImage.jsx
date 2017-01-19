import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      imageDescription: '',
      submitting: false,
      imageUrlError: '',
      imageDescriptionError: '',
      message: '',
      messageType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  validate() {
    this.setState({
      imageUrlError: '',
      imageDescriptionError: ''
    });
    if (!this.state.imageUrl || !this.state.imageDescription) {
      if (!this.state.imageUrl) {
        this.setState({ imageUrlError: 'URL REQUIRED' });
      }
      if (!this.state.imageDescription) {
        this.setState({ imageDescriptionError: 'DESCRIPTION REQUIRED' });
      }
      return false;
    }
    if (!this.state.imageUrl.match(/^http(s)?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
      this.setState({ imageUrlError: 'VALID URL REQUIRED' });
      return false;
    }
    this.setState({
      imageUrlError: '',
      imageDescriptionError: ''
    });
    return true;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      this.setState({ submitting: true });
      axios.put('/api/image', {
        url: this.state.imageUrl,
        description: this.state.imageDescription
      })
      .then(() => {
        this.setState({
          imageUrl: '',
          imageDescription: '',
          submitting: false,
          message: 'Your image has been added',
          messageType: 'is-success'
        });
        setTimeout(() => {
          this.setState({
            message: '',
            messageType: ''
          });
        }, 5000);
      })
      .catch(() => {
        this.setState({
          submitting: false,
          message: 'SERVER ERROR: Please try again',
          messageType: 'is-danger'
        });
        setTimeout(() => {
          this.setState({
            message: '',
            messageType: ''
          });
        }, 5000);
      });
    }
  }
  render() {
    const { imageUrl, imageDescription, submitting, imageUrlError, imageDescriptionError, message, messageType } = this.state;
    const { userId } = this.props;
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="imageUrl" className="label">Image URL</label>
            <p className="control">
              <input
                name="imageUrl" className={`input ${imageUrlError && 'is-danger'}`} type="text" onChange={this.handleChange}
                placeholder="http://example.com/image.jpg" value={imageUrl}
              />
              <span className="help is-danger">{imageUrlError}</span>
            </p>
            <label htmlFor="imageDescription" className="label">Image Description</label>
            <p className="control">
              <textarea
                name="imageDescription" className={`textarea ${imageDescriptionError && 'is-danger'}`}
                type="text" value={imageDescription} placeholder="What would you like to share?"
                onChange={this.handleChange}
              />
              <span className="help is-danger">{imageDescriptionError}</span>
            </p>
            <p className="control">
              <button
                type="submit" className={`button is-primary ${submitting && 'is-loading'}`}
                disabled={submitting || !userId}
              >
                {userId ? 'Add Image' : 'Login Required'}
              </button>
            </p>
          </form>
          {
            message &&
            <div className={`message ${messageType}`} style={{ marginTop: '10px' }}>
              <div className="message-body has-text-centered">
                {message}
              </div>
            </div>
          }
        </div>
      </section>
    );
  }
}

AddImage.propTypes = {
  userId: PropTypes.string
};

export default AddImage;

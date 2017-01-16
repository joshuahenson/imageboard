import React, { Component } from 'react';
import axios from 'axios';

// TODO: only show if logged in
// TODO: Standardize url inputs? (add http if missing?)
// TODO: Notification of errors/success
class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      imageDescription: '',
      submitting: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // TODO: validate
  // TODO: preview before submitting?
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    axios.put('/api/image', {
      url: this.state.imageUrl,
      description: this.state.imageDescription
    })
    .then((response) => {
      console.log(response.status);
      this.setState({
        imageUrl: '',
        imageDescription: '',
        submitting: false
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({ submitting: false });
    });
  }
  render() {
    const { imageUrl, imageDescription, submitting } = this.state;
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="imageUrl" className="label">Image URL</label>
            <p className="control">
              <input
                name="imageUrl" className="input" type="text" onChange={this.handleChange}
                placeholder="http://example.com/image.jpg" value={imageUrl}
              />
            </p>
            <label htmlFor="imageDescription" className="label">Image Description</label>
            <p className="control">
              <textarea
                name="imageDescription" className="textarea" type="text" value={imageDescription}
                placeholder="What would you like to share?" onChange={this.handleChange}
              />
            </p>
            <p className="control">
              <button
                type="submit" className={`button is-primary ${submitting && 'is-loading'}`} disabled={submitting}
              >
                Add Image
              </button>
            </p>
          </form>
        </div>
      </section>
    );
  }
}

export default AddImage;

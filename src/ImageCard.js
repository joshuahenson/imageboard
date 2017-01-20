import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      userLiked: (this.props.image.likes.indexOf(this.props.userId) > -1),
      likes: this.props.image.likes.length
    };
    this.handleError = this.handleError.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }
  componentDidUpdate(prevProps) {
    // cloned props are delayed requiring me to check if userId has been updated
    // must be careful when setting state here to not cause infinite render
    if (prevProps.userId !== this.props.userId) {
      if (this.props.image.likes.indexOf(this.props.userId) > -1) {
        this.setState({ userLiked: true }); // eslint-disable-line react/no-did-update-set-state
      } else if (this.props.image.likes.indexOf(prevProps.userId) > -1) {
        this.setState({ userLiked: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }
  handleError() {
    this.setState({ error: true });
  }
  handleLike() {
    const { userLiked, likes } = this.state;
    if (this.props.userId) {
        // optimistic update of state
      this.setState({ userLiked: !userLiked, likes: userLiked ? likes - 1 : likes + 1 });
      // update server
      axios.post('/api/image', { imageId: this.props.image._id, like: !userLiked })
        .then()
        .catch(() => {
          this.props.showNotification('SERVER ERROR: Please try again', 'is-danger');
          this.setState({ userLiked, likes }); // set state back to initial state
        });
    } else { // user not logged in
      this.props.showNotification('Please log in first', 'is-info');
    }
  }
  render() {
    const { image, userId, openImageModal } = this.props;
    const { error, userLiked } = this.state;
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image pointer">
            <img
              src={error ? '/camera.png' : image.url} alt={image.description}
              onClick={() => openImageModal(image.url, image.description, image._id, userId === image.user.userId)}
              onError={this.handleError}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <Link to={`/images/${image.user.userId}`}>
                <figure>
                  <img src={image.user.profilePhoto} alt={image.user.userName} height="35" width="35" />
                </figure>
              </Link>
            </div>
            <div className="media-content">
              <button
                onClick={this.handleLike}
                className={`button is-outlined is-pulled-right ${userLiked && 'is-primary'}`}
              >
                <span className="icon is-small">
                  <i className="fa fa-star-o" />
                </span>
                <span>{this.state.likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  userId: PropTypes.string,
  openImageModal: PropTypes.func,
  showNotification: PropTypes.func
};

export default ImageCard;

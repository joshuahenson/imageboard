import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleError = this.handleError.bind(this);
  }
  handleError() {
    this.setState({ error: true });
  }
  render() {
    const { image, userId, index, likeHandler, openModal } = this.props;
    const { error } = this.state;
    const userLiked = image.likes.indexOf(userId) > -1;
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img
              src={error ? '/camera.png' : image.url} alt={image.description}
              onClick={() => openModal(image.url, image.description)} onError={this.handleError}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            {image.description}
          </div>
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
                disabled={userLiked} onClick={() => likeHandler(index, userId, image._id)}
                className={`button like is-primary is-pulled-right ${!userLiked && 'is-outlined'}`}
              >
                <span className="icon is-small">
                  <i className="fa fa-star-o" />
                </span>
                <span>{image.likes.length}</span>
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
  index: PropTypes.number,
  likeHandler: PropTypes.func,
  openModal: PropTypes.func
};

export default ImageCard;

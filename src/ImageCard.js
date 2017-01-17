import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ImageCard = ({ image, userId, index, likeHandler, openModal }) => {
  const userLiked = image.likes.indexOf(userId) > -1;
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={image.url} alt={image.description} onClick={() => openModal(image.url, image.description)} />
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
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  userId: PropTypes.string,
  index: PropTypes.number,
  likeHandler: PropTypes.func,
  openModal: PropTypes.func
};

export default ImageCard;

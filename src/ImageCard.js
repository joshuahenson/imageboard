import React, { PropTypes } from 'react';

const ImageCard = ({ image, userId }) => {
  const userLiked = image.likes.indexOf(userId) > -1;
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={image.url} alt={image.description} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {image.description}
        </div>
        <div className="media">
          <div className="media-left">
            <a href={`https://twitter.com/${image.user.userName}`} target="_blank" rel="noreferrer noopener">
              <figure>
                <img src={image.user.profilePhoto} alt={image.user.userName} height="35" width="35" />
              </figure>
            </a>
          </div>
          <div className="media-content">
            <button disabled={userLiked} className={`button is-primary is-pulled-right ${!userLiked && 'is-outlined'}`}>
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
  userId: PropTypes.string
};

export default ImageCard;

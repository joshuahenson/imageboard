import React, { PropTypes } from 'react';

const ImageCard = ({ image }) => {
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
            <figure>
              <img src={image.userId.profilePhoto} alt={image.userId.userName} height="35" width="35" />
            </figure>
          </div>
          <div className="media-content">
            <button className="button is-primary is-outlined is-pulled-right">
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
  image: PropTypes.object.isRequired
};

export default ImageCard;

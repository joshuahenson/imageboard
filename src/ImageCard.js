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
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired
};

export default ImageCard;

import React from 'react';

const ImageCard = ({ src }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={src} alt="pending" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          Lorem ipsum dolor sit amet
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

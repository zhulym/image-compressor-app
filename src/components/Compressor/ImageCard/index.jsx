// libraries
import React from 'react';
// static
// styles
import './ImageCard.css';

const ImageCard = (props) => {
  const width = 600;
  return (
    <div className="preview">
      <img src={props.srcData} id="preview__image" width={width} />
    </div>
  );
};

export default ImageCard;
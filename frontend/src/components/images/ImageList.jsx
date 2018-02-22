import React from 'react';
import PropTypes from 'prop-types';

const visualizeImage = (images) => images.map((image) => [
  (<dt>{image.name}</dt>),
  (<dd><span>{image.tag}</span><span>{image.iteration}</span>
    <img src={`${image.src}`} alt={`${image.name}`} /></dd>)
]);

const Images = (props) => {
  const { images } = props;
  return (
    <div>
      <dl>
        {visualizeImage(images)}
      </dl>
    </div>
  );
};

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.any,
    name: PropTypes.string,
    tag: PropTypes.string,
    iteration: PropTypes.number
  })).isRequired
};

Images.defaultProps = {
  images: []
};

export default Images;

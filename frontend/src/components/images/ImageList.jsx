import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';


const Images = (props) => {
  const { images } = props;

  const imageCols = (contents) => {
    const contentValues = Object.entries(contents);
    return contentValues.map(([name, src]) => (
      <Col>
        <div>{name}</div>
        <div>
          <img src={`${src}`} alt="view" style={{ maxWidth: 300 }} />
        </div>
      </Col>
    ));
  };

  const infoCols = (trainInfo) => {
    const trainInfoValues = Object.entries(trainInfo);
    return trainInfoValues.map(([k, v]) => (<li>{k}: {v}</li>));
  };

  const srcRowElems = images.map((image) => (
    <Row>
      {imageCols(image.contents)}
      <Col>
        <ul>
          {infoCols(image.train_info)}
        </ul>
      </Col>
    </Row>
  ));

  return (
    <Container>
      {srcRowElems}
    </Container>
  );
};

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    contents: PropTypes.objectOf(PropTypes.any),
    trainInfo: PropTypes.objectOf(PropTypes.any)
  })).isRequired
};

Images.defaultProps = {
  images: []
};

export default Images;

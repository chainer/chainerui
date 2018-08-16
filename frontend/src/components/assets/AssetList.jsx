import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';


const Assets = (props) => {
  const { assets } = props;

  const assetCols = (contents) => contents.map((content) => (
    <Col>
      <div>{content.tag}</div>
      <div>
        <img src={content.uri} alt="view" style={{ maxWidth: 300 }} />
      </div>
    </Col>
  ));

  const infoCols = (trainInfo) => {
    const trainInfoValues = Object.entries(trainInfo);
    return trainInfoValues.map(([k, v]) => (<li>{k}: {v}</li>));
  };

  const srcRowElems = assets.map((asset) => (
    <Row>
      {assetCols(asset.contents)}
      <Col>
        <ul>
          {infoCols(asset.train_info)}
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

Assets.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.shape({
    contents: PropTypes.objectOf(PropTypes.any),
    trainInfo: PropTypes.objectOf(PropTypes.any)
  })).isRequired
};

Assets.defaultProps = {
  assets: []
};

export default Assets;

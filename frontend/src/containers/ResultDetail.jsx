import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class ResultDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="result-detail">resultId: {this.props.resultId}</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const resultId = Number(ownProps.params.resultId);
  return { resultId };
};

ResultDetail.propTypes = {
  resultId: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
})(ResultDetail);


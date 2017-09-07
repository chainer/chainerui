import React from 'react';
import PropTypes from 'prop-types';
import { getLastLogDict } from '../../utils';


const ResultSummary = (props) => {
  const { result } = props;
  const lastLogDict = getLastLogDict(result);
  return (
    <div className="card">
      <div className="card-header">Summary</div>
      <div className="card-body">
        <dl className="row">
          <dt className="col-sm-3">id</dt>
          <dd className="col-sm-9">{result.id}</dd>

          <dt className="col-sm-3">name</dt>
          <dd className="col-sm-9">{result.name}</dd>

          <dt className="col-sm-3">path name</dt>
          <dd className="col-sm-9">{result.pathName}</dd>

          <dt className="col-sm-3">epoch</dt>
          <dd className="col-sm-9">{lastLogDict.epoch}</dd>

          <dt className="col-sm-3">iteration</dt>
          <dd className="col-sm-9">{lastLogDict.iteration}</dd>

          <dt className="col-sm-3">elapsed time</dt>
          <dd className="col-sm-9">{lastLogDict.elapsed_time}</dd>
        </dl>
      </div>
    </div>
  );
};

ResultSummary.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired
};

ResultSummary.defaultProps = {
};

export default ResultSummary;


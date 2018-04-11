import React from 'react';
import PropTypes from 'prop-types';
import { getLastLogDict } from '../../utils';
import { keyOptions } from '../../constants';


const ResultSummary = (props) => {
  const { result } = props;
  const lastLogDict = getLastLogDict(result);
  const logKeys = keyOptions.filter((key) => Object.keys(lastLogDict).indexOf(key) > -1);
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

          {logKeys.map((key) => (
            <React.Fragment key={`summary-${key}`}>
              <dt className="col-sm-3">{key.split('_').join(' ')}</dt>
              <dd className="col-sm-9">{lastLogDict[key]}</dd>
            </React.Fragment>
          ))}
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


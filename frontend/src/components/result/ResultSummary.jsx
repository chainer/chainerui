import React from 'react';

import * as uiPropTypes from '../../store/uiPropTypes';
import { getLastLogDict } from '../../utils';
import { keyOptions } from '../../constants';


const ResultSummary = (props) => {
  const { result } = props;
  const lastLogDict = getLastLogDict(result);
  const logKeys = keyOptions.filter((key) => key in lastLogDict);
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
              <dt className="col-sm-3">{key.replace(/_/g, ' ')}</dt>
              <dd className="col-sm-9">{lastLogDict[key]}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
};

ResultSummary.propTypes = {
  result: uiPropTypes.result.isRequired
};

ResultSummary.defaultProps = {
};

export default ResultSummary;


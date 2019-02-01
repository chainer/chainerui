import React from 'react';

import * as uiPropTypes from '../../store/uiPropTypes';
import { argValue2string } from '../../utils';


const createDescriptionElems = (args) => args.map((arg) => [
  (<dt className="col-sm-3" key={`${arg.key}-dt`}>{`(${arg.key})`}</dt>),
  (<dd className="col-sm-9" key={`${arg.key}-dd`}>{argValue2string(arg.value)}</dd>),
]);

const Args = (props) => {
  const { args } = props;
  return (
    <div className="card">
      <div className="card-header">Args</div>
      <div className="card-body">
        <dl className="row">
          {createDescriptionElems(args)}
        </dl>
      </div>
    </div>
  );
};

Args.propTypes = {
  args: uiPropTypes.args.isRequired,
};

export default Args;

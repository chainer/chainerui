import React from 'react';

export const CommandStatus = {
  REQUEST_OPEN: 'OPEN',
  RESPONSE_SUCCESS: 'SUCCESS',
  RESPONSE_FAILURE: 'FAILURE'
};

export const responseStatusToIcon = (status) => {
  switch (status) {
    case CommandStatus.RESPONSE_SUCCESS:
      return (<span className="oi oi-check text-success" />);
    case CommandStatus.RESPONSE_FAILURE:
      return (<span className="oi oi-x text-danger" />);
    default:
      return (<span className="oi oi-ellipses text-muted" />);
  }
};

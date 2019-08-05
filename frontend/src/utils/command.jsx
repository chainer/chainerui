import React from 'react';

export const CommandStatus = {
  REQUEST_OPEN: 'OPEN',
  RESPONSE_SUCCESS: 'SUCCESS',
  RESPONSE_FAILURE: 'FAILURE',
};

export const responseStatusToIcon = (status) => {
  switch (status) {
    case CommandStatus.RESPONSE_SUCCESS:
      return <i className="fas fa-check text-success" />;
    case CommandStatus.RESPONSE_FAILURE:
      return <i className="fas fa-times text-danger" />;
    default:
      return <i className="fas fa-ellipsis-h text-muted" />;
  }
};

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'recharts';


const LogVisualizerTooltip = (props) => {
  console.log(props);
  const payload = props.payload.slice(0, 8);
  return (
    <Tooltip {...{ ...props, content: null, payload }} />
  );
};

export default LogVisualizerTooltip;


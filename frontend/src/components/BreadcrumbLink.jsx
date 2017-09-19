import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


const BreadcrumbLink = (props) => {
  const { projectId, resultId } = props;
  const items = [(<BreadcrumbItem><IndexLink to="/">Home</IndexLink></BreadcrumbItem>)];
  return (
    <Breadcrumb className="px-2 py-1">
      {items}
    </Breadcrumb>
  );
};

BreadcrumbLink.propTypes = {
  projectId: PropTypes.number,
  resultId: PropTypes.number
};

BreadcrumbLink.defaultProps = {
  projectId: undefined,
  resultId: undefined
};

export default BreadcrumbLink;


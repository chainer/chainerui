import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { displayName, urlForPlot, urlForResultDetail } from '../utils';


const BreadcrumbLink = (props) => {
  const { length, project, result } = props;
  const items = [(
    <BreadcrumbItem key="home">
      <IndexLink to="/">Home</IndexLink>
    </BreadcrumbItem>
  )];

  if (length >= 2) {
    items.push(
      <BreadcrumbItem key="plot">
        <Link to={urlForPlot(project.id)}>
          {project.name}
        </Link>
      </BreadcrumbItem>
    );
  }
  if (length >= 3) {
    items.push(
      <BreadcrumbItem key="resultDetail">
        <Link to={urlForResultDetail(project.id, result.id)}>
          {displayName(result)}
        </Link>
      </BreadcrumbItem>
    );
  }

  return (
    <Breadcrumb className="p-0">
      {items}
    </Breadcrumb>
  );
};

BreadcrumbLink.propTypes = {
  length: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  result: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  })
};

BreadcrumbLink.defaultProps = {
  project: {},
  result: {}
};

export default BreadcrumbLink;


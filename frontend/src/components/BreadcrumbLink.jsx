import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import TruncatedResultName from './TruncatedResultName';
import {
  displayProjectName,
  urlForPlot,
  urlForResultDetail
} from '../utils';


const BreadcrumbLink = (props) => {
  const { length, globalConfig, project, result } = props;
  const { isResultNameAlignRight } = globalConfig;
  const items = [(
    <BreadcrumbItem key="home">
      <IndexLink to="/">Home</IndexLink>
    </BreadcrumbItem>
  )];

  if (length >= 2) {
    items.push(
      <BreadcrumbItem key="plot">
        <Link to={urlForPlot(project.id)}>
          {displayProjectName(project)}
        </Link>
      </BreadcrumbItem>
    );
  }
  if (length >= 3) {
    items.push(
      <BreadcrumbItem key="resultDetail">
        <Link to={urlForResultDetail(project.id, result.id)}>
          <TruncatedResultName
            project={project}
            result={result}
            isResultNameAlignRight={isResultNameAlignRight}
            style={{ display: 'inline-block', width: '10em' }}
          />
        </Link>
      </BreadcrumbItem>
    );
  }

  return (
    <Breadcrumb className="breadcrumb-link p-0">
      {items}
    </Breadcrumb>
  );
};

BreadcrumbLink.propTypes = {
  length: PropTypes.number.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  project: uiPropTypes.project,
  result: uiPropTypes.result
};

BreadcrumbLink.defaultProps = {
  project: {},
  result: {}
};

export default BreadcrumbLink;


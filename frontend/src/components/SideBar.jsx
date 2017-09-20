import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap';
import AxesConfigurator from './AxesConfigurator';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleConfigReset = this.handleConfigReset.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalToggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleConfigReset() {
    const { projectId, onConfigReset } = this.props;
    this.handleModalToggle();
    onConfigReset(projectId);
  }

  render() {
    const {
      projectId,
      results,
      stats,
      config,
      onAxisConfigLineUpdate,
      onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate,
      onAxisConfigLogKeySelectToggle
    } = this.props;
    return (
      <div className="side-bar">
        <AxesConfigurator
          {
          ...{
            projectId,
            results,
            stats,
            config,
            onAxisConfigLineUpdate,
            onAxisConfigScaleUpdate,
            onAxisConfigXKeyUpdate,
            onAxisConfigScaleRangeTypeUpdate,
            onAxisConfigScaleRangeNumberUpdate,
            onAxisConfigLogKeySelectToggle
          }
          }
        />
        <Button color="primary" className="m-2" onClick={this.handleModalToggle}>
        Reset settings
        </Button>
        <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
          <ModalHeader toggle={this.handleModalToggle}>Reset settings</ModalHeader>
          <ModalBody>
            Are you sure to reset settings?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalToggle}>Cancel</Button>
            <Button color="primary" className="mx-2" onClick={this.handleConfigReset}>Reset</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

SideBar.propTypes = {
  projectId: PropTypes.number.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired,
  onConfigReset: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

SideBar.defaultProps = {
};

export default SideBar;


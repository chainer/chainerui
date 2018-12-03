import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from 'reactstrap';

import Check from './FormControl/Check';

class TableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalShow() {
    this.setState({
      showModal: true
    });
  }

  handleModalHide() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const { columnHeaders } = this.props;

    console.log({ columnHeaders });

    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>

        <Modal isOpen={this.state.showModal} toggle={this.handleModalHide}>
          <ModalHeader>
            Edit table columns visibility
          </ModalHeader>
          <ModalBody>
            <Form>
              {
                columnHeaders.map((ch) => (
                  <div key={ch.Header}>
                    <legend>{ ch.Header }</legend>
                    {
                      ch.columns.map((sch) => (
                        <Check
                          key={`${ch.Header}.${sch}`}
                          type="checkbox"
                          name={sch.Header}
                        >{sch}</Check>
                      ))
                    }
                  </div>
                ))
              }
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalHide}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

TableConfigurator.propTypes = {
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      columns: PropTypes.array.isRequired
    })
  ).isRequired
};

export default TableConfigurator;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';

import Check from './FormControl/Check';

class TableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      showModal: false,
    };
  }

  handleModalShow() {
    this.setState({
      showModal: true,
    });
  }

  handleModalHide() {
    this.setState({
      showModal: false,
    });
  }

  handleChange(prefix, event) {
    const { columnHeaders, hiddenKeysForEveryHeader } = this.props;
    const primaryHiddenKeys = hiddenKeysForEveryHeader[0] || [];
    const secondaryHiddenKeys = hiddenKeysForEveryHeader[1] || [];

    if (prefix === columnHeaders[0].Header) {
      const nextHiddenPrimaryKeys = !event.target.checked
        ? primaryHiddenKeys.concat(event.target.name)
        : primaryHiddenKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(nextHiddenPrimaryKeys, secondaryHiddenKeys);
    } else {
      const nextHiddenSecondaryKeys = !event.target.checked
        ? secondaryHiddenKeys.concat(event.target.name)
        : secondaryHiddenKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(primaryHiddenKeys, nextHiddenSecondaryKeys);
    }
  }

  render() {
    const { columnHeaders, hiddenKeysForEveryHeader } = this.props;
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
                columnHeaders.map((ch, idx) => (
                  <div key={ch.Header}>
                    <legend>{ ch.Header }</legend>
                    {
                      ch.columns.map((sch) => (
                        <Check
                          key={`${ch.Header}.${sch}`}
                          type="checkbox"
                          name={sch}
                          checked={
                            (hiddenKeysForEveryHeader[idx] === undefined)
                              ? true
                              : (!hiddenKeysForEveryHeader[idx].find((vk) => vk === sch))
                          }
                          onChange={(e) => this.handleChange(ch.Header, e)}
                        >
                          {sch}
                        </Check>
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
  columnHeaders: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
  })).isRequired,
  hiddenKeysForEveryHeader: PropTypes.arrayOf(
    PropTypes.array.isRequired,
    PropTypes.array.isRequired
  ).isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

export default TableConfigurator;

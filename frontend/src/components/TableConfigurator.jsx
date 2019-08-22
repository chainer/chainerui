import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import Check from './FormControl/Check';
import { sortKeys, arrayMove } from '../utils';

const DragHandle = sortableHandle(() => <i className="form-check-input fas fa-bars" />);

const SortableItem = sortableElement(({ children }) => (
  <div className="form-check" style={{ backgroundColor: '#fff' }}>
    <DragHandle />
    {children}
  </div>
));

const SortableContainer = sortableContainer(({ children }) => <div>{children}</div>);

class TableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
    this.bindModalNode = this.bindModalNode.bind(this);

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
    const { columnHeaders, keyConfigs } = this.props;
    const primaryKnownKeysConfig = keyConfigs[0] || [];
    const secondaryKnownKeysConfig = keyConfigs[1] || [];

    if (prefix === columnHeaders[0].Header) {
      const nextPrimary = {
        ...primaryKnownKeysConfig,
        [event.target.name]: {
          ...primaryKnownKeysConfig[event.target.name],
          hidden: !event.target.checked,
        },
      };

      this.props.onTableColumnsVisibilityUpdate(nextPrimary, secondaryKnownKeysConfig);
    } else {
      const nextSecondary = {
        ...secondaryKnownKeysConfig,
        [event.target.name]: {
          ...secondaryKnownKeysConfig[event.target.name],
          hidden: !event.target.checked,
        },
      };

      this.props.onTableColumnsVisibilityUpdate(primaryKnownKeysConfig, nextSecondary);
    }
  }

  handleSortEnd(prefix, { oldIndex, newIndex }) {
    const { columnHeaders, keyConfigs } = this.props;
    const primaryKnownKeysConfig = keyConfigs[0] || [];
    const secondaryKnownKeysConfig = keyConfigs[1] || [];

    if (prefix === columnHeaders[0].Header) {
      const nextPrimary = {};
      arrayMove(
        sortKeys(columnHeaders[0].columns, primaryKnownKeysConfig),
        oldIndex,
        newIndex
      ).forEach((name, index) => {
        nextPrimary[name] = {
          hidden: false,
          ...primaryKnownKeysConfig[name],
          order: index + 1,
        };
      });

      this.props.onTableColumnsVisibilityUpdate(nextPrimary, secondaryKnownKeysConfig);
    } else {
      const nextSecondary = {};
      arrayMove(
        sortKeys(columnHeaders[1].columns, secondaryKnownKeysConfig),
        oldIndex,
        newIndex
      ).forEach((name, index) => {
        nextSecondary[name] = {
          hidden: false,
          ...secondaryKnownKeysConfig[name],
          order: index + 1,
        };
      });

      this.props.onTableColumnsVisibilityUpdate(primaryKnownKeysConfig, nextSecondary);
    }
  }

  bindModalNode(node) {
    this.modalNode = node;
  }

  render() {
    const { columnHeaders, keyConfigs } = this.props;
    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>

        <Modal
          isOpen={this.state.showModal}
          innerRef={this.bindModalNode}
          toggle={this.handleModalHide}
        >
          <ModalHeader>Edit table columns visibility</ModalHeader>
          <ModalBody>
            <Form>
              {columnHeaders.map((ch, idx) => (
                <div key={ch.Header}>
                  <legend>{ch.Header}</legend>
                  <SortableContainer
                    lockAxis="y"
                    helperContainer={() => this.modalNode}
                    onSortEnd={(...args) => this.handleSortEnd(ch.Header, ...args)}
                    useDragHandle
                  >
                    {sortKeys(ch.columns, keyConfigs[idx]).map((l, i) => (
                      <SortableItem
                        key={`logKey.${l}`}
                        index={i}
                        helperContainer={() => this.modalNode}
                      >
                        <Check
                          type="checkbox"
                          name={l}
                          checked={!(keyConfigs[idx][l] || {}).hidden}
                          onChange={(e) => this.handleChange(ch.Header, e)}
                        >
                          {l}
                        </Check>
                      </SortableItem>
                    ))}
                  </SortableContainer>
                </div>
              ))}
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalHide}>
              Close
            </Button>
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
      columns: PropTypes.array.isRequired,
    })
  ).isRequired,
  keyConfigs: PropTypes.arrayOf(PropTypes.object.isRequired, PropTypes.object.isRequired)
    .isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

export default TableConfigurator;

import React from 'react';
import PropTypes from 'prop-types';


class AxisConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeAxisKey = this.handleChangeAxisKey.bind(this);

    this.state = {};
  }

  handleChangeAxisKey(e) {
    const { axisName, onChangeAxisKey } = this.props;
    onChangeAxisKey(axisName, e.target.value);
  }

  render() {
    const { title, axisKey, axisKeys } = this.props;

    let options = [(<option disabled value="" key=""> -- select a key -- </option>)];
    options = options.concat(axisKeys.map((key) => (<option value={key} key={key}>{key}</option>)));
    return (
      <div className="axis-key-selector">
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="axis-key-selector-select">{title}</label>
            <select id="axis-key-selector-select" className="form-control" value={axisKey} onChange={this.handleChangeAxisKey}>
              {options}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

AxisConfigurator.propTypes = {
  axisName: PropTypes.string.isRequired,
  title: PropTypes.string,
  axisKey: PropTypes.string,
  axisKeys: PropTypes.arrayOf(PropTypes.string),
  onChangeAxisKey: PropTypes.func
};
AxisConfigurator.defaultProps = {
  title: '',
  axisKey: '',
  axisKeys: [],
  onChangeAxisKey: () => {}
};

export default AxisConfigurator;


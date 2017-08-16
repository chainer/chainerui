import React from 'react';
import PropTypes from 'prop-types';


class AxisConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeAxisKey = this.handleChangeAxisKey.bind(this);
    this.handleChangeScale = this.handleChangeScale.bind(this);

    this.state = {};
  }

  handleChangeAxisKey(e) {
    const { axisName, onChangeAxisKey } = this.props;
    onChangeAxisKey(axisName, e.target.value);
  }

  handleChangeScale(e) {
    const { axisName, onChangeScale } = this.props;
    onChangeScale(axisName, e.target.value);
  }

  render() {
    const { axisName, axisKey, axisKeys, scale } = this.props;

    let options = [(<option disabled value="" key=""> -- select a key -- </option>)];
    options = options.concat(axisKeys.map((key) => (<option value={key} key={key}>{key}</option>)));
    return (
      <div className="axis-configurator panel panel-default">
        <div className="panel-heading">{axisName}</div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="axis-configurator-key" className="control-label">key</label>
              <select id="axis-configurator-key" className="form-control" value={axisKey} onChange={this.handleChangeAxisKey}>
                {options}
              </select>
            </div>
            <div className="form-group">
              <label className="control-label">scale</label>
              <div>
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="axis-configurator-scale-auto"
                    id="axis-configurator-scale-auto"
                    value="auto"
                    checked={scale === 'auto'}
                    onChange={this.handleChangeScale}
                  />auto
                </label>
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="axis-configurator-scale-log"
                    id="axis-configurator-scale-log"
                    value="log"
                    checked={scale === 'log'}
                    onChange={this.handleChangeScale}
                  />log
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AxisConfigurator.propTypes = {
  axisName: PropTypes.string.isRequired,
  axisKey: PropTypes.string,
  axisKeys: PropTypes.arrayOf(PropTypes.string),
  scale: PropTypes.string,
  onChangeAxisKey: PropTypes.func,
  onChangeScale: PropTypes.func
};
AxisConfigurator.defaultProps = {
  axisKey: '',
  axisKeys: [],
  scale: 'auto',
  onChangeAxisKey: () => {},
  onChangeScale: () => {}
};

export default AxisConfigurator;


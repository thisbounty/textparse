import React from 'react';
import WpConvertInput from '../WpConvert-input/index';

require('./index.css');

export default class WpConvert extends React.Component {
  constructor() {
    super();
    this.state = {
      input: 'test',
    };
  }
  render() {
    return (
      <div id="WpConvert" className="WpConvert">{this.renderInput(this.state.input)}</div>
    );
  }
  renderInput(p) {
    return <WpConvertInput text={p} onChange={() => this.handleChange()} />;
  }
  handleChange() {
    this.setState({ input: 'input' });
  }
}

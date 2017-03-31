import React from 'react';
import WpConvertInput from '../WpConvert-input/index';
import WpConvertOutput from '../WpConvert-output/index';

require('./index.css');

export default class WpConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'test',
      outpt: 'test',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div id="WpConvert" className="WpConvert">
        {this.renderInput(this.state.input)}
        {WpConvert.renderOutput(this.state.output)}
      </div>
    );
  }
  renderInput(p) {
    return <WpConvertInput text={p} onChange={ this.handleChange } />;
  }

  static renderOutput(p) {
    return <WpConvertOutput text={p} />;
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
    const markup = WpConvert.clean(event.target.value);
    this.setState({ output: markup });
  }

  static clean(text) {
    return text.replace('\n\n\n', '\n\n');
  }
}

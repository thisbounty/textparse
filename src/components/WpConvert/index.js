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
    const text = event.target.value;
    this.setState({ input: text });
    this.setState({ output: WpConvert.format(WpConvert.clean(text)) });
  }

  static clean(text) {
    return text.replace('\n\n\n', '\n\n');
  }

  static format(text) {
    let firstPageFlag = false;
    let counter = 0;
    text.split('\n').forEach((line) => {
      if (!firstPageFlag) {
        firstPageFlag = true;
      }
      console.log(`${line} ${counter}`);
      counter += 1;
    });
  }
}

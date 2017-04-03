import React from 'react';
import WpConvertInput from '../WpConvert-input/index';
import WpConvertOutput from '../WpConvert-output/index';

require('./index.css');

export default class WpConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      outpt: '',
    };

    this.lineLoopData = {};
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
    this.setState({ output: this.formatText(WpConvert.clean(text)) });
  }

  static clean(text) {
    return text.replace('\n\n\n', '\n\n').replace('\n\n', '\n');
  }

  formatText(text) {
    this.clearLineLoopData();
    text.split('\n').forEach((line) => { this.formatLine(line); });
    return this.lineLoopData.formattedText;
  }

  clearLineLoopData() {
    this.lineLoopData = {
      firstPageFlag: true,
      counter: 0,
      formattedText: '',
    };
  }

  formatLine(line) {
    if (!WpConvert.validateLine(line)) {
      return;
    }
    this.topShortCodes();
    this.addPageBreak(line);
    this.lineLoopData.counter += 1;
    this.lineLoopData.formattedText += `${line}\n\n`;
  }

  static validateLine(line) {
    return (line.trim().length > 0);
  }

  topShortCodes() {
    if (this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 0) {
      this.lineLoopData.formattedText += '[sc name="direct_default_top_ad" ]\n[sc name="default_top_ad" ]\n\n';
    } else if (!this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 0) {
      this.lineLoopData.formattedText += '[sc name="default_top_ad" ]\n\n';
    }
  }

  addPageBreak() {
    if (this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 2) {
      this.lineLoopData.firstPageFlag = false;
      this.lineLoopData.formattedText += '<!--next page-->\n';
      this.lineLoopData.counter = 0;
    } else if (!this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 1) {
      this.lineLoopData.formattedText += '<!--next page-->\n';
      this.lineLoopData.counter = 0;
    }
  }
}

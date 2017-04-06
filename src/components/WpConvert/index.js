import React from 'react';
import WpConvertInput from '../WpConvert-input/index';
import WpConvertOutput from '../WpConvert-output/index';

import styles from './index.css';

export default class WpConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      outpt: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div id="WpConvert" className={styles.WpConvert}>
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
    this.setState({ output: WpConvert.parse(text) });
  }

  static parse(text) {
    return WpConvert.insertPageBreaks(WpConvert.formatTitles(text));
  }

  static insertPageBreaks(text) {
    // matches text with characters of 70 or more, and ending with a pagebreak
    return text.replace(/.{104,}\n/g, match => `${match}\n<!--next page-->\n`);
  }

  static formatTitles(text) {
    return text.replace(/^.{3,70}$/gm, match => `[post_page_title]${match}[/post_page_title]`);
  }
}

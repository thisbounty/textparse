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
    const _ = WpConvert;
    return _.insertArticleShortcodes(_.insertLowerPageShortcodes((_.insertPageBreaks(_.formatTitles(_.insertTopPageShortcodes(text))))));
  }

  static insertTopPageShortcodes(text) {
    // match titles with 3 to 70 characters
    // 3 characters to avoid matching carriage returns
    // 70 as this will be run before format titles
    return text.replace(/^.{3,70}$/gm, match => `[sc name="default_top_ad"]\n\n${match}\n`);
  }

  static formatTitles(text) {
    // match lines with 3 to 70 characters, for titles, multiline to get them all
    // 3 characters to avoid matching carriage returns
    // skip fields that have shortcodes already with [^\]]
    // dot selector brings in carriage return, need to exclude with [^\n], added to closing bracket
    return text.replace(/^[^\[\n].{3,70}$/gm, (match) => `[post_page_title]${match.replace('','')}[/post_page_title]` );
  }

  static insertPageBreaks(text) {
    // match text with characters of 104 or more, and ending with a \n
    // 70 character min, with two title tags of 17 characters each
    // \n in regex so last page has no pagebreak
    return text.replace(/.{104,}\n/g, match => `${match}\n<!--next page-->\n`);
  }

  static insertArticleShortcodes(text) {
    return `[sc name="direct_default_top_ad"]\n${text}\n[sc name="direct_default_lower_ad"]`;
  }

  static insertLowerPageShortcodes(text) {
    // match text with more than 104 characters
    return text.replace(/^.{104,}$/gm, match => `${match}\n\n[sc name="default_lower_ad"]`);
  }
}

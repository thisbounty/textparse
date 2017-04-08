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
    this.setState({ output: WpConvert.parse(text) });
  }

  static parse(text) {
    const _ = WpConvert;
    return _.insertArticleShortcodes(_.formatTitles(_.insertTopPageShortcodes(_.insertPageBreaks(_.insertLowerPageShortcodes(text)))));
  }

  static insertTopPageShortcodes(text) {
    // match titles with 3 to 70 characters
    // 3 characters to avoid matching carriage returns
    // 70 as this will be run before format titles
    return text.replace(/^[^\[<!--].{3,70}$/gm, match => `[sc name="default_top_ad"]\n${match}`);
  }

  static insertLowerPageShortcodes(text) {
    // match titles, allows for pages with varying paragraph counts
    // match a leading carriage return to prevent adding a lower title at the start of the article
    // no leading carrot allows for single or double space before title
    text = text.replace(/\n^[^\[].{3,70}$/gm, match => `\n[sc name="default_lower_ad"]${match}`);
    return `${text}\n[sc name="default_lower_ad"]`;
  }

  static insertPageBreaks(text) {
    // find titles and add pagebreak before. Helps with pages of varying paragraph count
    // match a leading \n to prevent adding a pagebreak at the top of the article
    // no leading carrot allows for single or double space before title
    // complicated regex, see https://regex101.com/r/M2pXOL/1
    // goal of the regex is to look for titles and add a pagebreak on the line before it
    // first \n is to prevent a page break at the top of the first page
    // exclude in brackets [] prevents other shortcodes => \[ from being treated as a title
    // exclude \n prevents extra shortcodes from being entered as spaces
    return text.replace(/\n^[^\[].{3,70}$/gm, match => `\n<!--next page-->\n${match}`);
  }

  static formatTitles(text) {
    // match lines with 3 to 70 characters, for titles, multiline to get them all
    // 3 characters to avoid matching carriage returns
    // skip fields that have shortcodes already with [^\]]
    // dot selector brings in carriage return to match, need to exclude with [^\n], added to closing bracket
    return text.replace(/^[^\[\n\<!].{3,70}$/gm, (match) => `[post_page_title]${match.replace('','')}[/post_page_title]` );
  }

  static insertArticleShortcodes(text) {
    // need shortcodes at the top and bottom of the entire article, simple concat
    return `[sc name="direct_default_top_ad"]\n${text}\n[sc name="direct_default_lower_ad"]`;
  }
}

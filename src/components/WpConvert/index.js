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
    this.setState({ output: WpConvert.parse(text) });
  }

  static parse(text) {
    return WpConvert.topArticle(
       bottomArticle(
         topPage(
           bottomPage(
             images(
               titles(
                pageBreaks(text)
              )
            )
          )
        )
      )
    );
  }

  static pageBreaks(text) {
    //matches text with characters of 70 or more, and ending with a pagebreak
    return text.replace(/.{70,}\n$/,function(match){
      return match
    })
  }

  static clean(text) {
    return text.replace('\n\n\n', '\n\n').replace('\n\n', '\n');
  }

  formatText(text) {
    this.clearLineLoopData();
    text.split('\n').forEach((line) => { this.formatLine(line); });
    this.afterArticle();
    return this.lineLoopData.formattedText;
  }

  clearLineLoopData() {
    this.lineLoopData = {
      firstPageFlag: true,
      titlePrintedFlag: false,
      counter: 0,
      lineInProcess: '',
      formattedText: '',
    };
  }

  formatLine(line) {
    this.lineLoopData.lineInProcess = line;
    if (!this.validateLine()) {
      return;
    }
    this.addPageBreak();
    this.topShortCodes();
    this.formatTitle();
    this.lineLoopData.counter += 1;
    this.lineLoopData.formattedText += `${this.lineLoopData.lineInProcess}\n\n`;
  }

  validateLine() {
    return (this.lineLoopData.lineInProcess.trim().length > 0);
  }

  topShortCodes() {
    if (this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 0) {
      this.lineLoopData.formattedText += '[sc name="direct_default_top_ad" ]\n[sc name="default_top_ad" ]\n\n';
    } else if (!this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 0) {
      this.lineLoopData.formattedText += '[sc name="default_top_ad" ]\n\n';
    }
  }

  formatTitle() {
    if (!this.lineLoopData.titlePrintedFlag && this.lineLoopData.lineInProcess.length < 70) {
      // titles occur on inner pages only
      // 30 character limit is a magic number, used to exclude paragraphs
      this.lineLoopData.lineInProcess = `[post_page_title]${this.lineLoopData.lineInProcess}[/post_page_title]`;
      this.lineLoopData.titlePrintedFlag = true;
    }
  }

  addPageBreak() {
    if (this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 2) {
      // first page has an intro of 2 paragraphs and title
      this.lineLoopData.firstPageFlag = false;
      this.beforeFirstPagination();
      this.lineLoopData.formattedText += '<!--next page-->\n';
      this.lineLoopData.counter = 0;
      this.lineLoopData.titlePrintedFlag = false;
    } else if (!this.lineLoopData.firstPageFlag && this.lineLoopData.counter === 2) {
      // inner pages only have 1 paragraph
      this.beforeInnerPagination();
      this.lineLoopData.formattedText += '<!--next page-->\n';
      this.lineLoopData.counter = 0;
      this.lineLoopData.titlePrintedFlag = false;
    }
  }
  beforeFirstPagination() {
    this.lineLoopData.formattedText += '\n[sc name=\'default_lower_ad\']\n';
  }
  beforeInnerPagination() {
    this.lineLoopData.formattedText += '\n[sc name=\'default_lower_ad\']\n';
  }
  afterArticle() {
    this.beforeInnerPagination();
    this.lineLoopData.formattedText += '[sc name="direct_default_lower_ad" ]\n';
  }
}

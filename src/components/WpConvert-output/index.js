import React from 'react';

require('./index.css');

export default class WpConvertOutput extends React.Component {
  render() {
    return (
      <div id="WpConvert-output" className="WpConvert-output">
        <label className="WpConvert-output-label">Output</label>
        <textarea id="WpConvert-output-textArea" className="WpConvert-output-textArea" value={this.props.text}></textarea>
      </div>
    );
  }
}


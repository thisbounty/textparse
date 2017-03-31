import React from 'react';

require('./index.css');

export default class WpConvertInput extends React.Component {
  render() {
    return (
      <div id="WpConvert-input" className="WpConvert-input">
        <label className="WpConvert-input-label">Input</label>
        <textarea id="WpConvert-input-textArea" className="WpConvert-input-textArea" onChange={this.props.onChange} value={this.props.text}></textarea>
      </div>
    );
  }
}


import React from 'react';

require('./index.css');

export default class WpConvertImage extends React.Component {
  render() {
    return (
      <div id="WpConvert-image" className="WpConvert-image">
        <label className="WpConvert-image-label">Images</label>
        <input id="WpConvert-image-textArea" className="WpConvert-image-textArea" onChange={this.props.onChange} value={this.props.text}></input>
      </div>
    );
  }
}


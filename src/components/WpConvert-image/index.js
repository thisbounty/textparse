import React from 'react';

require('./index.css');

export default class WpConvertImage extends React.Component {
  render() {
    return (
      <div id="WpConvert-image" className="WpConvert-image">
        <label className="WpConvert-image-label">Images</label>
        <input id="WpConvert-image-input" className="WpConvert-image-input" value={this.props.text} />
      </div>
    );
  }
}


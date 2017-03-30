import React from 'react';
import { render } from 'react-dom';

require('./index.css');

class Input extends React.Component {
  render() {
    return (
      <div id="Input" className="Input">
        <label className="Input-textAreaLabel">Input</label>
        <textarea id="Input-textArea" className="Input-textArea"></textarea>
      </div>
    );
  }
}

if (typeof document === 'object') {
  render(<Input />, document.getElementById('root'));
}

module.exports = Input;

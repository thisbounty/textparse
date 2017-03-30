import React from 'react';
import { render } from 'react-dom';
import ssr from './utilities/ssr/index';
import WpConvert from './components/WpConvert/index';

if (typeof document === 'object') {
  render(<WpConvert />, document.getElementById('root'));
}

export default ssr;

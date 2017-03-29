import React from 'react';
import { render } from 'react-dom';
import ssr from './utilities/ssr/index';

if (typeof document === 'object') {
  render(<h1>Hello world 7!</h1>, document.getElementById('root'));
}

ssr.transforms.push(ssr.insertBefore(<h1>Hello 2</h1>, '#root'));

export default ssr;

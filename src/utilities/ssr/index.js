import { renderToString } from 'react-dom/server';

const ssr = {
  transforms: [],
  insertBefore(jsx, selector) {
    return function transform(window) {
      // react render component
      const html = renderToString(jsx);
      // create dom node
      const template = window.document.createElement('template');
      template.innerHTML = html;
      const node = template.content.firstChild;
      // select target node to insert before
      const target = window.document.querySelector(selector);
      // transform dom
      target.parentNode.insertBefore(node, target);
      return window;
    };
  },
};

export default ssr;

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';
import WpConvert from '../src/components/WpConvert/index';

const dummy = {
  title: 'My Test Title',
  paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat dolor in libero gravida posuere. Phasellus vel quam consequat, vehicula lorem a, tristique nibh. Nam ac orci id enim eleifend eleifend ut sed nibh. In et tortor vitae mauris porttitor pharetra.',
  newLine:"\n\n",
}

const shortcodes = {
  pageBreak: '<!--next page-->',
}

let wp = TestUtils.renderIntoDocument(<WpConvert />);
wp.setState({'input':`${dummy.title}${dummy.newLine}${dummy.paragraph}${dummy.newLine}${dummy.title}${dummy.newLine}${dummy.paragraph}`});

describe('WpConvert.pageBreaks', () => {
  it('should insert one page break between two pages', () => {
  const parsed = WpConvert.pageBreaks(wp.state.input);
  assert.notEqual(parsed, wp.state.input);
  const regex = new RegExp(shortcodes.pageBreak,"g");
  assert.equal((parsed.match(regex)||[]).length, 1);
  });
});

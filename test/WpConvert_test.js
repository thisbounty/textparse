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
  title: 'post_page_title',
  topPage: 'sc name="direct_default_top_ad"',
  bottomPage: 'sc name="direct_default_lower_ad',
};

let wp = TestUtils.renderIntoDocument(<WpConvert />);
wp.setState({'input':`${dummy.title}${dummy.newLine}${dummy.paragraph}${dummy.newLine}${dummy.title}${dummy.newLine}${dummy.paragraph}`});

describe('WpConvert.insertPageBreaks', () => {
  it('should insert one page break between two pages', () => {
    const pageBreaks = WpConvert.insertPageBreaks(wp.state.input);
    assert.notEqual(pageBreaks, wp.state.input);
    const regex = new RegExp(shortcodes.pageBreak,"g");
    assert.equal((pageBreaks.match(regex)||[]).length, 1);
  });
});

describe('WpConvert.formatTitles', () => {
  it('should add title shortcodes around lines that have less than 70 characters', () => {
    const titles = WpConvert.formatTitles(wp.state.input);
    assert.notEqual(titles, wp.state.input);
    // with simple regex, count will be: 2 shortcodes, for opening and closing * 2 titles in dummy input, so 4
    // try this if more specific matching required: `\[${shortcodes.title}\].{0,70}\[\/${shortcode.title}\]`
    const regex = new RegExp(shortcodes.title,"g");
    assert.equal((titles.match(regex)||[]).length, 4);
  });
});

describe('WpConvert.pageShortcodes', () => {
  it('should insert page shortcodes at the top and bottom of the page', () => {
    const pageShortcodes = WpConvert.insertPageShortcodes(wp.state.input);
    assert.equal(pageShortcodes, `${shortcodes.topPage}\n${wp.state.input}\n${shortcodes.bottomPage}`);
  });
});

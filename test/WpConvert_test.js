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
  topArticle: 'sc name="direct_default_top_ad"',
  lowerArticle: 'sc name="direct_default_lower_ad"',
  topPage:'sc name="default_top_ad"',
  lowerPage:'sc name="default_lower_ad"'
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
  it('should add two title shortcodes around two lines that have less than 70 characters', () => {
    const titles = WpConvert.formatTitles(wp.state.input);
    assert.notEqual(titles, wp.state.input);
    // with simple regex, count will be: 2 shortcodes, for opening and closing * 2 titles in dummy input, so 4
    // try this if more specific matching required: `\[${shortcodes.title}\].{0,70}\[\/${shortcode.title}\]`
    const regex = new RegExp(shortcodes.title,"g");
    assert.equal((titles.match(regex)||[]).length, 4);
  });
});

describe('WpConvert.articleShortcodes', () => {
  it('should insert one top and one lower article shortcodes at the top and bottom of the article', () => {
    const article = WpConvert.insertArticleShortcodes(wp.state.input);
    assert.equal(article, `[${shortcodes.topArticle}]\n${wp.state.input}\n[${shortcodes.lowerArticle}]`);
  });
});

describe('WpConvert.lowerPageShortcodes', () => {
  it('should insert two lower page shortcodes', () => {
    const page = WpConvert.insertLowerPageShortcodes(wp.state.input);
    assert.notEqual(page, wp.state.input);
    // try this regex if more specific matching required: `^.{104,}\n\[${shortcodes.lowerPage}\]$`
    // also try to assign to a variable first, and then put to regex, to rule out template interfering with parsing, like $ symbols
    const regex = new RegExp(shortcodes.lowerPage,"gm");
    assert.equal((page.match(regex)||[]).length, 2);
  });
});

describe('WpConvert.topPageShortcodes', () => {
  it('should insert two top page shortcodes', () => {
    const page = WpConvert.insertTopPageShortcodes(wp.state.input);
    assert.notEqual(page, wp.state.input);
    // try this regex if more specific matching required: `^.{104,}\n\[${shortcodes.lowerPage}\]$`
    // also try to assign to a variable first, and then put to regex, to rule out template interfering with parsing, like $ symbols
    const regex = new RegExp(shortcodes.topPage,"gm");
    assert.equal((page.match(regex)||[]).length, 2);
  });
});

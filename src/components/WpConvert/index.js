import React from 'react';
import WpConvertInput from '../WpConvert-input/index';
import WpConvertOutput from '../WpConvert-output/index';
import WpConvertImage from '../WpConvert-image/index';
import ImageGallery from 'react-image-gallery';
import "../WpConvert-imageGallery/index.css";

require('./index.css');

export default class WpConvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      outpt: '',
      keyword: '',
      images:[
        {
          original: 'http://lorempixel.com/1000/600/nature/1/',
          thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        },
        {
          original: 'http://lorempixel.com/1000/600/nature/2/',
          thumbnail: 'http://lorempixel.com/250/150/nature/2/'
        },
        {
          original: 'http://lorempixel.com/1000/600/nature/3/',
          thumbnail: 'http://lorempixel.com/250/150/nature/3/'
        }
      ],
      selectedImages:[],
      thumbs:null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageRequest = this.handleImageRequest.bind(this);
    this.handleGalleryClick = this.handleGalleryClick.bind(this);

  }
  render() {
    return (
      <div id="WpConvert" className="WpConvert">
        {this.renderInput(this.state.input)}
        {WpConvert.renderOutput(this.state.output)}
        {this.renderImage(this.state.keyword)}
        {this.renderGallery()}
        <ul>{this.thumbs}</ul>
      </div>
    );
  }
  renderInput(p) {
    return <WpConvertInput text={p} onChange={ this.handleChange } />;
  }

  static renderOutput(p) {
    return <WpConvertOutput text={p} />;
  }

  renderImage(p) {
    return <WpConvertImage text={p} onChange={ this.handleImageChange } onKeyDown={ this.handleImageRequest }/>;
  }

  renderGallery() {
    return (
      <ImageGallery
        items={this.state.images}
        slideInterval={2000}
        onClick = {this.handleGalleryClick}/>
    );
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ input: text });
    this.setState({ output: WpConvert.parse(text) });
  }

  handleImageChange(event) {
    const text = event.target.value;
    this.setState({ keyword: text });
  }

  handleImageRequest(event) {
    if(event.keyCode == 13) {
      WpConvert.imageRequest(this.state.keyword).then((resp) => {
        this.setState({images:WpConvert.parseImage(resp)});
      });
    }
  }

  handleGalleryClick(event) {
    this.selectImage(event);
    this.renderAllThumbs();
    WpConvert.parse(this.state.input);
  }

  static parse(text) {
    const _ = WpConvert;
    return _.insertArticleShortcodes(_.formatTitles(_.insertTopPageShortcodes(_.insertPageBreaks(_.insertLowerPageShortcodes(text)))));
  }

  static insertTopPageShortcodes(text) {
    // match titles with 3 to 70 characters
    // 3 characters to avoid matching carriage returns
    // 70 as this will be run before format titles
    return text.replace(/^[^\[<!--].{3,70}$/gm, match => `[sc name="default_top_ad"]\n${match}`);
  }

  static insertLowerPageShortcodes(text) {
    // match titles, allows for pages with varying paragraph counts
    // match a leading carriage return to prevent adding a lower title at the start of the article
    // no leading carrot allows for single or double space before title
    text = text.replace(/\n^[^\[].{3,70}$/gm, match => `\n[sc name="default_lower_ad"]${match}`);
    return `${text}\n[sc name="default_lower_ad"]`;
  }

  static insertPageBreaks(text) {
    // find titles and add pagebreak before. Helps with pages of varying paragraph count
    // match a leading \n to prevent adding a pagebreak at the top of the article
    // no leading carrot allows for single or double space before title
    // complicated regex, see https://regex101.com/r/M2pXOL/1
    // goal of the regex is to look for titles and add a pagebreak on the line before it
    // first \n is to prevent a page break at the top of the first page
    // exclude in brackets [] prevents other shortcodes => \[ from being treated as a title
    // exclude \n prevents extra shortcodes from being entered as spaces
    return text.replace(/\n^[^\[].{3,70}$/gm, match => `\n<!--next page-->\n${match}`);
  }

  static formatTitles(text) {
    // match lines with 3 to 70 characters, for titles, multiline to get them all
    // 3 characters to avoid matching carriage returns
    // skip fields that have shortcodes already with [^\]]
    // dot selector brings in carriage return to match, need to exclude with [^\n], added to closing bracket
    return text.replace(/^[^\[\n\<!].{3,70}$/gm, (match) => `[post_page_title]${match.replace('','')}[/post_page_title]` );
  }

  static insertArticleShortcodes(text) {
    // need shortcodes at the top and bottom of the entire article, simple concat
    return `[sc name="direct_default_top_ad"]\n${text}\n[sc name="direct_default_lower_ad"]`;
  }

  static imageRequest(text) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://smuvit.com/images', true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      // send the collected data as JSON
      xhr.send(JSON.stringify({keyword:text}));
      xhr.onloadend = function (object) {
        resolve(JSON.parse(object.currentTarget.response));
      };
    });
  }

  insertImageTags(text, images) {
    // need to add a different image tag before each pagination
    let sub=text;
    images.forEach(function(img) {
      sub=sub.replace(/[^>]\n<!--next page-->/, `]\n<img src="${img.url}">\n<!--next page-->`);
    });
    return sub;
  }

  selectImage(event) {
    let images = this.state.selectedImages;
    images.push(event.target.getAttribute('src'));
    this.setState({selectedImages:images});
  }

  renderAllThumbs() {
    const thumbs = this.state.selectedImages.map((src, index) => {
      return <li key={index}><img src={src} style={{width:'200px'}}/></li>;
    });
    this.thumbs = thumbs;
  }

  static parseImage(request) {
    return request.map((row) => {
      return {original:row.url, thumbnail:row.thumb};
    })
  }
}

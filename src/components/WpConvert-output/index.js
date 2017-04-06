import React from 'react';
import styles from './index.css';

export default class WpConvertOutput extends React.Component {
  render() {
    return (
      <div id="WpConvert-output" className={styles.WpConvert_output}>
        <label className={styles.WpConvert_output_label}>Output</label>
        <textarea id="WpConvert-output-textArea" className={styles.WpConvert_output_textArea} value={this.props.text}></textarea>
      </div>
    );
  }
}


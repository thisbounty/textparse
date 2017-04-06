import React from 'react';
import styles from './index.css';

export default class WpConvertInput extends React.Component {
  render() {
    return (
      <div id="WpConvert-input" className={styles.WpConvert_input}>
        <label className={styles.WpConvert_input_label}>Input</label>
        <textarea id="WpConvert-input-textArea" className={styles.WpConvert_input_textArea} onChange={this.props.onChange} value={this.props.text}></textarea>
      </div>
    );
  }
}


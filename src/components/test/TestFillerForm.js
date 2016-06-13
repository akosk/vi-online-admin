import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DateRangePickerInput from '../common/DateRangePickerInput';
import * as inputHelper from '../../utils/SelectInputHelper'

class TestFillerForm extends Component {

  static propTypes = {
    test: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
  };

  buildForm() {
    const {test,onChange, errors}=this.props;

    let form = [];
    if (test && test.questions) {
      return test.questions.map((q)=> {
        return <div>{q.question}</div>
      });
    }

    return form;
  }

  render() {
    const {saving,onSave}=this.props;
    return (
      <form >
        {this.buildForm()}
        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Mentés...' : 'Mentés'}
          className="btn btn-primary"
          onClick={onSave}/>
      </form>
    );
  }
}


export default TestFillerForm;

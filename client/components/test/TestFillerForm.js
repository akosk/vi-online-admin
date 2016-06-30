import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DateRangePickerInput from '../common/DateRangePickerInput';
import * as inputHelper from '../../utils/SelectInputHelper';

class TestFillerForm extends Component {

  static propTypes = {
    test: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object,
    disabled: PropTypes.bool
  };


  getFormItem(q, i) {
    let item = [];

    switch (q.type || 'text') {
      case 'text':
        item.push(
          <TextInput
            name={q.id}
            label={q.question}
            value={q.value}
            helpText={q.helptext}
            onChange={this.props.onChange}
            error={_.get(this.props.errors,[q.id])}
          />
        );
        break;
      case 'select':
        item.push(
          <SelectInput
            name={q.id}
            label={q.question}
            value={q.value}
            defaultOption="Válasszon..."
            options={q.answers}
            onChange={this.props.onChange}
            error={_.get(this.props.errors,[q.id])}
          />);
        break;
      default:

    }
    return item;
  }

  buildForm() {
    const {test,onChange, errors}=this.props;
    let form = [];
    if (test && test.questions) {
      return test.questions.map((q, i)=> {
        return this.getFormItem(q, i);
      });
    }

    return form;
  }

  render() {
    const {saving,onSave}=this.props;
    return (
      <form >
        {this.buildForm()}
        {this.props.disabled ||
        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Mentés...' : 'Mentés'}
          className="btn btn-primary"
          onClick={onSave}/>
        }
      </form>
    );
  }
}


export default TestFillerForm;

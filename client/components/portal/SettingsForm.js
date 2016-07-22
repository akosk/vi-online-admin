import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import classnames from 'classnames';
import _ from 'lodash';

class SettingsForm extends Component {


  render() {
    const { fields: { mailchimp:{api_key, list_id} }, saving, onSave, onCancel, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSave)}>
        <TextInput label="MailChimp API kulcs" {...api_key} />
        <TextInput label="MailChimp lista id" {...list_id} />

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          <i className={classnames({
            'fa': true,
            'fa-save': !submitting,
            'fa-cog': submitting,
            'fa-spin': submitting
          })}/> Beállítások mentése
        </button>
        <input
          type="submit"
          disabled={submitting}
          value="Mégsem"
          className="btn"
          onClick={onCancel}/>
      </form>

    );
  }
}
const settingsForm = reduxForm(
  {
    form: 'settings',
    fields: ['mailchimp.api_key','mailchimp.list_id']
  },
  state => ({
    initialValues: {
      mailchimp:{
        api_key: _.get(state, 'admin.portal.settings.mailchimp.api_key', ''),
        list_id: _.get(state, 'admin.portal.settings.mailchimp.list_id', '')
      }
    }
  })
)(SettingsForm);

export default settingsForm;

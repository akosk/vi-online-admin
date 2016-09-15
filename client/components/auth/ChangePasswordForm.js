import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import classnames from 'classnames';
import _ from 'lodash';

class ChangePasswordForm extends Component {

  static defaultProps = {
    oldPasswordVisible: true
  }

  render() {
    const { fields: { old_password,password, password2 }, oldPasswordVisible, saving, onSave, onCancel, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSave)}>
        { oldPasswordVisible && <TextInput label="Jelenlegi jelszó" {...old_password} />        }
        <TextInput type="password" label="Új jelszó" {...password} />
        <TextInput type="password" label="Új jelszó újra" {...password2} />

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-danger"
        >
          <i className={classnames({
            'fa': true,
            'fa-save': !submitting,
            'fa-cog': submitting,
            'fa-spin': submitting
          })}/> Jelszó módosítása
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
const changePasswordForm = reduxForm(
  {
    form: 'change-password',
    fields: ['old_password', 'password', 'password2']
  },
  state => ({
    initialValues: {}
  })
)(ChangePasswordForm);

export default changePasswordForm;

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { Panel } from 'react-bootstrap';
import TextInput from '../common/TextInput';
import classnames from 'classnames';
import * as actions from '../../actions';
import toastr from 'toastr';

class LostPassword extends Component {

  handleSubmit = (values, dispatch) => {
    const email=values.email;
    this.props.fields.email.onChange('');
    return this.props.sendPasswordResetEmail(email)
               .then(()=> toastr.success('Az új jelszó igényléséhez egy emailt küldtünk Önnek!'))
               .catch(err=>toastr.error('Az új jelszó igénylése nem sikerült.'));
  }

  render() {

    const { fields: { email }, saving, onSave, onCancel, handleSubmit, submitting } = this.props;

    return (
      <Panel className="panel" header="Elfelejtett jelszó">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <TextInput label="Email cím" {...email} />

          <button
            type="submit"
            disabled={submitting}
            className="btn  btn-block"
          >
            <i className={classnames({
            'fa': true,
            'fa-cog': submitting,
            'fa-spin': submitting
          })}/> Új jelszót kérek
          </button>
        </form>
      </Panel>
    );
  }
}

const lostPassword = reduxForm(
  {
    form: 'lostpassword',
    fields: ['email']
  },
  state => ({
    initialValues: {
      email: ''
    }
  })
)(LostPassword);


export default connect(null, actions)(lostPassword);

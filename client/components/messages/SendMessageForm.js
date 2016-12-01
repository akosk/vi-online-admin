import React from 'react';
import {reduxForm} from 'redux-form';
import classnames from 'classnames';
import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';


const SendMessageForm = ({ fields: { message, from }, saving, onSave, handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <TextInput label="Feladó" {...from} />
      <TextAreaInput label="Üzenet" {...message} />

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
      >
        <i className={classnames({
          'fa': true,
          'fa-envelope': !submitting,
          'fa-cog': submitting,
          'fa-spin': submitting
        })}/> Üzenet küldése
      </button>
    </form>

  );
}

export default reduxForm({
  form: 'send-message',
  fields: ['from', 'message'],
  initialValues: { from: 'Admin' }
})(SendMessageForm)


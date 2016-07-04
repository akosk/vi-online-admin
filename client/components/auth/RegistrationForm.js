import React from 'react';
import TextInput from '../common/TextInput';

const RegistrationForm = ({registration, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Név"
        value={registration.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="email"
        label="Email"
        value={registration.email}
        onChange={onChange}
        error={errors.email}/>

      <TextInput
        name="password"
        type="password"
        label="Jelszó"
        value={registration.password}
        onChange={onChange}
        error={errors.password}/>



      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Regisztráció...' : 'Regisztráció'}
        className="btn btn-primary btn-block"
        onClick={onSave}/>
    </form>
  );
};

RegistrationForm.propTypes = {
  registration: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RegistrationForm;

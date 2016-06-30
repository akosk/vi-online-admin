import React from 'react';
import TextInput from '../common/TextInput';

const LoginForm = ({login, onLogin, onChange, saving, errors}) => {
  return (
    <form >

      <TextInput
        name="email"
        label="Email"
        value={login.email}
        onChange={onChange}
        error={errors.email}/>

      <TextInput
        name="password"
        type="password"
        label="Jelszó"
        value={login.password}
        onChange={onChange}
        error={errors.password}/>



      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Bejelentkezés...' : 'Bejelentkezés'}
        className="btn btn-primary"
        onClick={onLogin}/>
    </form>
  );
};

LoginForm.propTypes = {
  login: React.PropTypes.object.isRequired,
  onLogin: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;

import React from 'react';
import TextInput from '../common/TextInput';
import Checkbox from '../common/Checkbox';
import SelectInput from '../common/SelectInput';
import * as inputHelper from '../../utils/SelectInputHelper';

const UserForm = ({user, onSave, onChange, onCancel, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Név"
        value={user.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="email"
        label="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}/>

      <SelectInput
        name="role"
        label="Szerepkör"
        value={user.role}
        defaultOption="Válasszon..."
        options={inputHelper.roleOptions()}
        onChange={onChange}
        error={errors.role}
      />

      <Checkbox
        name="blocked"
        label="Tiltva"
        checked={user.blocked}
        onChange={onChange}
        error={errors.blocked}/>



      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Mentés...' : 'Mentés'}
        className="btn btn-primary"
        onClick={onSave}/>
      <input
        type="submit"
        disabled={saving}
        value="Mégsem"
        className="btn"
        onClick={onCancel}/>
    </form>
  );
};

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default UserForm;

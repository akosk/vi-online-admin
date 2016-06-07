import React from 'react';
import TextInput from '../common/TextInput';
import Checkbox from '../common/Checkbox';

const TurnForm = ({turn, onSave, onChange, onCancel, saving, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Név"
        value={turn.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="slug"
        label="Slug"
        value={turn.slug}
        onChange={onChange}
        error={errors.slug}/>

      <Checkbox
        name="active"
        label="Aktív"
        checked={turn.active}
        onChange={onChange}
        error={errors.active}/>



      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Mentés...' : 'Mentés'}
        className="btn btn-primary"
        onClick={onSave}/>
      <input
        type="submit"
        disabled={saving}
        value='Mégsem'
        className="btn"
        onClick={onCancel}/>
    </form>
  );
};

TurnForm.propTypes = {
  turn: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TurnForm;

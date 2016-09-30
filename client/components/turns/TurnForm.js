import React from 'react';
import TextInput from '../common/TextInput';
import Checkbox from '../common/Checkbox';
import SelectInput from '../common/SelectInput';
import DateRangePickerInput from '../common/DateRangePickerInput';

import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

const TurnForm = ({turn, onSave, onChange, onCancel, saving, tests, errors}) => {
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


      <DateRangePickerInput
        name="turn_start_at"
        onChange={onChange}
        label="Turnus kezdés dátuma"
        value={turn.turn_start_at}
        singleDatePicker>
      </DateRangePickerInput>

      <DateRangePickerInput
        name="training_start_at"
        onChange={onChange}
        label="Képzés kezdés dátuma"
        value={turn.training_start_at}
        singleDatePicker>
      </DateRangePickerInput>


      <SelectInput
        name="competency_test.id"
        label="Kompetencia teszt"
        value={turn.competency_test.id}
        defaultOption="Válasszon kompetencia tesztet..."
        options={tests}
        onChange={onChange} error={errors['competency_test.id']}/>


      <DateRangePickerInput
        name="competency_test"
        onChange={onChange}
        label="Kompetencia teszt időablak"
        value={turn.competency_test}>
      </DateRangePickerInput>

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

TurnForm.propTypes = {
  turn: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  tests: React.PropTypes.array,
  errors: React.PropTypes.object
};

export default TurnForm;

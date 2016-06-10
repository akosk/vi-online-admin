import React, {PropTypes} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

const DateRangePickerInput = ({name, label, onChange, singleDatePicker,value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let val;

  if (singleDatePicker === undefined) {
    if (value.start_at && value.end_at) {
      val = `${moment(value.start_at).format('LL')} - ${moment(value.end_at).format('LL')}`;
    } else
      val = '';
  } else {
    if (value) {
      val = moment(value).format('LL');
    } else
      val = '';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">

        <DateRangePicker
          name={name}
          onEvent={onChange}
          showDropdowns
          singleDatePicker={singleDatePicker}>
          <input
            className="form-control"
            value={val}
            readOnly/>

        </DateRangePicker>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

DateRangePickerInput.defaultProps = {
  type: 'text'
};

DateRangePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  singleDatePicker: PropTypes.bool
};

export default DateRangePickerInput;

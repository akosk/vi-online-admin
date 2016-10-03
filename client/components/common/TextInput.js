import React, {PropTypes} from 'react';
import _ from 'lodash';


const TextInput = ({name, label, onChange, autocomplete, placeholder, value, disabled, error, helpText, type, numeric, pre}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  const onChangeNumeric = (e)=> {
    if (e.target.value=='' || /^\d+$/.exec(e.target.value)) {
      onChange(e);
    }
  };
  return (

    <div className={wrapperClass}>
      <label htmlFor={name}>{label}
        {helpText &&
        <p className="text-muted"><span className="glyphicon glyphicon-info-sign"></span>
          <small>{helpText}</small>
        </p>
        }
      </label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          autoComplete={autocomplete}
          disabled={disabled}
          value={value}
          onChange={numeric ? onChangeNumeric : onChange}/>
        {error && <div className="error">*{error}</div>}
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  numeric: false
};

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  helpText: PropTypes.string,
  numeric: PropTypes.bool,
  error: PropTypes.string
};

export default TextInput;

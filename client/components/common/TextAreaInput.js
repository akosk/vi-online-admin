import React, {PropTypes} from 'react';

const TextAreaInput = ({name, label, onChange, autocomplete, placeholder, value, disabled, error, helpText, type, rows, pre}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

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
        <textarea
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          autoComplete={autocomplete}
          disabled={disabled}
          value={value}
          rows={rows}
          onChange={onChange}>
          </textarea>
        {error && <div className="error">*{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.defaultProps = {
  type: 'text',
  rows: '5'
};

TextAreaInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaInput;

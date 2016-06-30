import React, {PropTypes} from 'react';

const Checkbox = ({name, label, onChange, checked=false, error, type}) => {
  let wrapperClass = 'checkbox';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>
        <input onChange={onChange} type="checkbox" name={name} checked={checked} /> {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.string
};

export default Checkbox;

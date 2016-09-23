import React from 'react';

const Radio = ({name, label, value, onChange, checked=false}) => {
  return (
    <div className="radio">
      <label>
        <input type="radio" name={name} value={value} onChange={onChange} checked={checked}/>
        {label}
      </label>
    </div>
  );
}

export default Radio;

import React from 'react';
import TextInput from './TextInput';




const MultiTextInput = ({name, label, onChange, values, error, helpText, items, disabled}) => {

  const inputItems = items.map((item)=> {
    return <TextInput
      onChange={onChange}
      label={item.text}
      name={`${name}.${item.value}`}
    />
  });

  return (
    <div className="form-group">

      <label htmlFor={name}>{label}
        {helpText &&
        <p className="text-muted">
          <span className="glyphicon glyphicon-info-sign"></span>
          <small>{helpText}</small>
        </p>
        }
      </label>
      <div className="field">

        { inputItems }

        {error && <div className="alert alert-danger">{error}</div>}
      </div>


    </div>
  );
}

export default MultiTextInput;

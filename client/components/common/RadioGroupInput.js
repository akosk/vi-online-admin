import React from 'react';
import Radio from './Radio';

const RadioGroupInput = ({name, label, finalized, onChange, value, error, helpText, options, disabled}) => {

  const optionItems = options.map((option)=> {

    return (
      <div key={option.value}>
        <Radio
          onChange={onChange}
          checked={option.value===value}
          label={option.text}
          name={name}
          value={option.value}
        />
      </div>
    );
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

        { optionItems }

        {error && <div className="error">*{error.error}</div>}
      </div>




    </div>
  );
}

export default RadioGroupInput;

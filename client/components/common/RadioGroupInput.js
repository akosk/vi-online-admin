import React from 'react';
import Radio from './Radio';
import TextInput from './TextInput';
import _ from 'lodash';

const RadioGroupInput = ({name, label, finalized, onChange, value, error, helpText, options, disabled}) => {
  const optionItems = options.map((option)=> {

    const checked = option.value === value.value;
    return (
      <div key={option.value}>
        <Radio
          onChange={onChange}
          checked={checked}
          label={option.text}
          name={`${name}.value`}
          value={option.value}
        />
        {checked && option.extraQuestion !== undefined &&
        <TextInput
          name={`${name}.extra.value`}
          label={option.extraQuestion}
          value={_.get(value,'extra.value') || ''}
          disabled={finalized}
          onChange={onChange}
          numeric={_.get(option,'extraOptions.numeric')}
          error={_.get(error,`extra.error`)}
        />
        }

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

        {optionItems}

        {_.get(error,'error') && <div className="error">*{error.error}</div>}
      </div>


    </div>
  );
};

export default RadioGroupInput;

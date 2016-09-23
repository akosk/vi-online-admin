import React from 'react';
import Checkbox from './Checkbox';
import TextInput from './TextInput';
import _ from 'lodash';



const MultiCheckboxInput = ({name, label, finalized, onChange, values, error, helpText, options, disabled}) => {
console.log("error",error);
  const optionItems = options.map((option)=> {
    const value=_.get(values,option.value);
    //const value=_.find(values,(v)=>{
    //  return v.id===option.value;
    //});
    const checked=_.get(value,'checked',false) ;
    return (
      <div key={option.value}>
        <Checkbox
          onChange={onChange}
          checked={checked}
          label={option.text}
          name={`${name}.${option.value}.checked`}
        />
        { checked &&
        <TextInput
          name={`${name}.${option.value}.value`}
          label={option.extraQuestion}
          value={_.get(value,'value')}
          disabled={finalized}
          onChange={onChange}
          onChange={onChange}
          error={_.get(error,`${option.value}.value.error`)}
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

        { optionItems }

        {error && error.error && <div className="error">*{error.error}</div>}
      </div>




    </div>
  );
}

export default MultiCheckboxInput;

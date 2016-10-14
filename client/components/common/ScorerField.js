import React from 'react';
import * as types from '../../../common/fieldTypes';
import  _ from 'lodash';
import Slider from 'nw-react-slider';
import 'nw-react-slider/dist/nw-react-slider.css';
import * as filterSchema from '../../../common/filterSchema';

import {Label} from 'react-bootstrap';


const getValueView = (value, field)=> {

  if (!value) {
    return "Nincs kitöltve";
  }

  let valueView;
  switch (field.type) {
    case  types.STRING:
    {
      valueView = value;
      break;
    }
    case  types.DATETIME:
    case  types.DATE:
    {
      valueView = value;
      break;
    }
    case  types.SELECT:
    {
      let op = _.find(field.options, (i)=> {
          return i.value == value
        }
      );

      valueView = <div>
        {op && op.text}
        {op && op.extraQuestion &&
        <ExtraView question={op.extraQuestion} value={value.extra.value}/>
        }
      </div>;
      break;
    }
    case  types.RADIOGROUP:
    {
      let v = value && value.value;
      const op = _.find(field.options, (i)=> {
          return i.value == v
        }
      );

      valueView = <div>
        {op && op.text}
        {op && op.extraQuestion &&
        <ExtraView question={op.extraQuestion} value={value.extra.value}/>
        }

      </div>;
      break;
    }
    case  types.MULTICHECKBOX:
    {
      valueView = _.keys(value).map((k)=> {
        if (value[k].checked) {
          const op = _.find(field.options, (i)=> {
              return i.value == k
            }
          );
          return <li key={k}>{op.text}
            {op.extraQuestion &&
            <ExtraView question={op.extraQuestion} value={value[k].extra.value}/>
            }
          </li>;
        }
      });
      valueView = <ul>{valueView}</ul>;
      break;
    }


  }
  if (!valueView) {
    valueView = <p className="text-muted">Hiba történt</p>
  }
  return valueView;
}

const ExtraView = ({question, value})=> {
  return <div className="text-left">
    <h5><strong>
    {question}
    </strong>
    </h5>
      <h5>
        {value}
      </h5>
  </div>;
};

const ScorerField = ({field,value,score,onSetScore}) => {

  const valueView = getValueView(value, field);

  const onChange = (score)=> {
    onSetScore(field.rname, score);
  };

  return (
    <div style={{marginBottom:28}}>
      <h5><strong> {field.longName || field.name}</strong></h5>
      <div>
        {valueView}
      </div>

      { field.rating &&
      <div >
        <div className="text-right">
          <h2>
            <Label bsStyle="info">Kockázati pontszám: {score}</Label>
          </h2>
        </div>
        { field.rating === filterSchema.RATING_TYPE_MANUAL &&
        <Slider
          value={score}
          min={-30}
          max={30}
          ticks
          onChange={onChange}/>
        }
      </div>
      }
    </div>
  );
}

export default ScorerField;

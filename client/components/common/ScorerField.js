import React from 'react';
import * as types from '../../../common/fieldTypes';
import moment from 'moment';
import  _ from 'lodash';
import Slider from 'nw-react-slider';
import 'nw-react-slider/dist/nw-react-slider.css';
import * as filterSchema from '../../../common/filterSchema';

import {Label} from 'react-bootstrap';


const getValueView = (value, field)=> {

  if (!value) {
    return <div className="text-warning"><i className="fa fa-question-circle-o" aria-hidden="true"></i> Nincs kitöltve</div> ;
  }

  let valueView;
  switch (field.type) {
    case  types.STRING:
    {
      valueView = <input className="form-control" type="text" value={value}/>;
      break;
    }
    case  types.DATETIME:
    case  types.DATE:
    {
      valueView = <input className="form-control" type="text" value={moment(value).format('YYYY-MM-DD')}/>;
      break;
    }
    case  types.SELECT:
    {
      let op = _.find(field.options, (i)=> {
          return i.value == value
        }
      );

      valueView = <div>
        {op && <input className="form-control" type="text" value={op.text}/>}
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
        {op && <input className="form-control" type="text" value={op.text}/>}
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
          return <div key={k}>
            <input className="form-control" type="text" value={op.text}/>
            {op.extraQuestion &&
            <ExtraView question={op.extraQuestion} value={value[k].extra.value}/>
            }
          </div>;
        }
      });
      valueView = <div>{valueView}</div>;
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

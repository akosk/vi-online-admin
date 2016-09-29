import React, { Component } from 'react';
import * as filter from '../../../common/filterSchema';
import * as fieldTypes from '../../../common/fieldTypes';
import {relationOptions} from '../../../common/SelectInputHelper';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';
import DateRangePickerInput from '../common/DateRangePickerInput';

class FilterFormElement extends Component {

  onRemove = (e)=> {
    this.props.onRemove(this.props.index, e);
  };

  onChange = (e, component)=> {
    this.props.onChange(e, this.props.index, component);
  };




  render() {
    const {item}=this.props;

    let valueInput, field;
    if (item.table && item.field) {
      field = filter.findField(item.table, item.field);
      switch (field.type) {
        case fieldTypes.STRING:
          valueInput = (<TextInput
            name="value"
            label="Érték"
            value={item.value}
            onChange={this.onChange}
          />);
          break;
        case fieldTypes.MULTICHECKBOX:
        case fieldTypes.SELECT:


          valueInput = (<SelectInput
            name="value"
            label="Érték"
            value={item.value}
            onChange={this.onChange}
            options={field.options}
            defaultOption="Válasszon..."
          />);
          break;
        case fieldTypes.DATE:
          valueInput = (<DateRangePickerInput
            name="value"
            onChange={this.onChange}
            label="Érték"
            value={item.value}
            singleDatePicker>
          </DateRangePickerInput>);
          break;
      }
    }


    return (
      <div>
        <span className="pull-right"><a href="#" onClick={this.onRemove}><i className="fa fa-close"></i></a></span>

        <SelectInput disabled={this.props.size>1} name="table" label="Tábla" onChange={this.onChange}
                     value={item.table || ''}
                     options={filter.getTablesAsOptions()}></SelectInput>
        {item.table &&
        <div>
          <SelectInput name="field" label="Mező" onChange={this.onChange}
                       options={filter.getFieldsAsOptions(item.table)}>
          </SelectInput>

          {item.field &&
          <div className="row">
            {field.type !== fieldTypes.SELECT &&
            <div className="col-sm-5">
              <SelectInput
                name="rel"
                label="Reláció"
                onChange={this.onChange}
                options={relationOptions(field.type)}></SelectInput>
            </div>
            }
            <div className="col-sm-7">
              {valueInput}
            </div>
          </div>
          }
        </div>
        }

        <div style={{display:'flex'}}>
          <div style={{flexGrow:1}}>
            <hr/>
          </div>
          {this.props.size > this.props.index + 1 &&
          <h4 style={{margin:'10px 0px'}}>
          <span style={{padding:'8px'}} className="label label-primary">
          VAGY
            </span>
          </h4>
          }
          <div style={{flexGrow:1}}>
            <hr/>
          </div>
        </div>

      </div>
    );
  }
}

export default FilterFormElement;




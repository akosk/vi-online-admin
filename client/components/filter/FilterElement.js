import React, { Component } from 'react';
import classnames from 'classnames';
import * as filter from '../../../common/filterSchema';

class FilterElement extends Component {


  static defaultProps = {
    operation: 'ÉS',
    edit: true,
    onRemove: ()=> {
    }
  };


  constructor(props, context) {
    super(props, context);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.preventDefault();
    this.props.onRemove(this.props.index, this.props.parentIndex, e);
  }

  render() {
    const {index, item, onRemove, operation}=this.props;
    const table = filter.findTable(item.table);
    const field = filter.findField(item.table, item.field);

    if (Array.isArray(item)) {
      return (
        <span className="filter-wrapper">
          { index > 0 && <span className="label label-green-600">{operation}</span>}
          <span className="label label-green-800">(</span>
          { item.map((subItem, subIndex)=><FilterElement
            key={`${index}.${subIndex}`}
            parentIndex={index}
            index={subIndex}
            item={subItem}
            operation="VAGY"
            onRemove={onRemove}
          />)}
          <span className="label label-green-800">)</span>
      </span>
      );


    } else {
      const text = `${table.name}.${field.name} ${item.rel} ${item.value}`;
      const classes = {
        label: true,
        'label-green-600': operation === 'ÉS',
        'label-green-800': operation !== 'ÉS',
      };
      return (
        <span className="filter-wrapper">
          { index > 0 && <span className={classnames(classes)}>{operation}</span> }
        <span className={classnames(classes)}>
          {text}
          {this.props.edit &&
          <i style={{cursor:'pointer'}} className="fa fa-close" onClick={this.onRemove}></i>
          }
        </span>
          </span>
      );
    }

  }
}

export default FilterElement;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as filter from '../../../common/filterSchema';
import FilterElement from './FilterElement';
import _ from 'lodash';
import Content from '../common/Content';
import TextInput from '../common/TextInput';
import FilterApi from '../../api/filterApi';
import toastr from 'toastr';

import * as actions from '../../actions/filterActions';
import FilterFormElement from './FilterFormElement';
import SelectFilterButton from './SelectFilterButton';

const formInitialState = {
  table: '',
  field: '',
  rel: '',
  value: '',
};
const filterInitialState = {
  name: '',
  category: 'userturn',
  conditions: []
};

class FilterManager extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      form: [
        { ...formInitialState }
      ],
      filter: { ...filterInitialState }
    }

  }

  componentDidMount() {
    this.props.loadFilters();
  }

  onRemoveClick = (index, parentIndex, e)=> {
    if (parentIndex === undefined) {
      this.state.filter.conditions.splice(index, 1);
      console.log('before', this.state);
      this.setState({
        filter: {
          conditions: this.state.filter.conditions
        }
      });
      console.log('after', this.state);
      return;
    } else {
      this.state.filter.conditions[parentIndex].splice(index, 1);
      if (this.state.filter.conditions[parentIndex].length === 1) {
        this.state.filter.conditions[parentIndex] = this.state.filter.conditions[parentIndex][0];
      }
      this.setState({
        filter: { conditions: this.state.filter.conditions }
      });
      return;
    }
  }


  isFormValid = ()=> {
    return this.state.form.length > 0 && this.state.form.findIndex((e)=>!e.value || !e.rel) === -1;
  };

  onAddOrConditionClick = (e) => {
    const newElement = this.state.form.length > 0 ?
    {...formInitialState,table:this.state.form[0].table} :
    { ...formInitialState };
    this.setState({
      form: [
        ...this.state.form,
        newElement

      ]
    });
  }

  onAddConditionClick = (e) => {
    if (this.state.form.length === 1) {
      this.setState({
        filter: {
          ...this.state.filter,
          conditions: [
            ...this.state.filter.conditions,
            { ...this.state.form[0] }
          ]
        },
        form: [{ ...formInitialState }]
      });
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          conditions: [
            ...this.state.filter.conditions,
            this.state.form
          ]
        },
        form: [{ ...formInitialState }]
      });

    }
  }

  onRemoveFormElementClick = (index, e)=> {
    this.state.form.splice(index, 1);
    this.setState(
      {
        form: this.state.form
      }
    )
  };

  onFormElementChange = (event, index, component) => {
    console.log('onFormElementChange', event, index);
    let form = this.state.form;

    if (component) {
      // If component is daterangepicker
      const field = event.target.attributes.name.value;
      if (component.singleDatePicker) {
        form[index][field] = component.startDate.valueOf();
      } else {
        form[index][field].start_at = component.startDate.valueOf();
        form[index][field].end_at = component.endDate.valueOf();
      }
    } else {

      const field = event.target.name;
      console.log(event.target.type);
      switch (event.target.type) {
        case 'checkbox':
          form[index][field] = event.target.checked;
          break;
        case 'select-one':
          console.log('setting rel eq',form[index]);
          form[index]['rel']='=';
          form[index][field] = event.target.value;
          break;
        default:
          form[index][field] = event.target.value;
      }
    }
    return this.setState({ form });
  };

  onNameChange = (e)=> {
    this.setState({
      filter: {
        ...this.state.filter,
        name: e.target.value
      }
    })
  };

  onSaveFilterClick = (e)=> {
    this.props.saveFilter(this.state.filter)
        .then((filter)=> {
          toastr.success('A szűrő mentése megtörtént.');
          this.setState({
            filter
          });
        })
        .catch((err)=> {
          console.log(err);
          toastr.error('A szűrő mentése sikertelen.');
        })
  }

  onDeleteFilterClick = (e)=> {
    this.props.deleteFilter(this.state.filter.id)
        .then((filter)=> {
          toastr.success('A szűrő törlése megtörtént.');

          this.setState({
            filter: filterInitialState
          });
        })
        .catch((err)=> {
          console.log(err);
          toastr.error('A szűrő törlése sikertelen.');
        })
  }


  options() {
    return {};
  }

  selectRowProp() {
    return {
      mode: "radio",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: (row, isSelected)=> {
        this.setState({
          filter: isSelected ? row : { ...filterInitialState }
        });
      },
      onSelectAll: (isSelected)=> {
        this.props.selectAllTurns(isSelected);
      }
    };
  }

  selectFilterIcon = (id)=> {
    return (<SelectFilterButton id={id} onSelectFilter={this.props.onSelectFilter}/>);
  }

  render() {
    const sentence = this.state.filter.conditions
                         .map((item, index)=><FilterElement key={index} index={index} item={item}
                                                            onRemove={this.onRemoveClick}/>);
    const toolBoxClass = {
      hidden: true
    };

    const form = this.state.form.map((item, index)=> {
      return (
        <FilterFormElement key={index} index={index} item={item} size={this.state.form.length}
                           onChange={this.onFormElementChange}
                           onRemove={this.onRemoveFormElementClick}/>
      );
    });

    return (
      <div >
        <BootstrapTable data={this.props.filters} striped={false} hover
                        bordered
                        pagination
                        selectRow={this.selectRowProp()}
                        options={this.options()}>
          <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
          <TableHeaderColumn filter={{ type: 'TextFilter', placeholder: 'Név szűrő' }} dataField="name"
                             dataSort>Név</TableHeaderColumn>
          <TableHeaderColumn dataField="id" dataFormat={this.selectFilterIcon}></TableHeaderColumn>
        </BootstrapTable>

        <Content title="Kiválasztott szűrő">
          <div className="row">
            <div className="col-sm-4">
              {form}
              <div>
                <button disabled={!this.state.form[0].table} onClick={this.onAddOrConditionClick} className="btn btn-block btn-primary"><i
                  className="fa fa-plus"></i> 'Vagy' hozzáadása
                </button>
                <button
                  onClick={this.onAddConditionClick}
                  disabled={!this.isFormValid()}
                  className="btn btn-block btn-primary">
                  <i className="fa fa-arrow-right"></i> Hozzáad
                </button>
              </div>
            </div>
            <div className="col-sm-8 well">
              <TextInput
                name="name"
                label="Név"
                value={this.state.filter.name}
                onChange={this.onNameChange}
              />

              <h4 className="filter  ">
                {sentence}
              </h4>

              <button
                onClick={this.onSaveFilterClick}
                disabled={!this.state.filter.name}
                className="btn btn-block btn-primary">
                <i className="fa fa-save"></i> Szűrű mentése
              </button>
              <button
                onClick={this.onDeleteFilterClick}
                disabled={!this.state.filter.id}
                className="btn btn-block btn-danger">
                <i className="fa fa-warning"></i> Szűrű törlése
              </button>
            </div>
          </div>


        </Content>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: _.get(state, 'filters', [])
  };
};

export default connect(mapStateToProps, actions)(FilterManager);



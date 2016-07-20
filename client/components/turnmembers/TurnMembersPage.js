import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Modal, Panel, Badge, Button } from 'react-bootstrap';
import  FilterManager from '../filter/FilterManager';
import FilterElement from '../filter/FilterElement';

import Content from '../common/Content';

import * as actions from '../../actions/adminActions';
import _  from 'lodash';

class TurnMembersPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onFilterClose = this.onFilterClose.bind(this);
    this.state = {
      showFilterModal: false,
      filter: {}
    };
  }


  componentWillReceiveProps(newProps) {
    if (newProps.selectedTurn.id && this.props.selectedTurn.id !== newProps.selectedTurn.id) {
      this.props.loadTurnMembers(newProps.selectedTurn.id, this.state.filter);
    }
  }

  componentDidMount() {
    if (this.props.selectedTurn.id)
      this.props.loadTurnMembers(this.props.selectedTurn.id, this.state.filter);
  }

  viewIcon(id) {
    return (<Link to={`/admin/turnmembers/${id}/signup-data`} onClick={(e)=>e.stopPropagation()}>
      <span className="glyphicon glyphicon-eye-open"></span>
    </Link>);
  }

  options() {
    return {
      insertText: 'Hozzáad',
      deleteText: 'Töröl',
    };
  }

  onFilterClick(e) {
    e.preventDefault();
    this.setState({ showFilterModal: true });
  }

  onFilterClose(e) {
    e.preventDefault();
    this.setState({ showFilterModal: false });
  }

  onSelectFilter = (id)=> {
		var selectedFilter = _.find(this.props.filters, (i)=> {
      return i.id === id;
    });
    this.setState({
      showFilterModal: false,
      filter: {...selectedFilter}
    });

    this.props.loadTurnMembers(this.props.selectedTurn.id, selectedFilter);

  };

  onRemoveFilterClick=(e)=>{
    e.preventDefault();
    this.setState({
      filter:{}
    });
    this.props.loadTurnMembers(this.props.selectedTurn.id, {});
  };

  render() {
    const { users, selectedTurn } = this.props;
    return (
      <Content category="Turnus" title="Turnus felhasználói" badge={users.length}
               toolButtons={[{icon:'fa fa-filter', onClick:this.onFilterClick}]}>

        {
          this.state.filter.id &&
          <div className="well filter">
            <a href="#" onClick={this.onRemoveFilterClick}> <span className="pull-right fa fa-close"></span></a>
            <h4>{this.state.filter.name}</h4>

            {this.state.filter.conditions
                   .map((item, index)=><FilterElement key={index} index={index} item={item} edit={false}/>)
            }
          </div>
        }
        <BootstrapTable data={users} striped={false} hover
                        bordered
                        pagination
                        options={this.options()}>
          <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
          <TableHeaderColumn dataField="name"
                             filter={{ type: 'TextFilter', placeholder: 'Név szűrő' }}
                             dataSort>Név</TableHeaderColumn>
          <TableHeaderColumn dataField="email"
                             filter={{ type: 'TextFilter', placeholder: 'Email szűrő' }}
                             dataSort>Email</TableHeaderColumn>
          <TableHeaderColumn dataField="id" dataFormat={this.viewIcon}></TableHeaderColumn>
        </BootstrapTable>


        <Modal show={this.state.showFilterModal} onHide={this.onFilterClose} dialogClassName="wide-modal">
          <Modal.Header closeButton>
            <Modal.Title>Szűrők</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <FilterManager onSelectFilter={this.onSelectFilter}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onFilterClose}>Bezár</Button>
          </Modal.Footer>
        </Modal>
      </Content>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    selectedTurn: _.get(state, 'admin.turn', {}),
    users: _.get(state, 'admin.turnMembers', []),
    filters: _.get(state, 'filters', [])
  };
};

export default connect(mapStateToProps, actions)(TurnMembersPage);


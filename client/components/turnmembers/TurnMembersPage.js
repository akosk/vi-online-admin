import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Panel, Badge, Button } from 'react-bootstrap';

import Content from '../common/Content';

import * as actions from '../../actions/adminActions';
import _  from 'lodash';

class TurnMembersPage extends Component {


  componentWillReceiveProps(newProps) {
    if (newProps.selectedTurn.id && this.props.selectedTurn.id !== newProps.selectedTurn.id) {
      this.props.loadTurnMembers(newProps.selectedTurn.id);
    }
  }

  componentDidMount() {
    if (this.props.selectedTurn.id)
      this.props.loadTurnMembers(this.props.selectedTurn.id);
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


  render() {
    const { users, selectedTurn } = this.props;
    return (
      <Content category="Turnus" title="Turnus felhasználói" badge={users.length}>
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


      </Content>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    selectedTurn: _.get(state, 'admin.turn', {}),
    users: _.get(state, 'admin.turnMembers', [])
  };
};

export default connect(mapStateToProps, actions)(TurnMembersPage);


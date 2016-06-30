import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Panel, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import * as actions from '../../actions/userActions';
import {checkboxFormatter} from '../../utils/formatters';

class UsersListPage extends Component {


  options() {
    return {
      afterDeleteRow: (rowKeys)=> {
        this.props.deleteSelectedUsers(rowKeys);
      },
      insertText: 'Hozzáad',
      deleteText: 'Töröl',
    };
  }

  selectRowProp() {
    return {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: (row, isSelected)=> {
        this.props.selectUser(row, isSelected);
      },
      onSelectAll: (isSelected)=> {
        this.props.selectAllUsers(isSelected);
      }
    };
  }

  editIcon(id) {
    return (<Link to={`/admin/users/${id}`} onClick={(e)=>e.stopPropagation()}>
      <span className="glyphicon glyphicon-pencil"></span>
    </Link>);
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <Panel className="panel-primary" header={(
        <span>
        Felhasználók &nbsp;&nbsp;
        <Badge>{users.length}</Badge>
        </span>
        )}>
          <BootstrapTable data={users} striped={false} hover
                          deleteRow
                          bordered
                          selectRow={this.selectRowProp()}
                          options={this.options()}>
            <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort>Név</TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>Email</TableHeaderColumn>
            <TableHeaderColumn dataField="blocked" style={{color:'red'}} dataSort  dataFormat={checkboxFormatter}>Tiltva</TableHeaderColumn>
            <TableHeaderColumn dataField="id" dataFormat={this.editIcon}></TableHeaderColumn>
          </BootstrapTable>

        </Panel>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const users = _.get(state, 'users', []);

  return {
    users: _.cloneDeep(users)
  };
};

export default connect(mapStateToProps, actions)(UsersListPage);


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Panel, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import Content from '../common/Content';
import * as actions from '../../actions/turnActions';
import {checkboxFormatter} from '../../utils/formatters';

class TurnsListPage extends Component {


  options() {
    return {
      afterDeleteRow: (rowKeys)=> {
        this.props.deleteSelectedTurns(rowKeys);
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
        this.props.selectTurn(row, isSelected);
      },
      onSelectAll: (isSelected)=> {
        this.props.selectAllTurns(isSelected);
      }
    };
  }

  editIcon(id) {
    return (<Link to={`/admin/turns/${id}`} onClick={(e)=>e.stopPropagation()}>
      <span className="glyphicon glyphicon-pencil"></span>
    </Link>);
  }


  render() {
    const { turns } = this.props;
    return (

      <Content category="Törzsadatok" title="Turnusok" badge={turns.length}>

        <div className="pull-right">
          <Link to={`/admin/turns/new`} onClick={this.editIcon}>
            <span className="glyphicon glyphicon-plus" style={{fontSize:'1.4em'}}></span>
          </Link>
        </div>

        <BootstrapTable data={turns} striped={false} hover
                        deleteRow
                        bordered
                        pagination
                        selectRow={this.selectRowProp()}
                        options={this.options()}>
          <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort>Név</TableHeaderColumn>
          <TableHeaderColumn dataField="id" dataFormat={this.editIcon}></TableHeaderColumn>
        </BootstrapTable>

      </Content>

    );
  }
}

const mapStateToProps = (state) => {
  const turns = _.get(state, 'turns', []);

  return {
    turns: _.cloneDeep(turns)
  };
};

export default connect(mapStateToProps, actions)(TurnsListPage);






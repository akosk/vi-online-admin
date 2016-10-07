import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Modal, Panel, Badge, Button} from 'react-bootstrap';
import  FilterManager from '../filter/FilterManager';
import FilterElement from '../filter/FilterElement';
import toastr from 'toastr';

import log from '../../utils/logger';

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
    return (<Link to={`/admin/turnmembers/${id}/signup-data-1`} onClick={(e)=>e.stopPropagation()}>
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
    if (e) e.preventDefault();
    this.setState({ showFilterModal: false });
  }

  onSelectFilter = (id)=> {
    let selectedFilter = _.find(this.props.filters, (i)=> {
      return i.id === id;
    });
    this.setState({
      showFilterModal: false,
      filter: { ...selectedFilter }
    });

    this.props.loadTurnMembers(this.props.selectedTurn.id, selectedFilter);

  };

  onRemoveFilterClick = (e)=> {
    e.preventDefault();
    this.setState({
      filter: {}
    });
    this.props.loadTurnMembers(this.props.selectedTurn.id, {});
  };

  onMailChimpExportClick = (e)=> {
    e.preventDefault;
    this.props.mailChimpExport(this.props.users.map((u)=> {
      return {id:u.id, name:u.name, email:u.email};
    }),this.state.filter.name)
        .then((res)=> {
          toastr.success('Az exportálás a MailChimp felé megtörtént.');
        })
        .catch((err)=> {
          log(err);
          toastr.error('Az exportálás a MailChimp felé sikertelen. ');
        });
  };

  render() {
    const { users, selectedTurn } = this.props;

    const toolButtons = [
      { icon: 'fa fa-filter', onClick: this.onFilterClick },
    ];

    if (this.state.filter.id) {
      toolButtons.push({ img: '/images/freddie_wink.svg', onClick: this.onMailChimpExportClick });
    }

    return (
      <Content category="Turnus" title="Turnus felhasználói" badge={users.length}
               toolButtons={toolButtons}>

        {
          this.state.filter.id &&

          <div>
            <div className="well filter">
              <a href="#" onClick={this.onRemoveFilterClick}> <span className="pull-right fa fa-close"></span></a>
              <h4>{this.state.filter.name}</h4>

              {this.state.filter.conditions
                   .map((item, index)=><FilterElement key={index} index={index} item={item} edit={false}/>)
              }
            </div>

          </div>
        }
        <BootstrapTable data={users} striped={false} hover
                        columnFilter={false}
                        bordered
                        pagination
                        options={this.options()}>
          <TableHeaderColumn isKey hidden dataField="id">#</TableHeaderColumn>
          <TableHeaderColumn dataField="name"
                             filter={this.state.filter.id ? {} : { type: 'TextFilter', placeholder: 'Név szűrő' }}
                             dataSort>Név</TableHeaderColumn>
          <TableHeaderColumn dataField="email"
                             filter={this.state.filter.id ? {} : { type: 'TextFilter', placeholder: 'Email szűrő' }}
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


import React, {Component, PropTypes} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Modal, Panel, Badge, Button} from 'react-bootstrap';
import  FilterManager from '../filter/FilterManager';
import FilterElement from '../filter/FilterElement';
import toastr from 'toastr';
import axios from 'axios';
import config from '../../../server/config';

import log from '../../utils/logger';

import Content from '../common/Content';

import * as actions from '../../actions/adminActions';
import _  from 'lodash';

class TurnMembersPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showFilterModal: false,
      showExportModal: false,
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

  sizePerPageListChange=(sizePerPage) =>{
    alert(`sizePerPage: ${sizePerPage}`);
  }

  options() {
    return {
      sizePerPage: 300,
      onSizePerPageList: this.sizePerPageListChange,
      sizePerPageList: [
        {
          text: '10', value: 10
        },
        {
          text: '50', value: 50
        },
        {
          text: '100', value: 100
        },
        {
          text: '300', value: 300
        },
        {
          text: '500', value: 500
        }
      ],
      insertText: 'Hozzáad',
      deleteText: 'Töröl',
    };
  }

  onFilterClick = (e)=> {
    e.preventDefault();
    this.setState({ showFilterModal: true });
  }

  onExcelClick = (e)=> {
    axios.get(`${config.rootUrl}signup-datas/${this.props.selectedTurn.id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } })
         .then((res)=> {
           this.setState({ showExportModal: true, exportFileName: res.data });
         })
         .catch((err)=> {
           console.log(err);
           toastr.error('Az exportálás sikertelen. ');
         });
  }

  onExportClose = (e)=> {
    if (e) e.preventDefault();
    this.setState({ showExportModal: false });
  }

  onFilterClose = (e)=> {
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

    const listName=this.state.filter.id ? this.state.filter.name : "Turnus összes tagja";

    this.props.mailChimpExport(this.props.users.map((u)=> {
          return { id: u.id, name: u.name, email: u.email };
        }), listName)
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
      { icon: 'fa fa-file-excel-o', onClick: this.onExcelClick },
      { img: '/images/freddie_wink.svg', onClick: this.onMailChimpExportClick }
    ];

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

        <Modal show={this.state.showExportModal} onHide={this.onExportClose} dialogClassName="wide-modal">
          <Modal.Header closeButton>
            <Modal.Title>Excel export</Modal.Title>
          </Modal.Header>
          <Modal.Body >

            <div>Kattintson az alábbi linkre a generált Excel fájl letöltéséhez:</div>


            <a className="btn btn-primary"
               href={`/files/export/${this.state.exportFileName}`}>{this.state.exportFileName}</a>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onExportClose}>Bezár</Button>
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


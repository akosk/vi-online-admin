import React, { Component } from 'react';
import {Nav, NavItem, NavDropdown} from 'react-bootstrap';
import  {LinkContainer} from 'react-router-bootstrap';
import Content from '../common/Content';
import * as actions from '../../actions';

import { connect } from 'react-redux';
import _  from 'lodash';

class TurnMemberView extends Component {

  componentDidMount() {
    this.props.loadUser(this.props.params.user_id);
  }

  render() {
    const {user_id}=this.props.params;
    return (
      <Content category="Turnusok" title="Felhasználó adatlapja">
      <div className="row">
        <div className="col-sm-3">

          <div className="text-center">
              <img src={`https://robohash.org/${this.props.displayName}`}
                   style={{height:100,width:'auto'}}
                   className="img-circle "/>
            <h4> {this.props.displayName}</h4>
          </div>

          <hr/>

          <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect}>
            <LinkContainer to={`/admin/turnmembers/${user_id}/signup-data`}>
              <NavItem eventKey="1.1">Jelentkezési lap</NavItem>
            </LinkContainer>
            <LinkContainer to={`/admin/turnmembers/${user_id}/signup-test`}>
              <NavItem eventKey="1.2">Kompetencia teszt</NavItem>
            </LinkContainer>
            <LinkContainer to={`/admin/turnmembers/${user_id}/signup-statement`}>
              <NavItem eventKey="1.3">Nyilatkozatok</NavItem>
            </LinkContainer>
          </Nav>

        </div>
        <div className="col-sm-9">
        {this.props.children}
        </div>
      </div>
        </Content>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    displayName: _.get(state, 'userturns.user.name', 'Unknown'),
  };
};

export default connect(mapStateToProps, actions)(TurnMemberView);


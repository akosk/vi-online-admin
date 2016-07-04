import React, { Component } from 'react';
import {Nav, NavItem, NavDropdown} from 'react-bootstrap';
import  {LinkContainer} from 'react-router-bootstrap';

class TurnMemberView extends Component {
  render() {
    const {user_id}=this.props.params;
    return (
      <div className="row">
        <div className="col-sm-3">

          <div className="text-center">
            <h3>
              <span className="glyphicon glyphicon-user"></span>
            </h3>
            <h5> Kiszely Ákos</h5>
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
    );
  }
}

export default TurnMemberView;

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import  {LinkContainer} from'react-router-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';


class UserTurnContainer extends Component {


  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const router = this.context.router;
    const turnRootUrl = `/user/${this.props.params.slug}`;
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <Nav bsStyle="pills" stacked>
              <LinkContainer to={`${turnRootUrl}/dashboard`}>
                <NavItem eventKey={1}>Irányítópult</NavItem>
              </LinkContainer>
              <hr/>
              <LinkContainer to={`${turnRootUrl}/signup-data`}>
                <NavItem eventKey={1}>Jelentkezési lap</NavItem>
              </LinkContainer>
              <LinkContainer to={`${turnRootUrl}/signup-test`}>
                <NavItem eventKey={2}>Kérdőív</NavItem>
              </LinkContainer>
              <LinkContainer to={`${turnRootUrl}/signup-statement`}>
                <NavItem eventKey={2}>Nyilatkozat</NavItem>
              </LinkContainer>
            </Nav>
          </div>
          <div className="col-sm-9">
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}

export default UserTurnContainer;

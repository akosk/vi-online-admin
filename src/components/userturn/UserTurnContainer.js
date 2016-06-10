import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {Nav, NavItem} from 'react-bootstrap';


class UserTurnContainer extends Component {


  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const router=this.context.router;
    const turnRootUrl=`/user/${this.props.params.slug}`;
    console.log (turnRootUrl);
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <Nav bsStyle="pills" stacked activeKey={1} >
              <NavItem eventKey={1} componentClass={Link} href={`${turnRootUrl}/signup-form`} to={`${turnRootUrl}/signup-data`}>Jelentkezési lap</NavItem>
              <NavItem eventKey={2} title="Item">Kérdőív</NavItem>
              <NavItem eventKey={2} title="Item">Nyilatkozat</NavItem>
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

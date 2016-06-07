import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import { Nav, Navbar, NavDropdown, NavItem, MenuItem, Button, Label, Breadcrumb } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

export class LayoutContainer extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
  };

  render() {
    const { isLoggedIn, logout, displayName, avatarUrl,  } = this.props;

    return (
      <div  >
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"> Online Admin</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {isLoggedIn &&
          <Nav pullRight style={{marginRight:30}}>
            <NavItem>&nbsp;<strong>{displayName}</strong> &nbsp;<img src={avatarUrl} style={{height:'45px'}}
                                                                     className="img-circle"/></NavItem>
          </Nav>
          }


          <Nav pullRight>
            {isLoggedIn &&
            <NavDropdown eventKey={4} title="ADMINISZTRÁCIÓ" id="nav-dropdown">
              <MenuItem eventKey="4.1" componentClass={Link} href="/users" to="/users"><span
                className="glyphicon glyphicon-user"></span> FELHASZNÁLÓK</MenuItem>
              <MenuItem eventKey="4.2" componentClass={Link} href="/turns" to="/turns"><span
                className="glyphicon glyphicon-list-alt"></span> TURNUSOK</MenuItem>
            </NavDropdown>
            }

            {isLoggedIn &&
            <NavItem eventKey={1} onClick={logout}>
              <span className="glyphicon glyphicon-log-out"></span> KIJELENTKEZÉS
            </NavItem>
            }
          </Nav>

        </Navbar>
        <div style={{backgroundColor:'white',paddingTop:28}} className="container">

          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    isLoggedIn: _.has(state, 'auth.user.uid'),
    avatarUrl: _.get(state, 'auth.user.photoURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.name', 'Unknown'),
  };
};

export default connect(mapStateToProps, authActions)(LayoutContainer);

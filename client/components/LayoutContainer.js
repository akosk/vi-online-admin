import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import _ from 'lodash';
import EasyTransition from 'react-easy-transition'

import { Nav, Navbar, NavDropdown, NavItem, MenuItem, Button, Label, Breadcrumb } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

import AdminTurnMenu from './AdminTurnMenu';

export class LayoutContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
  };

  logout() {
    this.props.logout();
    browserHistory.push('/');
  }

  render() {
    const { isLoggedIn, isAdmin, displayName, avatarUrl,  } = this.props;

    return (
      <div  >
        <Navbar style={{fontSize:"1.2em"}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"> <img src="/images/VI_Junior_tamoppal_DD.png" style={{height:60}}/></Link>
            </Navbar.Brand>
          </Navbar.Header>
          {isLoggedIn &&

          <Nav pullRight style={{marginRight:30}}>
            <NavItem>&nbsp;<strong><span className="glyphicon glyphicon-user"></span> {displayName}</strong> &nbsp;
            </NavItem>
            {isLoggedIn &&
            <NavItem eventKey={1} onClick={this.logout}>
              <span className="glyphicon glyphicon-log-out"></span>
            </NavItem>
            }
          </Nav>
          }

          <Nav pullRight>
            {isAdmin &&
            <NavDropdown eventKey={4} title={<span className="glyphicon glyphicon-cog"></span>} id="nav-dropdown">
              <MenuItem eventKey="4.1" componentClass={Link} href="/admin/users" to="/admin/users"><span
                className="glyphicon glyphicon-user"></span> FELHASZNÁLÓK</MenuItem>
              <MenuItem eventKey="4.2" componentClass={Link} href="/admin/turns" to="/admin/turns"><span
                className="glyphicon glyphicon-list-alt"></span> TURNUSOK</MenuItem>
              <hr/>
              <MenuItem eventKey="4.3" componentClass={Link} href="/admin/github" to="/admin/github"><span
                className="glyphicon glyphicon-tasks"></span> Fejlesztési feladatok</MenuItem>
            </NavDropdown>
            }
          </Nav>
          {isAdmin && <AdminTurnMenu/>}

        </Navbar>
        <div style={{backgroundColor:'white',paddingTop:28}} className="container">
          <EasyTransition
            path={location.pathname}
            initialStyle={{opacity: 0}}
            transition="opacity 0.3s ease-in"
            finalStyle={{opacity: 1}}
          >
            {this.props.children}
          </EasyTransition>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const defaultAvatarUrl = 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yL/r/HsTZSDw4avx.gif';
  return {
    isLoggedIn: _.has(state, 'auth.user.id'),
    isAdmin: _.get(state, 'auth.user.role') === 'admin',
    avatarUrl: _.get(state, 'auth.user.photoURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.name', 'Unknown'),
  };
};

export default connect(mapStateToProps, authActions)(LayoutContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import _ from 'lodash';
import EasyTransition from 'react-easy-transition';

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
      <div style={{backgroundColor:'white'}}>

        <div className="row" style={{marginBottom:28,paddingTop:14}}>
          <div className="col-sm-3 col-sm-offset-1">
            <img src="/images/VI_Junior_tamoppal_DD.png" style={{height:60}}/>
          </div>
        </div>


        <div className="row">
          <div className="col-sm-12">
          {this.props.children}
          </div>
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

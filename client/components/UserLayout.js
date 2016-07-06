import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import _ from 'lodash';
import EasyTransition from 'react-easy-transition';

import { Nav, Navbar, NavDropdown, NavItem, MenuItem, Button, Label, Breadcrumb } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

import TopLeft from './layout/TopLeft';
import Footer from './layout/Footer';
import TopNav from './layout/TopNav';
import AdminTurnMenu from './AdminTurnMenu';
import SideMenu from './SideMenu';

export class UserLayout extends Component {

  constructor(props, context) {
    super(props, context);
  }

  userMenu() {
    if (this.props.userturn.id) {
      const turnRootUrl = `/user/${this.props.currentTurn.slug}`;
      return [
        {
          name: "Jelentkezés",
          icon: "fa fa-hand-peace-o",
          items: [
            {
              name: 'Jelentkezési lap',
              url: `${turnRootUrl}/signup-data`,
            },
            {
              name: 'Kérdőív',
              url: `${turnRootUrl}/signup-test`,
            },
            {
              name: 'Nyilatkozatok',
              url: `${turnRootUrl}/signup-statement`,
            },
            {
              name: 'Véglegesítés',
              url: `${turnRootUrl}/signup-finalize`,
            }
          ]
        }
      ];
    }

    return [
      {
        name: "Jelentkezés",
        icon: "fa fa-hand-peace-o",
        items: [
          {
            name: 'Képzés választás',
            url: `/user/select-turn`,
          },
        ]
      }
    ];


  }

  adminMenu() {
    return [
      {
        name: "Törzsadatok",
        icon: "fa fa-hand-peace-o",
        items: [
          {
            name: 'Felhasználók',
            url: `/admin/users`,
          },
          {
            name: 'Turnusok',
            url: `/admin/turns`,
          },
        ]
      },
      {
        name: "Turnus",
        icon: "fa fa-mortar-board",
        items: [
          {
            name: 'Turnus felhasználói',
            url: `/admin/turnmembers`,
          }
        ]
      },
      {
        name: "Fejlesztés",
        icon: "fa fa-rocket",
        items: [
          {
            name: 'Feladatok',
            url: `/admin/github`,
          }
        ]
      }
    ];


  }



  render() {
    const { isLoggedIn, isAdmin, displayName, avatarUrl,  } = this.props;
    const menu = isAdmin ? this.adminMenu() : this.userMenu();
    return (
      <div>
        <div className="container body">
          <div className="main_container">
            <div className="col-md-3 left_col">
              <div className="left_col scroll-view">
                <TopLeft displayName={this.props.displayName}/>
                <SideMenu menu={menu}/>
              </div>
            </div>
            <TopNav displayName={this.props.displayName}/>
            <EasyTransition
              path={location.pathname}
              initialStyle={{opacity: 0}}
              transition="opacity 0.3s ease-in"
              finalStyle={{opacity: 1}}
            >
              {this.props.children}
            </EasyTransition>
            <Footer/>
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
    currentTurn: _.get(state, 'userturns.currentTurn', {}),
    userturn: _.get(state, 'userturns.userturn', {}),
    avatarUrl: _.get(state, 'auth.user.photoURL', defaultAvatarUrl),
    displayName: _.get(state, 'auth.user.name', 'Unknown'),
    turns: _.get(state, 'turns', []),
    selectedTurn: _.get(state, 'admin.turn', { name: "Válasszon turnust..." })
  };
};

export default connect(mapStateToProps, authActions)(UserLayout);



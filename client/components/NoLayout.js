import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

import { Nav, Navbar, NavDropdown, NavItem, MenuItem, Button, Label, Breadcrumb } from 'react-bootstrap';


export class NoLayout extends Component {




  render() {

    return (
      <div style={{

      backgroundColor:'white',
      height:'100%',
      minHeight:'100%'}}

      >

        <div className="col-sm-9 col-sm-offset-1">
            {this.props.children}
        </div>
      </div>
    );
  }
}



export default NoLayout;

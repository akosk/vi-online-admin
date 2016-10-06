import React, { Component } from 'react';
import {Nav, NavItem, NavDropdown} from 'react-bootstrap';
import  {LinkContainer} from 'react-router-bootstrap';
import Content from '../common/Content';
import * as actions from '../../actions';
import classnames from "classnames";

import { connect } from 'react-redux';
import _  from 'lodash';

class TurnMemberView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showAvatar: false
    }
  }


  componentDidMount() {
    this.props.loadUser(this.props.params.user_id).then(()=> {
        this.setState({
          showAvatar: true
        })
      }
    );
  }


  render() {
    const {user_id}=this.props.params;
    return (
      <Content category="Turnusok" title="Felhasználó adatlapja">
        <div className="row">
          <div className="col-sm-3">

            <div className="text-center">

              <img
                src={`https://robohash.org/${this.props.displayName}`}
                style={{height:100,width:'auto'}}
                className={classnames({
                   "img-circle":true,
                   "hidden":!this.state.showAvatar
                   }) }/>

              <h4> {this.props.displayName}</h4>
            </div>

            <hr/>

            <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect}>
              <LinkContainer to={`/admin/turnmembers/${user_id}/signup-data-1`}>
                <NavItem eventKey="1.1">Alapinformáció, vállalkozási alapfeltétel</NavItem>
              </LinkContainer>
              <LinkContainer to={`/admin/turnmembers/${user_id}/signup-data-2`}>
                <NavItem eventKey="1.2">Személyes adatok</NavItem>
              </LinkContainer>
              <LinkContainer to={`/admin/turnmembers/${user_id}/signup-data-3`}>
                <NavItem eventKey="1.3">Vállalkozástervezés</NavItem>
              </LinkContainer>
              <LinkContainer to={`/admin/turnmembers/${user_id}/signup-agreements`}>
                <NavItem eventKey="1.4">Nyilatkozat</NavItem>
              </LinkContainer>
              <LinkContainer to={`/admin/turnmembers/${user_id}/signup-finalize`}>
                <NavItem eventKey="1.5">Véglegesítés</NavItem>
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


import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Content from '../common/Content';


class UserTurnHomePage extends Component {
  render() {
    return (
      <Content title="Irányítópult">

        <h3 className="text-center">Üdvözöljük!</h3>

      </Content>
    );
  }
}

export default UserTurnHomePage;

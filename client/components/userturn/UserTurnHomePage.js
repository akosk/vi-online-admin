import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Content from '../common/Content';


class UserTurnHomePage extends Component {
  render() {
    return (
      <Content title="Irányítópult">

        <h3>TODO: A felhasználó itt láthatja, hogy hol jár a képzésben, mit tett eddig.</h3>

        <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis dicta dolorem ducimus facere, impedit labore maxime possimus unde. Aspernatur corporis ducimus eaque eos ex maiores provident ratione vero. Unde.</h4>
      </Content>
    );
  }
}

export default UserTurnHomePage;

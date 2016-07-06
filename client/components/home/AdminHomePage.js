import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Content from '../common/Content';

class AdminHomePage extends Component {

  // 1. Jelentkezett-e már turnusra?
  //  NEM->Ha nem, akkor a turnus választó jön be
  // 2. A turnus állapota oldal jön be

  render() {
    return (
      <Content category="Adminisztrációs felület" title="Napló">
        </Content>
    );
  }
}

export default AdminHomePage;

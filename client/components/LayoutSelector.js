import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import UserLayout from './UserLayout';
import LayoutContainer from './LayoutContainer';


class LayoutSelector extends Component {

  render() {
    if (this.props.isLoggedIn) {
      return (
        <UserLayout>
          {this.props.children}
        </UserLayout>
      );
    }
    return (
      <LayoutContainer>
        {this.props.children}
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: _.has(state, 'auth.user.id'),
    isAdmin: _.get(state, 'auth.user.role') === 'admin',
  };
};

export default connect(mapStateToProps, null)(LayoutSelector);

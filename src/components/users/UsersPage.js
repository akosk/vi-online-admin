import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/userActions';

class UsersPage extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


export default connect(null, actions)(UsersPage);

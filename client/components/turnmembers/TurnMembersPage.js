import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as actions from '../../actions/adminActions';

class TurnMembersPage extends Component {

  componentDidMount() {
    this.props.loadTurnMembers();
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default TurnMembersPage;

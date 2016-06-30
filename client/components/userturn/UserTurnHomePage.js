import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import FinalizeSignup from '../../components/userturn/signup/FinalizeSignup';


class UserTurnHomePage extends Component {
  render() {
    return (
      <div>
        <FinalizeSignup/>

      </div>
    );
  }
}

export default UserTurnHomePage;

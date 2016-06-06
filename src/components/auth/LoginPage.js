import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import {browserHistory} from 'react-router';

import Login from './Login';
import * as actionCreators from '../../action_creators';

class LoginPage extends Component {

  static propTypes = {
    authWithPopup: PropTypes.func.isRequired,
  };

  render() {
    const {authWithPopup}=this.props;
    return (
      <div>
        <Login loginButtonClickHandler={authWithPopup}/>


      </div>
    );
  }
}

export default connect(null, actionCreators)(LoginPage);

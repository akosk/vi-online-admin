import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import TestFiller from '../../test/TestFiller';


class SignupTestPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const {competency_test, user}=this.props;
    return (
      <div>
        <TestFiller
          test_id={competency_test.id}
          user={user}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: _.get(state, 'auth.user', {}),
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  competency_test: _.get(state, 'userturns.currentTurn.competency_test', {}),
});

export default connect(mapStateToProps, null)(SignupTestPage);

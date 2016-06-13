import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import TestFillerForm from './TestFillerForm';
import * as actions from '../../actions/';

class TestFiller extends Component {

  static propTypes = {
    test: PropTypes.object.isRequired,
    currentTurn: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      turn: {},
      errors: {},
      saving: false
    };

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.currentTurn.id != nextProps.currentTurn.id) {
      if (nextProps.currentTurn.competency_test) {
        this.props.loadUserSignupTest(this.props.user.id, nextProps.currentTurn.competency_test.id);
      }
    }
  }

  render() {
    return (
      <div>
        <TestFillerForm test={this.props.test}/>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  test: _.get(state, 'userturns.signupTest', {})
});

export default connect(mapStateToProps, actions)(TestFiller);

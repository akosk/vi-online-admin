import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestFiller from '../test/TestFiller';
import * as actions from '../../actions';
import _ from 'lodash';
class SignupTestView extends Component {

  componentDidMount() {
    this.props.loadUser(this.props.params.user_id);
  }

  render() {
    const {competency_test, user}=this.props;
    console.log('render',competency_test, user)
    return (
      <div>
        { competency_test.id &&
        <TestFiller
          test_id={competency_test.id}
          user={user}
          disabled={true}
        />
        }
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: _.get(state, 'userturns.user', {}),
  currentTurn: _.get(state, 'admin.turn', {}),
  competency_test: _.get(state, 'admin.turn.competency_test', {}),

});


export default connect(mapStateToProps, actions)(SignupTestView);

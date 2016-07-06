import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestFiller from '../test/TestFiller';
import * as actions from '../../actions';
import _ from 'lodash';
import ContentTitle from '../common/ContentTitle';

class SignupTestView extends Component {


  render() {
    const {competency_test, user}=this.props;
    console.log('render',competency_test, user);
    return (
      <div>
        <ContentTitle title="Kompetencia teszt"/>

        {competency_test.id &&
        <TestFiller
          test_id={competency_test.id}
          user={user}
          disabled
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Panel,Alert} from'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import Content from '../../common/Content';
import TestFiller from '../../test/TestFiller';
import * as actions from '../../../actions';
import * as progressTypes from '../../../../common/progressTypes';

class SignupTestPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.competency_test.id) {
      this.props.loadUserSignupTest(this.props.user.id, nextProps.competency_test.id, this.props.currentTurn.id);
    }

  }


  render() {
    const {competency_test, user, finalized}=this.props;
    const now = moment().valueOf();
    const open = competency_test.start_at <= now && competency_test.end_at >= now;
    return (
      <Content category="Jelentkezés" title="Kérdőív">
        {!open &&
        <Alert bsStyle="warning">
          <strong> A kérdőív jelenleg nem elérhető.</strong>
          <br/>
          A kérdőív {moment(competency_test.start_at).format("LLL")} - {moment(competency_test.end_at).format("LLL")}
          időpontok között lesz elérhető.

        </Alert>

        }
        {open &&
        <TestFiller
          test_id={competency_test.id}
          user={user}
          disabled={finalized ? true : false}
        />
        }
      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: _.get(state, 'auth.user', {}),
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  competency_test: _.get(state, 'userturns.currentTurn.competency_test', {}),
  finalized: _.has(state, `userturns.userturn.progress.${progressTypes.SIGNUP_FINALIZED}`, false)
});

export default connect(mapStateToProps, actions)(SignupTestPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Panel,Alert} from'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import TestFiller from '../../test/TestFiller';


class SignupTestPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const {competency_test, user, finalized}=this.props;
    const now = moment().valueOf();
    const open = competency_test.start_at <= now && competency_test.end_at >= now;
    return (
      <Panel className="panel-primary" header="Kérdőív">
        {!open &&
        <Alert bsStyle="warning">
          <strong> A teszt jelenleg nem elérhető.</strong>
          <br/>
          A teszt {moment(competency_test.start_at).format("LLL")} - {moment(competency_test.end_at).format("LLL")} időpontok között lesz elérhető.

        </Alert>

        }
        {open &&
        <TestFiller
          test_id={competency_test.id}
          user={user}
          disabled={finalized ? true : false}
        />
        }
      </Panel>
    );
  }
}

const mapStateToProps = (state)=>({
  user: _.get(state, 'auth.user', {}),
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  competency_test: _.get(state, 'userturns.currentTurn.competency_test', {}),
  finalized: _.get(state, 'userturns.userturn.progress.SIGNUP_COMPLETED', false)
});

export default connect(mapStateToProps, null)(SignupTestPage);

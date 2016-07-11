import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Panel, Button, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import toastr from 'toastr';
import _ from 'lodash';
import Content from '../../common/Content';

import * as progressTypes from '../../../../common/progressTypes';

import * as actions from '../../../actions';
class SignupFinalizePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.finalize = this.finalize.bind(this);
  }

  finalize(event) {
    const {progress}=this.props;
    let errors=[];

    if (!progress[progressTypes.SIGNUP_DATA_SAVED]) {
      errors.push('A jelentkezési lap még nincs kitöltve.');
    }
    if (!progress[progressTypes.SIGNUP_DATA_VALID]) {
      errors.push('A jelentkezési lap hiányos.');
    }
    if (!progress[progressTypes.SIGNUP_TEST_SAVED]) {
      errors.push('A kérdőív nincs kitöltve.');
    }
    if (!progress[progressTypes.SIGNUP_TEST_VALID]) {
      errors.push('A kérdőív hiányos.');
    }

    if (!progress[progressTypes.SIGNUP_STATEMENT_UPLOADED]) {
      errors.push('Az aláírt nyilatkozat nincs feltöltve.');
    }
    if (!progress[progressTypes.SIGNUP_STATEMENT_VALID]) {
      errors.push('Az aláírt nyilatkozat még nincs elfogadva.');
    }

    if (!progress[progressTypes.SIGNUP_AGREEMENTS_ACCEPTED]) {
      errors.push('Az egyéb nyilatkozatok nincsennek elfogadva.');
    }

    if (errors.length>0) {
      this.setState({errors});
      return;
    }
    this.props.finalizeSignup(this.props.user.id, this.props.userturn.turn_id)
        .then((errors)=>{
          this.setState({errors});
        });
  }


  render() {
    return (
      <Content category="Jelentkezés" title="Jelentkezés véglegesítése">

          {(!this.props.signupCompleted && !this.props.signupFinalized) &&
          <div style={{marginBottom:24}}>
              <h2> A jelentkezés véglegesítése előtt kérjük végezze el az alábbiakat:</h2>
            <ol>
              <li>Töltse ki a jelentkezési lapot.</li>
              <li>Töltse ki a kérdőívet.</li>
              <li>Töltse fel az aláírt jelentkezési nyilatkozatot.</li>
              <li>Fogadja el a nyilatkozatokat.</li>
            </ol>

            <div className="text-center">
              <Button onClick={this.finalize} bsStyle="warning" bsSize="large">Jelentkezés véglegesítése</Button>
            </div>
          </div>
          }

          {(this.props.signupFinalized && !this.props.signupCompleted) &&
          <Alert bsStyle="warning">
            A jelentkezés véglegesítéséhez még az adminisztrátor jóváhagyására is szükség van. Térjen vissza később.
          </Alert>
          }

          {(this.props.signupCompleted) &&
          <Alert bsStyle="success">
            A jelentkezés véglegesítése megtörtént!
          </Alert>
          }

          {(this.state.errors) &&
          <Alert bsStyle="danger">
            <ul>
              {this.state.errors.map((error)=><li key={error}>{error}</li>)}
            </ul>
          </Alert>
          }

      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  userturn: _.get(state, 'userturns.userturn', null),
  progress: _.get(state, 'userturns.userturn.progress', {}),
  signupFinalized: _.get(state, 'userturns.userturn.progress.SIGNUP_FINALIZED', null),
  signupCompleted: _.get(state, 'userturns.userturn.progress.SIGNUP_COMPLETED', null)

});

export default connect(mapStateToProps, actions)(SignupFinalizePage);

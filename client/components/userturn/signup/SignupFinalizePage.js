import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Panel, Button, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import toastr from 'toastr';
import _ from 'lodash';
import Content from '../../common/Content';
import classnames from 'classnames';

import * as progressTypes from '../../../../common/progressTypes';
import {validateSignupFinalize} from '../../../../common/validation';

import * as actions from '../../../actions';


const getIcon = (valid)=> <i className={classnames({
                  'fa': true,
                  'fa-check': valid,
                  'fa-times': !valid,
                  'text-success': valid,
                  'text-danger': !valid
                })} aria-hidden="true"></i>;


class SignupFinalizePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.finalize = this.finalize.bind(this);
  }

  finalize(event) {
    const {progress}=this.props;

    const errors=validateSignupFinalize(progress);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    this.props.finalizeSignup(this.props.user.id, this.props.userturn.turn_id)
        .then((errors)=> {
          this.setState({ errors });
        });
  }


  render() {
    const turnRootUrl = `/user/${this.props.currentTurn.slug}`;

    const data1Valid = _.get(this.props.userturn, `progress.${progressTypes.SIGNUP_DATA1_VALID}`);
    const data2Valid = _.get(this.props.userturn, `progress.${progressTypes.SIGNUP_DATA2_VALID}`);
    const data3Valid = _.get(this.props.userturn, `progress.${progressTypes.SIGNUP_DATA3_VALID}`);
    const data4Valid = _.get(this.props.userturn, `progress.${progressTypes.SIGNUP_AGREEMENTS_ACCEPTED}`);

    return (
      <Content category="Jelentkezés" title="Jelentkezés véglegesítése">

        {(!this.props.signupCompleted && !this.props.signupFinalized) &&
        <div style={{marginBottom:24}}>
          <h2> A jelentkezés véglegesítése előtt kérjük végezze el az alábbiakat:</h2>
          <ol>
            <li>Töltse ki az <Link to={`${turnRootUrl}/signup-data-1`}> alapinformációk, vállalkozási
              alapfeltételek</Link> űrlapot.
              {getIcon(data1Valid)}
            </li>
            <li>Töltse ki a <Link to={`${turnRootUrl}/signup-data-2`}> személyes adatok</Link> űrlapot.
              {getIcon(data2Valid)}
            </li>
            <li>Töltse ki a <Link to={`${turnRootUrl}/signup-data-3`}>vállalkozástervezés</Link> űrlapot.
              {getIcon(data3Valid)}
            </li>
            <li>Fogadja el a <Link to={`${turnRootUrl}/signup-agreements`}>nyilatkozatokat </Link>.
              {getIcon(data4Valid)}
            </li>
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
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  userturn: _.get(state, 'userturns.userturn', null),
  progress: _.get(state, 'userturns.userturn.progress', {}),
  signupFinalized: _.get(state, 'userturns.userturn.progress.SIGNUP_FINALIZED', null),
  signupCompleted: _.get(state, 'userturns.userturn.progress.SIGNUP_COMPLETED', null)

});

export default connect(mapStateToProps, actions)(SignupFinalizePage);

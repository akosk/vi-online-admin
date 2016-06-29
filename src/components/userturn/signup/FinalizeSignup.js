import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Panel, Button, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import toastr from 'toastr';
import _ from 'lodash';

import * as actions from '../../../actions';


class FinalizeSignup extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.finalize = this.finalize.bind(this);
  }

  finalize(event) {
    this.props.finalizeSignup(this.props.user.id, this.props.userturn.turn_id)
    .then((errors)=>{
      this.setState({errors})
    });
  }


  render() {
    return (
      <div>

        <Panel bsStyle="primary" header="Jelentkezés">
          {(!this.props.signupCompleted) &&
          <div style={{marginBottom:24}}>
            <Alert bsStyle="info">
              A jelentkezés véglegesítése előtt kérjük végezze el az alábbiakat!
            </Alert>
            <p><Label>1</Label> Töltse ki a jelentkezési lapot.</p>
            <p><Label>2</Label> Töltse ki a kérdőívet.</p>
            <p><Label>3</Label> Töltse fel az aláírt nyilatkozatot.</p>

            <div className="text-center">
              <Button onClick={this.finalize} bsStyle="warning" bsSize="large">Jelentkezés véglegesítése</Button>
            </div>
          </div>
          }

          {(this.props.signupCompleted) &&
            <Alert bsStyle="success">
              A jelentkezés véglegesítése megtörtént!
            </Alert>
          }

          {(this.state.errors) &&
            <Alert bsStyle="danger">
              <ul>
              {this.state.errors.map((error)=><li>{error}</li>)}
              </ul>
            </Alert>
          }
        </Panel>

      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  userturn: _.get(state, 'userturns.userturn', null),
  signupCompleted: _.get(state, 'userturns.userturn.progress.SIGNUP_COMPLETED', null)

});

export default connect(mapStateToProps, actions)(FinalizeSignup);

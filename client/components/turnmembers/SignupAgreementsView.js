import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestFiller from '../test/TestFiller';
import * as actions from '../../actions';
import _ from 'lodash';
import {Checkbox} from 'react-bootstrap';
import ContentTitle from '../common/ContentTitle';
import toastr from 'toastr';
import * as progressTypes from '../../../common/progressTypes';

import log from '../../utils/logger';

class SignupAgreementsView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { checked: false };
  }

  componentDidMount() {
    if (this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    log('next',nextProps);
    if (nextProps.currentTurn.id !== this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, nextProps.currentTurn.id);
    }
  }

  render() {
    return (
      <div>
        <ContentTitle title="Egyéb nyilatkozatok"/>

        <div >
          <Checkbox checked={this.props.progress[progressTypes.SIGNUP_AGREEMENTS_ACCEPTED]!==undefined}>
            <strong>Elfogadom a lenti nyilatkozatokat</strong>
          </Checkbox>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  currentTurn: _.get(state, 'admin.turn', {}),
  progress: _.get(state, 'userturns.userturn.progress', {}),
  user: _.get(state, 'userturns.user', {}),
});


export default connect(mapStateToProps, actions)(SignupAgreementsView);

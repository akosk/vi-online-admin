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

class SignupFinalizeView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { checked: false };
    this.onAcceptClick = this.onAcceptClick.bind(this);
  }

  componentDidMount() {
    if (this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id)
          .then((turn)=> {
            this.setState({
              checked: this.props.userturn.progress[progressTypes.SIGNUP_COMPLETED]
            });
          });
    }
  }

  componentWillReceiveProps(nextProps) {
    log('next', nextProps, this.props);
    if (nextProps.currentTurn.id !== this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, nextProps.currentTurn.id)
          .then((turn)=> {
            this.setState({
              checked: this.props.userturn.progress[progressTypes.SIGNUP_COMPLETED]
            });
          });


    }
  }

  onAcceptClick(e) {

    if (e.target.checked) {
      this.props.setProgress(this.props.userturn.id, progressTypes.SIGNUP_COMPLETED)
          .then(()=> {
            return this.props.removeProgress(this.props.userturn.id, progressTypes.SIGNUP_REJECTED);
          })
          .then(()=> {
            toastr.success('A jelentkezés elfogadva.');
          })
          .then(()=> {
            this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id);
          });
      this.setState({ checked: true });
    } else {
      this.props.removeProgress(this.props.userturn.id, progressTypes.SIGNUP_COMPLETED)
          .then(()=> {
            return this.props.setProgress(this.props.userturn.id, progressTypes.SIGNUP_REJECTED);
          })
          .then(()=> {
            toastr.success('A nyilatkozat elutasítva.');
          })
          .then(()=> {
            this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id);
          });
      this.setState({ checked: false });
    }
  }

  render() {
    return (
      <div>


        <ContentTitle title="Véglegesítés"/>
        {this.props.progress[progressTypes.SIGNUP_FINALIZED] &&
        < div >
          < div className="alert alert-success">
            <strong >A jelentkezési kérelem
              {this.props.userturn.progress[progressTypes.SIGNUP_COMPLETED]?' elfogadva': ' elküldve'}.

            </strong>
          </div>
          <br/>
          <div>
            <Checkbox onClick={this.onAcceptClick} checked={this.state.checked}>
              Jelentkezés elfogadva
            </Checkbox>
          </div>
        </div>
        }


      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  currentTurn: _.get(state, 'admin.turn', {}),
  userturn: _.get(state, 'userturns.userturn', {}),
  progress: _.get(state, 'userturns.userturn.progress', {}),
  user: _.get(state, 'userturns.user', {}),
});


export default connect(mapStateToProps, actions)(SignupFinalizeView);

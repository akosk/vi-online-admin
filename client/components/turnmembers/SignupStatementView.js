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

class SignupStatementView extends Component {

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
              checked: this.props.userturn.progress[progressTypes.SIGNUP_STATEMENT_VALID]
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
              checked: this.props.userturn.progress[progressTypes.SIGNUP_STATEMENT_VALID]
            });
          });


    }
  }

  onAcceptClick(e) {

    if (e.target.checked) {
      this.props.acceptSignupStatement(this.props.userturn.id)
          .then(()=> {
            toastr.success('A nyilatkozat elfogadva.');
          })
          .then(()=> {
            this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id);
          });
      this.setState({ checked: true });
    } else {
      this.props.removeProgress(this.props.userturn.id, progressTypes.SIGNUP_STATEMENT_VALID)
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
        <ContentTitle title="Jelentkezési nyilatkozat"/>

        {this.props.file &&
        <div>
          <div className="alert alert-success">
            <strong >A jelentkezési nyilatkozat feltöltve.</strong>
          </div>
          <a href={`/statements/${this.props.file}`} target="_blank"> <span
            className="glyphicon glyphicon-download"></span> A feltöltött nyilatkozat letöltéséhez kattintson ide.</a>
          <br/>
          <br/>
          <div>
            <Checkbox onClick={this.onAcceptClick} checked={this.state.checked}>
              Jelentkezési nyilatkozat elfogadása
            </Checkbox>
          </div>
        </div>


        }

        {!this.props.file &&
        <div className="alert alert-danger">
          <strong >A jelentkezési nyilatkozat még nincs feltöltve.</strong>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  file: _.get(state, 'userturns.userturn.signup_statement_file', null),
  currentTurn: _.get(state, 'admin.turn', {}),
  userturn: _.get(state, 'userturns.userturn', {}),
  user: _.get(state, 'userturns.user', {}),
});


export default connect(mapStateToProps, actions)(SignupStatementView);

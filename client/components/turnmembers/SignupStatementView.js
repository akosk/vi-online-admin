import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestFiller from '../test/TestFiller';
import * as actions from '../../actions';
import _ from 'lodash';
class SignupStatementView extends Component {

  componentDidMount() {
    if (this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, this.props.currentTurn.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('next',nextProps,this.props);
    if (nextProps.currentTurn.id!== this.props.currentTurn.id) {
      this.props.getUserTurn(this.props.params.user_id, nextProps.currentTurn.id);

    }
  }

  render() {
    return (
      <div>
        { this.props.file &&
        <div className="alert alert-success">
          <strong >A jelentkezési nyilatkozat feltöltve.</strong>
          <br/>
          <a href={`/statements/${this.props.file}`}> A feltöltött nyilatkozat letöltéséhez kattintson ide.</a>
        </div>
        }

        { !this.props.file &&
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
  user: _.get(state, 'userturns.user', {}),
});


export default connect(mapStateToProps, actions)(SignupStatementView);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import toastr from 'toastr'

import TestFillerForm from './TestFillerForm';
import * as actions from '../../actions/';

class TestFiller extends Component {

  static propTypes = {
    test: PropTypes.object.isRequired,
    currentTurn: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      test: {},
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.currentTurn.id != nextProps.currentTurn.id) {
      if (nextProps.currentTurn.competency_test) {
        this.props.loadUserSignupTest(this.props.user.id, nextProps.currentTurn.competency_test.id);
      }
    }
    if (this.props.test.test_id != nextProps.test.test_id) {
      this.state.test = _.cloneDeep(nextProps.test)
    }
  }

  onChange(event) {
    const field = event.target.name;
    let test = this.state.test;

    let question = _.find(test.questions, q=>q.id == field);

    switch (event.target.type) {
      case 'checkbox':
        question.value = event.target.checked;
        break;
      case 'select-one':
        question.value = event.target.value;
        break;
      default:
        question.value = event.target.value;
    }

    this.setState({ test: test });

  }

  onSave(event) {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.saveUserTest(this.state.test)
        .then(() => {
          toastr.success('A kérdőív elmentve');
        })
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  render() {
    return (
      <div>
        <TestFillerForm
          test={this.state.test}
          onChange={this.onChange}
          onSave={this.onSave}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  test: _.get(state, 'userturns.signupTest', {})
});

export default connect(mapStateToProps, actions)(TestFiller);

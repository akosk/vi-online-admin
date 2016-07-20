import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import toastr from 'toastr';

import log from '../../utils/logger';

import TestFillerForm from './TestFillerForm';
import * as actions from '../../actions/';

class TestFiller extends Component {

  static propTypes = {
    test: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    disabled: PropTypes.bool
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

  componentDidMount() {

    this.props.loadUserSignupTest(this.props.user.id, this.props.test_id, this.props.turn_id)
        .then((test)=> {
          this.setState({ test: _.cloneDeep(test) });
        });
  }


  onChange(event) {
    if (this.props.disabled) return;

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
        .then(() => {
          this.props.getUserTurn(this.props.user.id, this.props.turn_id);
          this.setState({ saving: false });
        })
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  render() {
    log('d', this.props.disabled);
    return (
      <div>
        <TestFillerForm
          test={this.state.test}
          onChange={this.onChange}
          onSave={this.onSave}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  test: _.get(state, 'userturns.signupTest', {}),
  turn_id: _.get(state, 'userturns.currentTurn.id', '')
});

export default connect(mapStateToProps, actions)(TestFiller);

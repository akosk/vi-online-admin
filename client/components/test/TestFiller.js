import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import toastr from 'toastr';

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

  componentWillMount() {

    this.props.loadUserSignupTest(this.props.user.id, this.props.test_id);
    this.state.test = _.cloneDeep(this.props.test);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.test.test_id != nextProps.test.test_id) {
      this.state.test = _.cloneDeep(nextProps.test);
    }


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
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  test: _.get(state, 'userturns.signupTest', {})
});

export default connect(mapStateToProps, actions)(TestFiller);

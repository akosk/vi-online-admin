import React, { Component, PropTypes } from 'react';
import toastr from 'toastr';
import {browserHistory} from 'react-router';
import _ from 'lodash';

class SignupDataBase extends Component {


  componentWillMount() {
    this.props.getSignupDataByUserId(this.props.user.id).then(()=> {

    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.signupData.id !== _.get(nextProps, 'signupData.id')) {
      this.setState({
        signupData: _.cloneDeep(
          {
            ...this.state.signupData,
            ...nextProps.signupData
          }),
        errors: this.validator(nextProps.signupData)
      });
    }
  }

  saveSignupData = (event)=> {
    const btnName=event.target.name;
    event.preventDefault();

    this.setState({ saving: true });

    this.props.saveSignupData({ ...this.state.signupData, turn_id: this.props.userturn.turn_id })
        .then(() => {
          this.props.getUserTurn(this.props.user.id, this.props.userturn.turn_id);
          toastr.success('A mentés sikeresen megtörtént.');
          this.setState({ saving: false });
          if (btnName==='next') {
            browserHistory.push(this.nextUrl);
          } else {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          }
        })
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  updateSignupDataState = (event, component)=> {
    if (this.props.finalized) return;
    let signupData = this.state.signupData;
    let keyName = null;

    if (component) {
      // If component is daterangepicker
      const field = event.target.attributes.name.value;
      keyName=field;
      if (component.singleDatePicker) {
        signupData[field] = component.startDate.valueOf();
      } else {
        signupData[field].start_at = component.startDate.valueOf();
        signupData[field].end_at = component.endDate.valueOf();
      }
    } else {
      const field = event.target.name;
      keyName = field.split('.')[0];
      switch (event.target.type) {
        case 'radio':
          _.set(signupData, event.target.name, event.target.value);
          break;
        case 'checkbox':
          _.set(signupData, field, event.target.checked);
          break;
        case 'select-one':
          signupData[field] = event.target.value;
          break;
        default:
          _.set(signupData, field, event.target.value);
      }
    }

    // It's Validate all errors but
    // only add error for the current component
    const errors = this.validator(signupData);
    const newError = _.set({}, keyName, errors[keyName]);
    return this.setState({
      signupData: signupData,
      errors: {
        ...this.state.errors,
        ...newError
      }
    });
  }
}

export default SignupDataBase;

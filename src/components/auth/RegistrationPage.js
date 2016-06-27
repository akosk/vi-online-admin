import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {HelpBlock, Form, Panel, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import toastr from 'toastr';

import {validateEmail} from '../../utils/validationHelper';
import RegistrationForm from './RegistrationForm';
import * as actions from '../../actions/userActions';


class RegistrationPage extends Component {

  static propTypes = {
    saveRegistration: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        name: '',
        email: '',
        password: ''
      },
      errors: {},
      saving: false
    };

    this.updateRegistrationState = this.updateRegistrationState.bind(this);
    this.saveRegistration = this.saveRegistration.bind(this);
  }

  registrationFormIsValid() {
    const user = this.state.user;
    let formIsValid = true;
    let errors = {};

    if (user.name.length < 5) {
      errors.name = 'A névnek legalább 5 karakternek kell lennie.';
      formIsValid = false;
    }

    if (!validateEmail(user.email)) {
      errors.email = 'Érvénytelen email cím.';
      formIsValid = false;
    }

    if (user.password.length < 6) {
      errors.password = 'A jelszónak legalább 6 karakternek kell lennie.';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  updateRegistrationState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user: user });
  }


  saveRegistration(event) {
    event.preventDefault();

    if (!this.registrationFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    this.props.saveRegistration(this.state.user)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Sikeres regisztráció');
    this.context.router.push('/login');
  }

  render() {
    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3">
          <Panel className="panel-primary" header="Regisztráció">
            <RegistrationForm
              onChange={this.updateRegistrationState}
              onSave={this.saveRegistration}
              registration={this.state.user}
              errors={this.state.errors}
              saving={this.state.saving}
            />

          </Panel>
        </div>

      </div>
    );
  }
}


export default connect(null, actions)(RegistrationPage);

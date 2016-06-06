import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import { Panel } from 'react-bootstrap';
import toastr from 'toastr';

import LoginForm from './LoginForm';
import * as actions from '../../actions/authActions';

class LoginPage extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      login: {
        name: '',
        password: ''
      },
      errors: {},
      saving: false
    };

    this.updateLoginState = this.updateLoginState.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }



  updateLoginState(event) {
    const field = event.target.name;
    let login = this.state.login;
    login[field] = event.target.value;
    return this.setState({ login: login });
  }


  onLogin(event) {
    event.preventDefault();


    this.setState({ saving: true });

    this.props.login(this.state.login)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({
            email:'',
            password:'',
            saving: false
          });
        });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Sikeres bejelentkezés');
    this.context.router.push('/dashboard');
  }



  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <Panel className="panel-primary" header='Bejelentkezés'>
          <LoginForm
            onChange={this.updateLoginState}
            onLogin={this.onLogin}
            login={this.state.login}
            errors={this.state.errors}
            saving={this.state.saving}
          />

        </Panel>

      </div>
    );
  }
}

export default connect(null, actions)(LoginPage);



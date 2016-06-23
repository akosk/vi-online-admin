import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import { Panel } from 'react-bootstrap';
import toastr from 'toastr';

import LoginForm from './LoginForm';
import * as actions from '../../actions';

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
        //email: 'admin@admin.hu',
        email: 'akos.kiszely@gmail.com',
        password: 'start123',

        //password: 'start123'
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
            email: '',
            password: '',
            saving: false
          });
        });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Sikeres bejelentkezés');
    if (this.props.user.role === 'admin') {
      this.context.router.push('/admin');
    }
    if (this.props.user.role === 'user') {
      this.props.getCurrentTurn(this.props.user.id)
          .then(()=> {
              if (this.props.currentTurn) {
                this.context.router.push(`/user/${this.props.currentTurn.slug}/dashboard`);
              } else {
                this.context.router.push('/user/select-turn');
              }
            }
          );
    }
  }


  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <Panel className="panel-primary" header="Bejelentkezés">
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

const mapStateToProps = (state)=>({
  user: state.auth.user,
  currentTurn: state.userturns.currentTurn
});

export default connect(mapStateToProps, actions)(LoginPage);



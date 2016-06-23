import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Panel} from 'react-bootstrap';
import toastr from 'toastr';
import _ from 'lodash';

import * as actions from '../../actions/userActions';
import {validateEmail} from '../../utils/validationHelper';
import UserForm from './UserForm';

class ManageUserPage extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    saveUser: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: { ...props.user },
      errors: {},
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.cancel = this.cancel.bind(this);
    this.cancel = this.cancel.bind(this);
  }


  componentDidMount() {
    this.props.loadUsers();
  }


  userFormIsValid() {
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


    this.setState({ errors: errors });
    return formIsValid;
  }


  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.checked;
    if (event.target.type==='checkbox') {
      user[field] = event.target.checked;
    } else {
      user[field] = event.target.value;
    }
    return this.setState({ user: user });
  }


  saveUser(event) {
    event.preventDefault();

    if (!this.userFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    this.props.saveUser(this.state.user)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  cancel(event) {
    event.preventDefault();
    this.context.router.push('/admin/users');
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('A módosítás sikeresen megtörtént');
    this.context.router.push('/admin/users');
  }

  render() {
    return (
      <Panel className="panel-primary" header={(
        <span>
        Felhasználó szerkesztése
        </span>
        )}>
        <UserForm
          onChange={this.updateUserState}
          onSave={this.saveUser}
          onCancel={this.cancel}
          user={this.state.user}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </Panel>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const userId = ownProps.params.id;
  let user = { id: '', name: '', email: '', password: '' };

  if (userId && state.users.length > 0) {
    user = _.find(state.users, { id: userId });
  }

  return {
    user
  };
}


export default connect(mapStateToProps, actions)(ManageUserPage);

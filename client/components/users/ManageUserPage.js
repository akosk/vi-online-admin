import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Panel} from 'react-bootstrap';
import toastr from 'toastr';
import _ from 'lodash';

import Content from '../common/Content';
import * as actions from '../../actions';
import {validateEmail} from '../../utils/validationHelper';
import UserForm from './UserForm';

class ManageUserPage extends Component {

  static propTypes = {
    saveUser: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        name:'',
        role:'',
        email:'',
        blocked:false
      },
      errors: {},
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.cancel = this.cancel.bind(this);
    this.cancel = this.cancel.bind(this);
  }


  componentDidMount() {
    this.props.loadUser(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.id!==this.state.user.id) {
      this.setState({user:_.cloneDeep(nextProps.user)});
    }
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
    if (event.target.type === 'checkbox') {
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
    this.setState({id:null});
    this.setState({ saving: false });
    toastr.success('A módosítás sikeresen megtörtént');
    this.context.router.push('/admin/users');
  }

  render() {
    return (
      <Content  category="Törzsadatok" title="Felhasználó szerkesztése">
        <UserForm
          onChange={this.updateUserState}
          onSave={this.saveUser}
          onCancel={this.cancel}
          user={this.state.user}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </Content>
    );
  }
}


function mapStateToProps(state, ownProps) {

  return {
    user: _.get(state,'userturns.user',{})
  };
}


export default connect(mapStateToProps, actions)(ManageUserPage);

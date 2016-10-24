import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SignupDataBase from './SignupDataBase';
import SignupData2Form from './SignupData2Form';
import {isSignup2HasErrors} from '../../../../common/validation';
import * as actions from '../../../actions';
import Content from '../../common/Content';
import * as progressTypes from '../../../../common/progressTypes';

class SignupData2Page extends SignupDataBase {

  constructor(props, context) {
    super(props, context);
    this.nextUrl=`/user/${this.props.slug}/signup-data-3`;
    this.validator=isSignup2HasErrors;

    this.state = {
      signupData: {
        name: props.user.name,
        birth_name: '',
        gender:{},
        birth_date: Date.now(),
        birth_category: '',
        birth_place: '',
        mothers_name: '',
        permanent_address_zip: '',
        permanent_address_settlement: '',
        permanent_address_street: '',
        temporary_address: '',
        postal_address: '',
        phone: '',
        email: props.user.email,
        legmagasabb_iskolai_vegzettseg: '',
        legmagasabb_iskolai_vegzettseg_eve: '',
        allaskeresokent_regisztralt: {},
        allaskeresokent_regisztralt_datuma: Date.now(),
        allaskeresokent_regisztralt_telepules: '',
        palyakezdo_allaskereso: {},
        adoazonosito_jel: '',
        taj: '',
        kisebbsegi_vagy_hatranyos:{}
      },
      errors: {},
      saving: false
    };

  }


  render() {
    return (
      <Content category="Jelentkezés" title="Személyes adatok">
        <SignupData2Form
          currentTurn={this.props.currentTurn}
          onChange={this.updateSignupDataState}
          onSave={this.saveSignupData}
          signupData={this.state.signupData}
          finalized={this.props.finalized}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  signupData: _.get(state, 'userturns.signupData', {}),
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  userturn: _.get(state, 'userturns.userturn', false),
  finalized: _.has(state, `userturns.userturn.progress.${progressTypes.SIGNUP_FINALIZED}`)
});

export default connect(mapStateToProps, actions)(SignupData2Page);

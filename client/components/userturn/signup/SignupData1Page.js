import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SignupDataBase from './SignupDataBase';
import SignupData1Form from './SignupData1Form';
import {isSignup1HasErrors} from '../../../../common/validation';
import * as actions from '../../../actions';
import Content from '../../common/Content';
import * as progressTypes from '../../../../common/progressTypes';

class SignupData1Page extends SignupDataBase {

  constructor(props, context) {
    super(props, context);

    this.validator=isSignup1HasErrors;
    this.state = {
      signupData: {
        honnan_ertesult: {},
        tobbsegi_tulajdon_mas_vallalkozasban: '',
        vezeto_tisztsegviselo_mas_vallalkozasban: '',
        korabban_vallalkozo: '',
        vallalkozas_szekhelye_megye: '',
        vallalkozas_szekhelye_telepules: '',
        kepzes_helye: '',
        alternativ_kepzes_helye: ''

      },
      errors: {},
      saving: false
    };
  }


  render() {
    return (
      <Content category="Jelentkezés" title="Alapinformáció, vállalkozási alapfeltétel">
        <SignupData1Form
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
  userturn: _.get(state, 'userturns.userturn', false),
  finalized: _.has(state, `userturns.userturn.progress.${progressTypes.SIGNUP_FINALIZED}`)
});

export default connect(mapStateToProps, actions)(SignupData1Page);

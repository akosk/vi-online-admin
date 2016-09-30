import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SignupDataBase from './SignupDataBase';
import SignupData3Form from './SignupData3Form';
import {isSignup3HasErrors} from '../../../../common/validation';
import * as actions from '../../../actions';
import Content from '../../common/Content';
import * as progressTypes from '../../../../common/progressTypes';

class SignupData3Page extends SignupDataBase {

  constructor(props, context) {
    super(props, context);
    this.nextUrl=`/user/${this.props.slug}/signup-agreements`;
    this.validator=isSignup3HasErrors;

    this.state = {
      signupData: {
        miert_szeretne_vallalkozast_inditani:'',
        mivel_foglalkozik_a_vallalkozas:'',
        piackutatast_vegzett:{},
        piackutatast_vegzett_bemutatas:'',
        vallalkozas_formaja:{},
        vallalkozas_szektora:{},
        kivel_vallalkozik:{},
        elso_12_honapban_alkalmazottat_vesz_fel:{},
        harmadik_evben_hany_alkalmazott_lesz:'',
        vallalkozast_legalabb_4_evig_fenntartja:{},
        vallalkozast_legalább_4_evig_mukodteti:{}
      },
      errors: {},
      saving: false
    };

  }


  render() {
    console.log('errors>>>',this.state.errors);
    return (
      <Content category="Jelentkezés" title="Vállalkozástervezés">
        <SignupData3Form
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

export default connect(mapStateToProps, actions)(SignupData3Page);

import React, { Component } from 'react';
import SignupDataViewBase from './SignupDataViewBase';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignupData2View extends SignupDataViewBase {
  constructor(props,context) {
    super(props,context);
    this.title="Személyes adatok";
    this.schemaId=4;
  }
}

const mapStateToProps = (state)=>({
  signupData: _.cloneDeep(_.get(state, 'userturns.signupData', {})),
});

export default connect(mapStateToProps, actions)(SignupData2View);


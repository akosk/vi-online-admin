import React, { Component } from 'react';
import SignupDataViewBase from './SignupDataViewBase';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _  from 'lodash';

class SignupData3View extends SignupDataViewBase {
  constructor(props,context) {
    super(props,context);
    this.title="Vállalkozástervezés";
    this.schemaId=5;
  }
}

const mapStateToProps = (state)=>({
  signupData: _.cloneDeep(_.get(state, 'userturns.signupData', {})),
});

export default connect(mapStateToProps, actions)(SignupData3View);


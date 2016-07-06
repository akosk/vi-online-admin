import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupDataForm from '../userturn/signup/SignupDataForm';
import * as actions from '../../actions';
import _ from 'lodash';

import ContentTitle from '../common/ContentTitle';

class SignupDataView extends Component {

  componentDidMount() {
    this.props.getSignupDataByUserId(this.props.params.user_id);
  }

  render() {
    return (
      <div>
        <ContentTitle title="Jelentkezési lap"/>

        <SignupDataForm
          onChange={()=>{}}
          onSave={()=>{}}
          signupData={this.props.signupData}
          finalized
          errors={{}}
          saving={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  signupData: _.get(state, 'userturns.signupData', {}),
});


export default connect(mapStateToProps, actions)(SignupDataView);

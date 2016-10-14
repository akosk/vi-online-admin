import React, { Component } from 'react';
import {schema} from '../../../common/filterSchema';
import _ from 'lodash';
import ContentTitle from '../common/ContentTitle';
import Scorer from '../common/Scorer';

class SignupDataViewBase extends Component {

  componentDidMount() {
    this.props.getSignupDataByUserId(this.props.params.user_id);
  }

  onSetScore = (key, score)=> {
    this.props.setSignupDataScore(key, score);
  };

  render() {
    return (
      <div>
        <ContentTitle title={this.title}/>

        <Scorer
          data={this.props.signupData}
          schema={_.find(schema, i=> i.id == this.schemaId)}
          onSetScore={this.onSetScore}
        />

      </div>
    );
  }
}

export default SignupDataViewBase;


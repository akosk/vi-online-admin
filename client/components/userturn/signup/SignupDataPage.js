import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import toastr from 'toastr';
import _ from 'lodash';

import SignupDataForm from './SignupDataForm';
import * as actions from '../../../actions';
import Content from '../../common/Content';

class SignupDataPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      signupData: {
        name: this.props.user.name,
        vallalkozas_szekhelye: '',
        tobbsegi_tulajdon_mas_vallalkozasban: '0',
        birth_name: '',
        birth_date: 644796000000,
        birth_place: 'Miskolc',
        mothers_name: '',
        permanent_address: '',
        temporary_address: '',
        postal_address: '',
        phone: '',
        email: this.props.user.email,
        legmagasabb_iskolai_vegzettseg: '',
        legmagasabb_iskolai_vegzettseg_eve: '',
        allaskeresokent_regisztralt: '',
        allaskeresokent_regisztralt_datuma: '',
        palyakezdo_allaskereso: '',
        adoazonosito_jel: '',

      },
      errors: {},
      saving: false
    };
    this.updateSignupDataState = this.updateSignupDataState.bind(this);
    this.saveSignupData = this.saveSignupData.bind(this);
  }

  componentWillMount() {
    this.props.getSignupDataByUserId(this.props.user.id).then(()=> {

    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.signupData.id !== _.get(nextProps, 'signupData.id')) {
      this.setState({
        signupData: _.cloneDeep(nextProps.signupData)
      });
    }
  }

  updateSignupDataState(event, component) {
    if (this.props.finalized) return;
    let signupData = this.state.signupData;

    if (component) {
      // If component is daterangepicker
      const field = event.target.attributes.name.value;
      if (component.singleDatePicker) {
        signupData[field] = component.startDate.valueOf();
      } else {
        signupData[field].start_at = component.startDate.valueOf();
        signupData[field].end_at = component.endDate.valueOf();
      }
    } else {

      const field = event.target.name;
      switch (event.target.type) {
        case 'checkbox':
          signupData[field] = event.target.checked;
          break;
        case 'select-one':
          signupData[field] = event.target.value;
          break;
        default:
          signupData[field] = event.target.value;
      }
    }
    return this.setState({ signupData: signupData });
  }


  saveSignupData(event) {
    event.preventDefault();

    this.setState({ saving: true });

    this.props.saveSignupData(this.state.signupData)
        .then(() => {
          toastr.success('A jelentkezési lap elmentve');
          this.setState({ saving: false });
        })
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  render() {
    return (
      <Content category="Jelentkezés" title="Jelentkezési lap">
          <SignupDataForm
            onChange={this.updateSignupDataState}
            onSave={this.saveSignupData}
            signupData={this.state.signupData}
            finalized={this.state.finalized}
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
  finalized: _.get(state, 'userturns.userturn.progress.SIGNUP_COMPLETED', false)
});

export default connect(mapStateToProps, actions)(SignupDataPage);

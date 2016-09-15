import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getValues} from 'redux-form';
import toastr from 'toastr';
import log from '../../utils/logger';
import _ from 'lodash';
import Content from '../common/Content';

import ChangePasswordForm from './ChangePasswordForm';
import * as actions from '../../actions';


class ChangePasswordPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {

  }

  onCancel =(e)=>{
    e.preventDefault();
    this.context.router.push('/');
  }

  onSaveSettings = (values, dispatch)=> {
    const id = this.props.params.id;
    return this.props.changePassword({ id, ...values })
               .then(()=> toastr.success('A jelszó módosítása megtörtént'))
               .catch(err=>toastr.error(err))
  };

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3" style={{marginTop:48,marginBottom:800}}>
        <Content title="Jelszó változtatás">
          <ChangePasswordForm
            oldPasswordVisible={false}
            onSave={this.onSaveSettings}
            onCancel={this.onCancel}
            saving={false}
          />

        </Content>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, actions)(ChangePasswordPage);



import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getValues} from 'redux-form';
import toastr from 'toastr';
import log from '../../utils/logger';
import _ from 'lodash';
import Content from '../common/Content';

import SettingsForm from './SettingsForm';
import * as actions from '../../actions';

class SettingsPage extends Component {

  componentWillMount() {
    this.props.loadPortalSettings();
  }

  onSaveSettings = (values, dispatch)=> {
     return this.props.savePortalSettings({...this.props.settings,...values})
                .then(()=> toastr.success('A beállítások mentése megtörtént'))
                .catch(err=>toastr.error('A beállítások mentése sikertelen'))
  };

  render() {
    return (
      <Content category="Portál" title="Beállítások">
        <SettingsForm
          onSave={this.onSaveSettings}
          onCancel={(e)=> {e.preventDefault()}}
          saving={false}
        />

      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: _.get(state, 'admin.portal.settings', {})
  };
};

export default connect(mapStateToProps, actions)(SettingsPage);

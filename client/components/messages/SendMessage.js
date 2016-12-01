import React, {Component} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';

import * as actions from '../../actions';
import SendMessageForm from './SendMessageForm';
import {reset} from 'redux-form';

class SendMessage extends Component {

  onSaveSettings = (values, dispatch)=> {
    const data = {
      userturn_id: this.props.userturn.id,
      category: this.props.category,
      ...values
    };

    return this.props.sendMessage(data)
               .then(()=> toastr.success('Az üzenet elküldve'))
               .then(()=>{
                 dispatch(reset('send-message'));
               })
               .catch(err=>toastr.error(err));
  };


  render() {
    return (
      <div>
        <SendMessageForm
          onSave={this.onSaveSettings}
          saving={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, actions)(SendMessage);

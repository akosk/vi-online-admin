import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import toastr from 'toastr';
import _ from 'lodash';

import * as actions from '../../../actions';


class SignupStatementPage extends Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      files: []
    };

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  upload(event) {
    event.preventDefault();
    const data = new FormData();

    data.append('file', this.state.files[0]);
    data.append('user_id', this.props.user.id);

    this.props.uploadSignupStatement(data)
        .then(function (res) {
          toastr.success('A fájl feltöltése megtörtént.');
        })
        .catch(function (err) {
          toastr.error(err.data);
        });


  }

  onDrop(files) {
    this.setState({ files });
  }

  render() {
    let filePreview = null;
    if (this.state.files.length > 0) {
      filePreview = <img className="img-thumbnail" src={this.state.files[0].preview}/>;
    }
    return (
      <div>
        { this.props.file &&
        <Panel className="panel-success text-center" header="A nyilatkozat feltöltve">
          <a href={`/statements/${this.props.file}`}> A feltöltött nyilatkozat letöltéséhez kattintson ide.</a>
        </Panel>
        }
        <Panel className="panel-primary text-center" header="Kitöltendő nyilatkozat letöltése">
          <a href="/files/nyilatkozat.pdf"> Kattintson ide a nyilatkozat letöltéséhez.</a>
        </Panel>
        <Panel className="panel-primary text-center" header="Nyilatkozat feltöltése">
          <div className="row">
            <div className="col-sm-6">
              <Dropzone onDrop={this.onDrop}>
                <div style={{margin:10}}>Húzd ide a feltölteni kívánt fájlt, vagy klikkelj ide a fájl kiválasztásához.
                </div>
              </Dropzone>

            </div>
            <div className="col-sm-6">
              {filePreview}
            </div>
          </div>
          {filePreview &&
          <div><Button onClick={this.upload} className="btn btn-primary">Feltölt</Button></div>
          }

        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  file: _.get(state, 'userturns.userturn.signupStatementFileName', null)
});

export default connect(mapStateToProps, actions)(SignupStatementPage);

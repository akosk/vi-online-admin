import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import toastr from 'toastr';
import _ from 'lodash';

import * as progressTypes from '../../../../common/progressTypes';
import Content from '../../common/Content';
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

  componentDidMount() {
    this.props.getSignupStatement(this.props.user.id, this.props.currentTurn.id);
  }

  upload(event) {
    event.preventDefault();
    const data = new FormData();

    data.append('file', this.state.files[0]);
    data.append('user_id', this.props.user.id);

    this.props.uploadSignupStatement(data)
        .then((res)=> {
          toastr.success('A fájl feltöltése megtörtént.');
          this.props.getUserTurn(this.props.user.id, this.props.currentTurn.id);
          this.setState({ saving: false });
        })
        .catch((err)=> {
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

    console.log('f', this.props.finalized);
    return (
      <Content category="Jelentkezés" title="Jelentkezési nyilatkozat">


        <div style={{marginTop:24,marginBottom:24}}>
          <h2>
            <a href="/files/nyilatkozat.pdf"> <span className="glyphicon glyphicon-download"></span> Kattintson ide a
              kitöltendő nyilatkozat letöltéséhez.</a>
          </h2>
          {this.props.file &&
          <h2><a href={`/statements/${this.props.file}`}><span className="glyphicon glyphicon-download"></span> A
            feltöltött nyilatkozat letöltéséhez kattintson ide.</a></h2>
          }
        </div>


        <div>

          {this.props.file &&
          <div className="alert alert-success">
            <h2><strong >A jelentkezési nyilatkozat
              {this.props.completed?' elfogadva':' feltöltve'}.
            </strong></h2>

          </div>
          }

          {!this.props.finalized && !this.props.completed &&
          <div>
            <div className="row well">
              <div className="col-sm-6 ">
                <Dropzone onDrop={this.onDrop}>
                  <div style={{margin:10}}>Húzza ide a feltölteni kívánt fájlt, vagy klikkeljen ide a fájl
                    kiválasztásához.
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
          </div>
          }


        </div>


      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  userturn: _.get(state, 'userturns.userturn', {}),
  file: _.get(state, 'userturns.userturn.signup_statement_file', null),
  progress: _.get(state, 'userturns.userturn.progress', {}),
  finalized: _.has(state, `userturns.userturn.progress.${progressTypes.SIGNUP_FINALIZED}`, false),
  completed: _.has(state, `userturns.userturn.progress.${progressTypes.SIGNUP_COMPLETED}`, false)
});

export default connect(mapStateToProps, actions)(SignupStatementPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Panel} from 'react-bootstrap';
import moment from 'moment';
import toastr from 'toastr';
import _ from 'lodash';

import * as actions from '../../actions';
import {checkboxToTextFormatter} from'../../utils/formatters';
import Content from '../common/Content';

class SelectTurnPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
    this.signUpToTurn = this.signUpToTurn.bind(this);
  }

  signUpToTurn() {
    this.setState({ saving: true });
    this.props.signUpToTurn(this.props.user, this.props.turn)
        .then(()=> {
            toastr.success('A jelentkezés sikeres');
            this.redirect();
          }
        ).catch(error => {
      toastr.error(error);
      this.setState({ saving: false });
    });
  }

  redirect() {
    this.setState({ saving: false });
    this.context.router.push(`/user/${this.props.slug}/signup-finalize`);
  }

  componentDidMount() {
    this.props.loadTurns();
  }

  render() {
    const {turn}=this.props;
    return (
      <Content category="Jelentkezés" title="Képzés kiválasztása">


        {turn.id &&

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <Panel className="panel" header={turn.name}>
              <table className="table table-bordered">
                <tbody>
                <tr>
                  <th >Kezdés időpontja</th>
                  <td>{moment(turn.start_at).format('LL').toString()}</td>
                </tr>
                <tr>
                  <th >Aktív</th>
                  <td>{checkboxToTextFormatter(turn.active)}</td>
                </tr>
                </tbody>
              </table>

              <div className="text-center">
                <button className="btn btn-primary" onClick={this.signUpToTurn}>Jelentkezek a képzésre</button>
              </div>
            </Panel>
          </div>
        </div>
        }




      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  turn: state.turns[0] || {},
  slug: _.get(state, 'userturns.currentTurn.slug','')
});

export default connect(mapStateToProps, actions)(SelectTurnPage);

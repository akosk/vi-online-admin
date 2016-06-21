import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Panel} from 'react-bootstrap';
import moment from 'moment';
import toastr from 'toastr';
import _ from 'lodash';

import * as actions from '../../actions';
import {checkboxToTextFormatter} from'../../utils/formatters';

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
    this.context.router.push(`/user/${this.props.slug}`);
  }

  componentDidMount() {
    this.props.loadTurns();
  }

  render() {
    const {turn}=this.props;
    return (
      <div>

        <div className="text-center">
          <h2>Jelentkezés</h2>
        </div>
        <div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at corporis dolor, fuga molestiae
            possimus quod reprehenderit? Dolorum explicabo magnam, non nostrum obcaecati quis recusandae! Aliquam animi
            at natus quidem.
          </div>
          <div>Ab accusantium aliquid aperiam, eaque ex expedita facilis, fuga harum hic illum iure laboriosam maiores
            minima modi molestiae nam natus, nisi quam quas quia quo rerum temporibus totam veniam voluptate?
          </div>
          <div>Alias at consequatur corporis cumque debitis deleniti deserunt, dolores eos ipsa iste laudantium mollitia
            nam nisi nulla odit perferendis quaerat quia quisquam reiciendis, reprehenderit sapiente totam unde veniam
            vitae voluptates.
          </div>
        </div>

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




      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  turn: state.turns[0] || {},
  slug: _.get(state, 'userturns.currentTurn.slug','')
});

export default connect(mapStateToProps, actions)(SelectTurnPage);

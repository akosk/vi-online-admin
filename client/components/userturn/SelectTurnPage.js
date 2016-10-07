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
import TurnView from './TurnView';

class SelectTurnPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  signUpToTurn = (turn)=> {
    this.setState({ saving: true });
    this.props.signUpToTurn(this.props.user, turn)
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
    this.props.getCurrentTurn(this.props.user.id).then((x)=> {
      return this.props.loadTurns();
    });

  }

  render() {
    const {activeTurns}=this.props;
    return (
      <Content category="Jelentkezés" title="Turnus kiválasztása">


        {!this.props.currentTurn.id && activeTurns.map(turn=>
          <TurnView
            key={turn.id}
            turn={turn}
            signUpToTurn={this.signUpToTurn}
          />
        )}

        {this.props.currentTurn.id &&
        <div className="text-center">
          <div className="alert alert-info">
            <h2>Ön már választott korábban képzést.</h2>
          </div>
          <Link to="">
            <span className="btn btn-primary">Tovább a képzésemre</span>
          </Link>
        </div>
        }

      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  turns: state.turns || [],
  activeTurns: state.turns.filter((t)=> {
    return t.active && t.turn_start_at <= Date.now();
  }),
  slug: _.get(state, 'userturns.currentTurn.slug', ''),
  currentTurn: _.get(state, 'userturns.currentTurn', {})
});

export default connect(mapStateToProps, actions)(SelectTurnPage);

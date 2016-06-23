import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Panel} from 'react-bootstrap';
import toastr from 'toastr';
import _ from 'lodash';

import {slugify} from '../../utils/textUtils';
import * as actions from '../../actions/';
import {validateEmail} from '../../utils/validationHelper';
import TurnForm from './TurnForm';

class ManageTurnPage extends Component {

  static propTypes = {
    turn: PropTypes.object.isRequired,
    saveTurn: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      turn: { ...props.turn },
      errors: {},
      saving: false
    };

    this.updateTurnState = this.updateTurnState.bind(this);
    this.saveTurn = this.saveTurn.bind(this);
    this.cancel = this.cancel.bind(this);
    this.cancel = this.cancel.bind(this);
  }


  componentDidMount() {
    this.props.loadTurns();
    this.props.loadTests();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.turn.id != nextProps.turn.id) {
      this.setState({turn: Object.assign({}, nextProps.turn)});
    }
  }


  turnFormIsValid() {
    const turn = this.state.turn;
    let formIsValid = true;
    let errors = {};

    if (turn.name.length < 5) {
      errors.name = 'A névnek legalább 5 karakternek kell lennie.';
      formIsValid = false;
    }

    if (turn.slug.length < 5) {
      errors.slug = 'A slug-nak legalább 5 karakternek kell lennie.';
      formIsValid = false;
    }


    this.setState({ errors: errors });
    return formIsValid;
  }


  updateTurnState(event, component) {
    let turn = this.state.turn;
    if (component) {
      // If component is daterangepicker
      const field =event.target.attributes.name.value;
      if (component.singleDatePicker) {
        turn[field] = component.startDate.valueOf();
      } else {
        turn[field].start_at = component.startDate.valueOf();
        turn[field].end_at = component.endDate.valueOf();
      }
    } else {
      // If component is input
      const field = event.target.name;
      if (event.target.type === 'checkbox') {
        turn[field] = event.target.checked;
      } else {
        turn[field] = event.target.value;
      }

      if (field === 'name') {
        turn.slug = slugify(turn.name);
      }
    }
    return this.setState({ turn: turn });
  }


  saveTurn(event) {
    event.preventDefault();
    if (!this.turnFormIsValid()) {

      return;
    }

    this.setState({ saving: true });

    this.props.saveTurn(this.state.turn)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({ saving: false });
        });
  }

  cancel(event) {
    event.preventDefault();
    this.context.router.push('/admin/turns');
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('A módosítás sikeresen megtörtént');
    this.context.router.push('/admin/turns');
  }

  render() {
    return (
      <Panel className="panel-primary" header={(
        <span>
        Turnus szerkesztése
        </span>
        )}>
        <TurnForm
          onChange={this.updateTurnState}
          onSave={this.saveTurn}
          onCancel={this.cancel}
          turn={this.state.turn}
          tests={this.props.tests}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </Panel>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const turnId = ownProps.params.id;
  let turn = {
    name: '', slug: '', active: false,
    start_at:Date.now(),
    competency_test:{
    }
  };

  if (turnId && state.turns.length > 0) {
    turn = _.find(state.turns, { id: turnId });
  }

  return {
    turn:_.cloneDeep(turn),
    tests:state.tests.map(item=>({value:item.id, text:item.name}))
  };
}


export default connect(mapStateToProps, actions)(ManageTurnPage);

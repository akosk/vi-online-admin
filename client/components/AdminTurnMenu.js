import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Panel, Badge, Button,MenuItem ,Nav,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router';

import * as actions from '../actions';

class AdminTurnMenu extends Component {

  constructor(props, context) {
    super(props, context);
    this.selectTurn = this.selectTurn.bind(this);
  }

  componentWillMount() {
    if (!this.props.turn) {
      this.props.loadTurns()
          .then(()=> {
            if (this.props.turns.length>0) {
              this.props.adminSelectTurn(this.props.turns[0]);
            }
          });
    }
  }

  selectTurn(id, e) {
    const turn = _.find(this.props.turns, (turn)=>turn.id === id);
    this.props.adminSelectTurn(turn);
  }

  render() {
    const { turns,selectedTurn } = this.props;
    return (
      <Nav pullRight>

        <NavDropdown eventKey={5} title={<span className="glyphicon glyphicon-list-alt"></span>} id="nav-dropdown">

          <NavDropdown eventKey={5} title={selectedTurn.name} id="nav-dropdown">

            {turns.map((turn)=>
              <MenuItem eventKey={turn.id} key={turn.id} onSelect={this.selectTurn}>{turn.name}</MenuItem>
            )
            }
          </NavDropdown>


          {selectedTurn.id && <hr/>}
          {selectedTurn.id &&
          <MenuItem eventKey="4.1" componentClass={Link} href="/admin/turnmembers" to="/admin/turnmembers"><span
            className="glyphicon glyphicon-user"></span> TURNUS FELHASZNÁLÓI</MenuItem>
          }
        </NavDropdown>
      </Nav>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    turns: _.get(state, 'turns', []),
    selectedTurn: _.get(state, 'admin.turn', { name: "Válasszon turnust..." })
  };
};

export default connect(mapStateToProps, actions)(AdminTurnMenu);


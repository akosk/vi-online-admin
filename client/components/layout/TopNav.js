import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import TopNavDropDown from '../layout/TopNavDropDown';
import * as actions from '../../actions';
import _ from 'lodash';

class TopNav extends Component {

  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
    this.selectTurn = this.selectTurn.bind(this);
  }


  componentWillMount() {
    if (!this.props.turn) {
      this.props.loadTurns()
          .then(()=> {
            if (this.props.turns.length > 0) {
              this.props.adminSelectTurn(this.props.turns[0]);
            }
          });
    }
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/');
  }

  selectTurn(id, e) {
    console.log(id);
    const turn = _.find(this.props.turns, (turn)=>turn.id === id);
    this.props.adminSelectTurn(turn);
  }

  render() {

    let items = [];
    if (this.props.turns.length > 0) items = this.props.turns.map((turn)=> {
      return {
        id: turn.id,
        name: turn.name
      };
    });
    console.log(items);
    return (
      <div className="top_nav">
        <div className="nav_menu">
          <nav className="" role="navigation">
            <div className="nav toggle">
              <a id="menu_toggle"><i className="fa fa-bars"></i></a>
            </div>

            <ul className="nav navbar-nav navbar-right">

              <li><a href="" onClick={this.logout}><span className=" fa fa-sign-out "></span> </a></li>

              <li className="">
                <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown"
                   aria-expanded="false">
                  <span className=" fa fa-user"></span> {this.props.displayName}
                </a>
                <ul className="dropdown-menu dropdown-usermenu pull-right">
                  <li><a href="javascript:;"> Profile</a></li>
                  <li>
                    <a href="javascript:;">
                      <span className="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li><a href="javascript:;">Help</a></li>
                </ul>
              </li>

              <TopNavDropDown
                items={items}
                onSelect={this.selectTurn}
                selectedName={this.props.selectedTurn.name}/>

            </ul>
          </nav>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayName: _.get(state, 'auth.user.name', 'Unknown'),
    turns: _.get(state, 'turns', []),
    selectedTurn: _.get(state, 'admin.turn', { name: "Válasszon turnust..." })
  };
};


export default connect(mapStateToProps, actions)(TopNav);

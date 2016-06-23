import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import  {LinkContainer} from'react-router-bootstrap';
import {Nav, NavItem,Panel} from 'react-bootstrap';
import _ from 'lodash';


class UserTurnContainer extends Component {


  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const router = this.context.router;
    const turnRootUrl = `/user/${this.props.params.slug}`;

    const ready = <span className="glyphicon glyphicon-ok" style={{fontSize:'1.4em',marginRight:12}}></span>


    return (
      <div>
        <div className="row">
          <div className="col-sm-3">

            <Nav bsStyle="pills" stacked>
              <LinkContainer to={`${turnRootUrl}/dashboard`}>
                <NavItem eventKey={1}>Irányítópult</NavItem>
              </LinkContainer>
            </Nav>

            <hr/>

              <Nav bsStyle="pills" stacked>
                <LinkContainer to={`${turnRootUrl}/signup-data`}>
                  <NavItem eventKey={1}>
                    {this.props.progress.SIGNUP_COMPLETED && ready}
                    Jelentkezési lap
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={`${turnRootUrl}/signup-test`}>
                  <NavItem eventKey={2}>
                    {this.props.progress.SIGNUP_COMPLETED && ready}
                    Kérdőív
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={`${turnRootUrl}/signup-statement`}>
                  <NavItem eventKey={2}>
                    {this.props.progress.SIGNUP_COMPLETED && ready}
                    Nyilatkozat
                  </NavItem>
                </LinkContainer>
              </Nav>

          </div>
          <div className="col-sm-9">
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    progress: _.get(state, 'userturns.userturn.progress', {}),
  };
};

export default connect(mapStateToProps, null)(UserTurnContainer);

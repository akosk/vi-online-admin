import React, { Component, PropTypes } from 'react';

import {Link} from "react-router";
import {Jumbotron} from "react-bootstrap";


class NotFoundRoutePage extends Component {


  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <Jumbotron style={{backgroundColor:"white"}}>
            <h1 style={{color:"#f44336", fontSize:"150px",margin:0,padding:0}}>404</h1>
            <h3><strong>Az oldal nem található.</strong></h3>
            <h4 className="text-muted text-justify">Nagyon sajnáljuk, de a keresett oldal nem létezik, vagy megváltozott a címe.</h4>
            <div style={{marginTop:36}}>
              <Link to="/" className="btn-lg btn-primary">Vissza a főoldalra</Link>
            </div>

          </Jumbotron>
        </div>
        <div className="col-sm-6" >
          <img  src="/images/sad.png" style={{}} alt=""/>
        </div>
      </div>

    );
  }
}

export default NotFoundRoutePage;

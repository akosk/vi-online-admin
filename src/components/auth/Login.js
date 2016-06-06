import React, { PropTypes, Component } from 'react';
import { Panel,Button  } from 'react-bootstrap';

const Login = ({loginButtonClickHandler}) => {
  return (
    <Panel style={{textAlign:'center'}}>
      <h3 style={{marginBottom:28}}>A program használatához tessék bejelentkezni a Facebook fiókkal.</h3>
      <p><Button onClick={loginButtonClickHandler} bsStyle="primary">
        <span className="glyphicon glyphicon-log-in"></span> Bejelentkezés Facebook-al</Button></p>

      <img src="/images/bag1.jpg" style={{ maxHeight: '300px' }}/>
    </Panel>
  );
};

Login.propTypes = {
  loginButtonClickHandler: PropTypes.func.isRequired,
};

export default Login;

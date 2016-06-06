import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router';


class HomePage extends Component {


  render() {
    return (
      <div>
        <Jumbotron>
          <h2>Üdv, kedves jövőbeni vállalkozó!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eius esse exercitationem illum modi sint, ullam vel velit! Dolorum ipsum iusto laboriosam nobis placeat quos repellat repudiandae tempore temporibus voluptatum?</p>
          <p><Link to="/login"> <Button bsStyle="primary">Bejelentezés</Button></Link></p>
          <p><Link to="/registration"> <Button bsStyle="primary">Regisztráció</Button></Link></p>
        </Jumbotron>

      </div>
    );
  }
}

export default HomePage;

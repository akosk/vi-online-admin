import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import toastr from 'toastr';
import _ from 'lodash';

import * as progressTypes from '../../../../common/progressTypes';
import Content from '../../common/Content';
import * as actions from '../../../actions';


class SignupStatementPage extends Component {


  constructor(props, context) {
    super(props, context);


    this.onAcceptStatementsChange = this.onAcceptStatementsChange.bind(this);
  }

  componentDidMount() {
    this.props.getSignupStatement(this.props.user.id, this.props.currentTurn.id);
  }


  onAcceptStatementsChange(e) {
    e.preventDefault();
    if (this.props.progress[progressTypes.SIGNUP_AGREEMENTS_ACCEPTED]) return;

    this.props.acceptSignupStatements(
      this.props.userturn.id)
        .then(()=> {
          toastr.success('A nyilatkozat elfogadása megtörtént.');
        })
        .catch(()=> {
          toastr.error('A nyilatkozat elfogadása sikertelen, próbálja újra!');
        });
  }


  render() {
    return (
      <Content category="Jelentkezés" title="Egyéb nyilatkozatok">


        <div>






          <div >
            <Checkbox checked={this.props.progress[progressTypes.SIGNUP_AGREEMENTS_ACCEPTED]!==undefined}
                      onChange={this.onAcceptStatementsChange}>
              <strong>Elfogadom a lenti nyilatkozatokat</strong>
            </Checkbox>
          </div>


          <div className="well well-small"><h4>1. sz. nyilatkozat</h4>


            <p className="text-block"><br/>Felelősségem tudatában nyilatkozom, hogy a TÁMOP-2.3.6.A programban való
              részvételi
              feltételeket megismertem és tudomásul veszem.<br/><br/>

              A jelentkezési feltételeknek a Támogatási Szerződés megkötésekor megfelelek, azaz<br/>
              1) 18. életévemet már betöltöm, de a 35. életévemet még nem, <b>vagy</b><br/>
              A fenti időpontban 0-6 éves kisgyermeket nevelek, a 18. életévemet már betöltöm, de a 40. életévemet még
              nem.<br/>
              2) A fenti időpontban más vállalkozásban többségi tulajdonnal nem rendelkezem.

              <br/><br/>A programban való részvételi feltételeknek való megfelelésről a Támogatási Szerződés
              megkötésekor –
              <u>amely várhatóan 2013. 11. 01. és 2014. 07. 31. közötti időtartamra fog esni</u>
              -
              írásban, büntetőjogi felelősség
              mellett ismételten nyilatkozni kell.<br/><br/>
            </p>


          </div>

          <div className="well well-small">
            <h4>2. sz. nyilatkozat</h4>

            <p className="text-block"><br/>A TÁMOP-2.3.6.B-12/1. konstrukcióra pályázatot benyújtó vállalkozást
              létrehozó,
              valamint a
              - TÁMOP-2.3.6.A-12/1.
              konstrukcióban képzésen résztvevő - természetes személy részvételi feltételeiről

              <br/><br/>Felelősségem tudatában kijelentem, hogy a TÁMOP-2.3.6.A-12/1. konstrukció keretében
              meghirdetett
              <u>képzésre
                jelentkezéskor</u> az alábbi feltételeknek megfelelek:<br/><br/>
            </p>
            <ul>
              <li>B. pont: Pályázók köre</li>
              <li>B1. pont: Jogi forma</li>
              <li>B2. pont: Méret</li>
              <li>B3. pont: Székhely</li>
              <li>B4. pont: Iparág</li>
              <li>B6. pont: A pályázat benyújtásának feltételei és Támogatói Okirat kiadására vonatkozó kizáró okok
                továbbá a fenti pontokba foglalt feltételeket, kikötéseket, és korlátozásokat magamra, illetve
                az általam képviselt szervezetre nézve kötelezőnek ismerem el, illetve kijelentem, hogy az
                abban foglalt feltételeknek és kikötéseknek az általam képviselt szervezet megfelel, és biztosítom,
                hogy a támogatási jogviszony fennállásának teljes időtartama alatt megfeleljen;<br/>
              </li>
            </ul>

          </div>


          <div className="well well-small">
            <h4>3. sz. Adatvédelmi nyilatkozat</h4>

            <p className="text-block"><br/>A Fiatal Vállalkozók Országos Szövetsége számára kiemelt fontosságú cél az
              Ügyfelei által

              rendelkezésére bocsátott személyes adatok védelme, a felhasználók információs önrendelkezési

              jogának biztosítása. A Fiatal Vállalkozók Országos Szövetsége Ügyfelei személyes adatait

              bizalmasan, a hatályos jogszabályi előírásokkal összhangban kezeli, gondoskodik azok

              biztonságáról, megteszi azokat a technikai és szervezési intézkedéseket, amelyek a vonatkozó

              jogszabályi rendelkezések érvényre juttatásához szükségesek.

              Az adatkezelés nyilvántartási száma: NAIH-66446/2013.<br/><br/>
            </p>
          </div>
        </div>

      </Content>
    );
  }
}

const mapStateToProps = (state)=>({
  user: state.auth.user,
  currentTurn: _.get(state, 'userturns.currentTurn', {}),
  userturn: _.get(state, 'userturns.userturn', {}),
  progress: _.get(state, 'userturns.userturn.progress', {})
});

export default connect(mapStateToProps, actions)(SignupStatementPage);

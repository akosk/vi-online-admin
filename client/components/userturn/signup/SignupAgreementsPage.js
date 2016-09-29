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


          <div className="well well-small"><h4>Adatkezelési nyilatkozat</h4>


            <p className="text-block">
              A Fiatal Vállalkozók Országos Szövetsége (továbbiakban FIVOSZ), és Konzorciumi Partnerei számára kiemelt fontosságú cél az Ügyfelei által rendelkezésére bocsátott személyes adatok védelme, a felhasználók információs önrendelkezési jogának biztosítása. A FIVOSZ Konzorciuma Ügyfelei személyes adatait bizalmasan, a hatályos jogszabályi előírásokkal összhangban kezeli, gondoskodik azok biztonságáról, megteszi azokat a technikai és szervezési intézkedéseket, amelyek a vonatkozó jogszabályi rendelkezések érvényre juttatásához szükségesek.
              A FIVOSZ adatkezelés nyilvántartási száma: NAIH-66446/2013.
            </p>

            <p className="text-block">
              Az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény 5. § (1) bekezdés a) pontja alapján hozzájárulok, hogy a FIVOSZ és Konzorciumi Partnerei a jelentkezési lapon szereplő, és a későbbiekben megadandó személyes adataimat a GINOP-5.2.2-14-2015-00020 „Vállalkozz Itthon Junior - Fiatalok vállalkozóvá válásának támogatása” című program keretében felhasználja, tárolja, illetve a pályázatot kezelő felettes szervek számára az ellenőrzések során, illetve kérés esetén betekintésre hozzáférhetővé tegye.
            </p>

            <p className="text-block">
              A fent megadott adatok változását 8 napon belül bejelentem a www.vallalkozzitthonjunior.hu felületen megadott e-mailes elérhetőségen.
            </p>


          </div>

          <div className="well well-small">
            <h4>Részvételi feltételek</h4>

            <p className="text-block">
              Felelősségem tudatában nyilatkozom, hogy a GINOP-5.2.2 programban való részvételi feltételeket megismertem és tudomásul veszem, különös tekintettel az alábbiakra:
            </p>
            <p className="text-block">
              A jelentkezési feltételeknek a Támogatási Szerződés megkötésének tervezett időpontjában
              előreláthatóan megfelelek, azaz
              <ol>
                <li>18. életévemet már betöltöm, de a 30. életévemet még nem</li>
                <li>A fenti időpontban más vállalkozásban közvetlen vagy közvetett többségi befolyást biztosító részesedéssel nem rendelkezem, illetve más vállalkozásnak egyedüli vagy többségi tulajdonosa nem vagyok, más vállalkozásban nem töltök be vezető tisztségviselői posztot.</li>
                <li>Cégalapításra jogosult vagyok, továbbá nincs folyamatban semmi olyan eljárás, amelynek eredményeképpen ne lehetnék jogosult célalapításra.</li>
              </ol>
            </p>
            <p className="text-block">
              Vállalom, hogy:
              <ol>
                <li>A GINOP-5.2.3-16 konstrukcióban támogatott vállalkozásomban személyes közreműködőként részt veszek. (Személyes közreműködés a gazdasági társaság valamely tevékenységi körének megvalósításában való személyes, tagi részvételt jelenti.)</li>
                <li>Mindent megteszek annak érdekében, hogy a vállalkozás fenntartását a fenti projekt lebonyolítását követő legalább 3 évig biztosítsam</li>
                <li>Vállalkozásommal kapcsolatban a FIVOSZ Konzorcium felé fennáló adatszolgáltatási kötelezettségemet vállalkozásom sikeres nyomonkövetése érdekében teljesítem a vállalkozás megalapítását követő négy évig
                  Tudomásul veszem, hogy a programban való részvételi feltételeknek való megfelelésről a Támogatási Szerződés megkötésekor írásban, büntetőjogi felelősség mellett ismételten nyilatkoznom kell.</li>
              </ol>
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

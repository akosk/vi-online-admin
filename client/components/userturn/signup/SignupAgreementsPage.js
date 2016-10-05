import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Checkbox } from 'react-bootstrap';
import { Link} from 'react-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import toastr from 'toastr';
import _ from 'lodash';


import * as progressTypes from '../../../../common/progressTypes';
import Content from '../../common/Content';
import TextAreaInput from '../../common/TextAreaInput';
import * as actions from '../../../actions';


class SignupStatementPage extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      megjegyzes: this.props.userturn.agreement_note || ''
    };

    this.saveNote = _.throttle(
      this.saveNote.bind(this)
      , 1000);
  }

  componentDidMount() {
    this.props.getSignupStatement(this.props.user.id, this.props.currentTurn.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userturn.agreement_note !== this.state.megjegyzes) {
      this.setState({
        megjegyzes: nextProps.userturn.agreement_note
      });
    }
  }


  onAcceptStatementsChange = (e)=> {
    e.preventDefault();
    const progress = e.target.name;

    if (this.props.progress[e.target.name]
      || !_.includes([
          progressTypes.SIGNUP_AGREEMENT1_ACCEPTED,
          progressTypes.SIGNUP_AGREEMENT2_ACCEPTED,
          progressTypes.SIGNUP_AGREEMENT3_ACCEPTED]
        , progress)
    ) return;


    this.props.acceptSignupStatements(this.props.userturn.id, progress)
        .then(()=> {
          toastr.success('A nyilatkozat elfogadása megtörtént.');
          if (
            this.props.progress[progressTypes.SIGNUP_AGREEMENT1_ACCEPTED] &&
            this.props.progress[progressTypes.SIGNUP_AGREEMENT2_ACCEPTED] &&
            this.props.progress[progressTypes.SIGNUP_AGREEMENT3_ACCEPTED]
          ) {
            return this.props.acceptSignupStatements(this.props.userturn.id, progressTypes.SIGNUP_AGREEMENTS_ACCEPTED)
          }

        })
        .catch(()=> {
          toastr.error('A nyilatkozat elfogadása sikertelen, próbálja újra!');
        });
  }

  saveNote(note) {
    this.props.setAgreementNote(this.props.userturn.id, note);
  }

  noteChanged = (e)=> {
    this.saveNote(e.target.value);

    this.setState({
      megjegyzes: e.target.value
    });
  }

  render() {
    const {megjegyzes}=this.state;

    return (
      <Content category="Jelentkezés" title="Nyilatkozatok">
        <div>

          <div className="well well-small"><h4>Adatkezelési nyilatkozat</h4>

            <p className="text-block">
              A Fiatal Vállalkozók Országos Szövetsége (továbbiakban FIVOSZ), és Konzorciumi Partnerei számára kiemelt
              fontosságú cél az Ügyfelei által rendelkezésére bocsátott személyes adatok védelme, a felhasználók
              információs önrendelkezési jogának biztosítása. A FIVOSZ Konzorciuma Ügyfelei személyes adatait
              bizalmasan, a hatályos jogszabályi előírásokkal összhangban kezeli, gondoskodik azok biztonságáról,
              megteszi azokat a technikai és szervezési intézkedéseket, amelyek a vonatkozó jogszabályi rendelkezések
              érvényre juttatásához szükségesek.
              A FIVOSZ adatkezelés nyilvántartási száma: NAIH-66446/2013.
            </p>

            <p className="text-block">
              Az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény 5. § (1)
              bekezdés a) pontja alapján hozzájárulok, hogy a FIVOSZ és Konzorciumi Partnerei a jelentkezési lapon
              szereplő, és a későbbiekben megadandó személyes adataimat a GINOP-5.2.2-14-2015-00020 „Vállalkozz Itthon
              Junior - Fiatalok vállalkozóvá válásának támogatása” című program keretében felhasználja, tárolja, illetve
              a pályázatot kezelő felettes szervek számára az ellenőrzések során, illetve kérés esetén betekintésre
              hozzáférhetővé tegye.
            </p>

            <p className="text-block">
              A fent megadott adatok változását 8 napon belül bejelentem a www.vallalkozzitthonjunior.hu felületen
              megadott e-mailes elérhetőségen.
            </p>

            <Checkbox name={progressTypes.SIGNUP_AGREEMENT1_ACCEPTED}
                      checked={this.props.progress[progressTypes.SIGNUP_AGREEMENT1_ACCEPTED]!==undefined}
                      onChange={this.onAcceptStatementsChange}>
              <strong>Elfogadom a nyilatkozatot</strong>
            </Checkbox>

          </div>

          <div className="well well-small">
            <h4>Részvételi feltételek</h4>

            <p className="text-block">
              Felelősségem tudatában nyilatkozom, hogy a GINOP-5.2.2 programban való részvételi feltételeket megismertem
              és tudomásul veszem, különös tekintettel az alábbiakra:
            </p>
            <p className="text-block">
              A jelentkezési feltételeknek a Támogatási Szerződés megkötésének tervezett időpontjában
              előreláthatóan megfelelek, azaz
            </p>
            <ol>
              <li>18. életévemet már betöltöm, de a 30. életévemet még nem</li>
              <li>A fenti időpontban más vállalkozásban közvetlen vagy közvetett többségi befolyást biztosító
                részesedéssel nem rendelkezem, illetve más vállalkozásnak egyedüli vagy többségi tulajdonosa nem
                vagyok, más vállalkozásban nem töltök be vezető tisztségviselői posztot.
              </li>
              <li>Cégalapításra jogosult vagyok, továbbá nincs folyamatban semmi olyan eljárás, amelynek
                eredményeképpen ne lehetnék jogosult célalapításra.
              </li>
            </ol>

            <p className="text-block">
              Vállalom, hogy:
            </p>
            <ol>
              <li>A GINOP-5.2.3-16 konstrukcióban támogatott vállalkozásomban személyes közreműködőként részt veszek.
                (Személyes közreműködés a gazdasági társaság valamely tevékenységi körének megvalósításában való
                személyes, tagi részvételt jelenti.)
              </li>
              <li>Mindent megteszek annak érdekében, hogy a vállalkozás fenntartását a fenti projekt lebonyolítását
                követő legalább 3 évig biztosítsam
              </li>
              <li>Vállalkozásommal kapcsolatban a FIVOSZ Konzorcium felé fennáló
                adatszolgáltatási kötelezettségemet
                vállalkozásom sikeres nyomonkövetése érdekében teljesítem a vállalkozás megalapítását követő négy évig.
                Tudomásul veszem, hogy a programban való részvételi feltételeknek való megfelelésről a Támogatási
                Szerződés megkötésekor írásban, büntetőjogi felelősség mellett ismételten nyilatkoznom kell.
              </li>
            </ol>

            <Checkbox
              name={progressTypes.SIGNUP_AGREEMENT2_ACCEPTED}
              checked={this.props.progress[progressTypes.SIGNUP_AGREEMENT2_ACCEPTED]!==undefined}
              onChange={this.onAcceptStatementsChange}>
              <strong>Elfogadom a nyilatkozatot</strong>
            </Checkbox>

          </div>

          <div className="well well-small">
            <h4>Részvételi szándék a programban, vállalások</h4>

            <p className="text-block">
              A programba kerülésem érdekében vállalom, hogy:
            </p>
            <ol>
              <li>A vállalkozói kompetenciatesztet internetes felületen, vagy papír alapon kitöltöm</li>
              <li>Az alapozó képzésen és tájékoztatáson részt veszek</li>
              <li>A programmal kapcsolatban e-mail-ben érkező híreket/hírleveleket figyelemmel kísérem</li>
            </ol>

            <p className="text-block">
              A programba kerülésem esetén vállalom, hogy:
            </p>
            <ol>
              <li>A programba kerülésem esetén a részvételemmel kapcsolatos Támogatói Szerződést a programot szervező,
                Fiatal Vállalkozók Országos Szövetsége által vezetett Konzorciummal aláírom. A Konzorcium tagjai:
                <ul>
                  <li> Fiatal Vállalkozók Országos Szövetsége (FIVOSZ)</li>
                  <li>Magyar Iparszövetség (OKISZ)</li>
                  <li>Kereskedők és Vendéglátók Országos Érdekképviseleti Szövetsége (KISOSZ)</li>
                </ul>
              </li>
              <li>Az általam a fentiekben jelölt megyeszékhelyen a Dél-Dunántúl régióban a maximum 1 hónap
                időtartamban szervezett 90 órás vállalkozói képzésen személyesen részt veszek, az arra vonatkozó
                felnőttképzési szerződést megkötöm.
              </li>
              <li>Minden tőlem telhetőt megteszek a képzés sikeres elvégzése, a képzési tanúsítvány megszerzése
                érdekében
              </li>
              <li>A képzés időtartama alatt, és azt követően a megadott határidőig a vállalkozásomra vonatkozó üzleti
                tervet összeállítom
              </li>
              <li>Az üzleti terv FIVOSZ Konzorcium általi elfogadását követően vállalkozást alapítok, melynek
                székhelye a Dél-Dunántúl régióban (Baranya, Somogy vagy Tolna megye) lesz.
              </li>
              <li>A létrejött vállalkozással a GINOP-5.2.3 pályázati felhívás keretében pályázatot adok be.</li>
            </ol>

            <Checkbox
              name={progressTypes.SIGNUP_AGREEMENT3_ACCEPTED}
              checked={this.props.progress[progressTypes.SIGNUP_AGREEMENT3_ACCEPTED]!==undefined}
              onChange={this.onAcceptStatementsChange}>
              <strong>Elfogadom a nyilatkozatot</strong>
            </Checkbox>
          </div>


          <div className="well well-small">
            <h4>Megjegyzés, vélemény a programmal, programba jelentkezéssel kapcsolatban</h4>
            <TextAreaInput
              name="megjegyzes"
              label=""
              value={megjegyzes}
              maxCharacters={300}
              onChange={this.noteChanged}
            />


          </div>

        </div>

        <div>
          <Link to={`/user/${this.props.currentTurn.slug}/signup-finalize`}> <Button bsStyle="primary">Tovább</Button></Link>
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

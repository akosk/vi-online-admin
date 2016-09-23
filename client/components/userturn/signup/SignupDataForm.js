import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import DateRangePickerInput from '../../common/DateRangePickerInput';
import * as inputHelper from '../../../../common/SelectInputHelper';

class SignupDataForm extends Component {

  static propTypes = {
    signupData: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    finalized: React.PropTypes.bool,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
  };

  buildForm() {
    const {signupData,onChange, errors,finalized}=this.props;

    let form = [];
    form.push(<div key="1">
        <SelectInput
          name="vallalkozas_szekhelye"
          label="Melyik megyében lesz a leendő vállalkozásának székhelye?"
          value={signupData.vallalkozas_szekhelye || ''}
          defaultOption="Válasszon megyét..."
          options={inputHelper.megyekOptions()}
          disabled={finalized}
          onChange={onChange} error={errors['vallalkozas_szekhelye']}

        />
        <SelectInput
          name="tobbsegi_tulajdon_mas_vallalkozasban"
          label="Más vállalkozásban többségi tulajdonnal rendelkezik-e? "
          value={signupData.tobbsegi_tulajdon_mas_vallalkozasban || ''}
          defaultOption="Válasszon..."
          helpText="Van olyan vállalkozás a családban vagy ismeretségi körben,
    amelyben 50 %-nál nagyobb részesedése van a pályázónak.  Az 50%-os tulajdonrész nem kizáró ok."
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange} error={errors['tobbsegi_tulajdon_mas_vallalkozasban']}/>
      </div>
    );

    if (signupData.tobbsegi_tulajdon_mas_vallalkozasban === '1') {
      form.push((
        <div key="2" className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          Amennyiben többségi tulajdonos más vállalkozásban,
          akkor a programban nem vehet részt.
        </div>
      ));
      return form;
    }
    if (signupData.tobbsegi_tulajdon_mas_vallalkozasban !== '0') return form;

    form.push((
      <div key="3">

      </div>
    ));

    let birthDateError = '';
    let form18to25 = false;
    let form25to30 = false;
    if (moment("1999-03-01") <= moment(signupData.birth_date)) {
      birthDateError = 'Sajnos ebbe a programba nem jelentkezhet, ' +
        'mert nem töltötte be a 18. életévét.';
    } else if (moment("1998-09-01") <= moment(signupData.birth_date)) {
      birthDateError = 'Felhívjuk a figyelmét, hogy programunkban akkor vehet ' +
        'részt, ha betölti a 18. életévét.';
    } else if (moment("1991-09-01") <= moment(signupData.birth_date)) {
      form18to25 = true;
    } else {
      if (moment("1986-09-01") <= moment(signupData.birth_date)) {
        form25to30 = true;
      } else {
        birthDateError = 'Sajnos ebbe a programba nem jelentkezhet, mivel a program ' +
          'kezdetére betölti a 30. életévét';
      }
    }
    if (birthDateError) {
      form.push((
        <div key="2" className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {birthDateError}
        </div>
      ));
      return form;
    }
    if (!signupData.birth_date) return form;

    form.push((
      <div key="4">
      </div>
    ));

    if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.FOISKOLA
      || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.EGYETEM) {
      let txt = signupData.legmagasabb_iskolai_vegzettseg === inputHelper.EGYETEM
        ? 'Egyetemi diploma megszerzésének éve'
        : 'Főiskolai oklevél megszerzésének éve';
      form.push(<div key="4.5">


        </div>
      );

    }

    if (form18to25) {
      if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOSNAL_KEVESEBB) {
        form.push((
          <div key="2" className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            Sajnos a végzettsége nem elég a programban való részvételre.
          </div>
        ));
        return form;
      }
    }
    if (form25to30) {
      if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOSNAL_KEVESEBB
        || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOS
        || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOS_OKJ
        || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.FELSOFOKU_SZAKKEPZES) {
        form.push((
          <div key="2" className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            Sajnos a végzettsége nem elég a programban való részvételre.
          </div>
        ));
        return form;
      }
    }


    if (form18to25) {
      form.push(<div key="5">
        </div>
      );

      if (signupData.allaskeresokent_regisztralt ==='0') {
        form.push((
          <div key="2" className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            Felhívjuk figyelmét, hogy amennyiben még nem regisztrált álláskereső, keresse fel lakcíme szerint illetékes
            Kormányhivatal Foglalkoztatási Osztályát (volt munkaügyi központ kirendeltsége)
          </div>
        ));
        return form;
      }

      if (signupData.allaskeresokent_regisztralt === '1') {
        form.push(<div key="5.1">

          </div>
        );
      }

    }

    if (form25to30) {
      form.push(<div key="5.1">
        </div>
      );
      if (signupData.palyakezdo_allaskereso == '0') {
        form.push((
          <div key="2" className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign"></span>
            Amennyiben nem pályakezdő álláskereső, nem vehet részt a programban.
          </div>
        ));
        return form;
      }
    }

    form.push(<div key="6">


        <SelectInput
          disabled={finalized}
          name="kepzesi_helyszin"
          label="Preferált képzési helyszín"
          value={signupData.kepzesi_helyszin  || ''}
          defaultOption="Válasszon..."
          options={inputHelper.kepzesiHelyszinOptions()}
          onChange={onChange} error={errors['kepzesi_helyszin']}/>

      </div>
    );

    return form;
  }

  render() {
    const {finalized,saving,onSave}=this.props;
    return (
      <form >
        {this.buildForm()}
        {!finalized &&
        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Mentés...' : 'Mentés'}
          className="btn btn-primary"
          onClick={onSave}/>
        }
      </form>
    );
  }
}


export default SignupDataForm;

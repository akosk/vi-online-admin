import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';

import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import MultiCheckboxInput from '../../common/MultiCheckboxInput';
import MultiTextInput from '../../common/MultiTextInput';
import RadioGroupInput from '../../common/RadioGroupInput';
import DateRangePickerInput from '../../common/DateRangePickerInput';
import * as inputHelper from '../../../../common/SelectInputHelper';

class SignupData1Form extends Component {

  static propTypes = {
    signupData: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    finalized: React.PropTypes.bool,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
  };

  //buildForm() {
  //  const {signupData,onChange, errors,finalized}=this.props;
	//
	//
  //  let form = [];
  //  form.push(<div key="1">
  //      <MultiCheckboxInput
  //        name="honnan_ertesult"
  //        label="Honnan értesült a pályázati lehetőségről?"
  //        values={signupData.honnan_ertesult || []}
  //        options={inputHelper.honnanErtesultOptions()}
  //        disabled={finalized}
  //        onChange={onChange} error={errors.honnan_ertesult}
  //      />
	//
	//
  //      <SelectInput
  //        name="tobbsegi_tulajdon_mas_vallalkozasban"
  //        label="Más vállalkozásnak egyedüli vagy többségi tulajdonosa-e, illetve rendelkezik-e más vállalkozásban közvetlen vagy közvetett többségi befolyást biztosító részesedéssel?"
  //        value={signupData.tobbsegi_tulajdon_mas_vallalkozasban || ''}
  //        defaultOption="Válasszon..."
  //        helpText="Egyéni vállalkozó-e, vagy van-e olyan vállalkozás, amelyben 50 %-nál nagyobb részesedése vagy befolyása van? Az 50%-os tulajdonrész nem kizáró ok."
  //        options={inputHelper.yesnoOptions()}
  //        disabled={finalized}
  //        onChange={onChange} error={errors['tobbsegi_tulajdon_mas_vallalkozasban']}/>
	//
  //      <SelectInput
  //        name="vallalkozas_szekhelye"
  //        label="Melyik megyében lesz a leendő vállalkozásának székhelye?"
  //        value={signupData.vallalkozas_szekhelye || ''}
  //        defaultOption="Válasszon megyét..."
  //        options={inputHelper.megyekOptions()}
  //        disabled={finalized}
  //        onChange={onChange} error={errors['vallalkozas_szekhelye']}
	//
  //      />
  //    </div>
  //  );
	//
  //  if (signupData.tobbsegi_tulajdon_mas_vallalkozasban === '1') {
  //    form.push((
  //      <div key="2" className="alert alert-danger" role="alert">
  //        <span className="glyphicon glyphicon-exclamation-sign"></span>
  //        Amennyiben többségi tulajdonos más vállalkozásban,
  //        akkor a programban nem vehet részt.
  //      </div>
  //    ));
  //    return form;
  //  }
  //  if (signupData.tobbsegi_tulajdon_mas_vallalkozasban !== '0') return form;
	//
  //  form.push((
  //    <div key="3">
  //      <TextInput
  //        name="name"
  //        label="Jelentkező neve"
  //        disabled
  //        value={signupData.name || ''}
  //        onChange={onChange}
  //        error={errors.name}/>
  //      <TextInput
  //        name="birth_name"
  //        label="Születési név"
  //        value={signupData.birth_name || ''}
  //        disabled={finalized}
  //        helpText="Akkor kell kitölteni ha eltérő."
  //        onChange={onChange}
  //        error={errors.birth_name}/>
  //      <DateRangePickerInput
  //        name="birth_date"
  //        disabled={finalized}
  //        onChange={onChange}
  //        label="Születési idő"
  //        value={signupData.birth_date || ''}
  //        singleDatePicker>
  //      </DateRangePickerInput>
  //    </div>
  //  ));
	//
  //  let birthDateError = '';
  //  let form18to25 = false;
  //  let form25to30 = false;
  //  if (moment("1999-03-01") <= moment(signupData.birth_date)) {
  //    birthDateError = 'Sajnos ebbe a programba nem jelentkezhet, ' +
  //      'mert nem töltötte be a 18. életévét.';
  //  } else if (moment("1998-09-01") <= moment(signupData.birth_date)) {
  //    birthDateError = 'Felhívjuk a figyelmét, hogy programunkban akkor vehet ' +
  //      'részt, ha betölti a 18. életévét.';
  //  } else if (moment("1991-09-01") <= moment(signupData.birth_date)) {
  //    form18to25 = true;
  //  } else {
  //    if (moment("1986-09-01") <= moment(signupData.birth_date)) {
  //      form25to30 = true;
  //    } else {
  //      birthDateError = 'Sajnos ebbe a programba nem jelentkezhet, mivel a program ' +
  //        'kezdetére betölti a 30. életévét';
  //    }
  //  }
  //  if (birthDateError) {
  //    form.push((
  //      <div key="2" className="alert alert-danger" role="alert">
  //        <span className="glyphicon glyphicon-exclamation-sign"></span>
  //        {birthDateError}
  //      </div>
  //    ));
  //    return form;
  //  }
  //  if (!signupData.birth_date) return form;
	//
  //  form.push((
  //    <div key="4">
  //      <TextInput
  //        disabled={finalized}
  //        name="birth_place"
  //        label="Születés helye"
  //        value={signupData.birth_place || ''}
  //        onChange={onChange}
  //        error={errors.birth_place}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="mothers_name"
  //        label="Anyja neve"
  //        value={signupData.mothers_name || ''}
  //        onChange={onChange}
  //        error={errors.mothers_name}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="permanent_address"
  //        label="Állandó lakcím"
  //        value={signupData.permanent_address || ''}
  //        onChange={onChange}
  //        error={errors.permanent_address}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="temporary_address"
  //        label="Tartókodási hely"
  //        value={signupData.temporary_address || ''}
  //        onChange={onChange}
  //        helptText="Ha eltér az állandó lakcímtől."
  //        error={errors.temporary_address}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="postal_address"
  //        label="Postázási cím"
  //        value={signupData.postal_address || ''}
  //        onChange={onChange}
  //        error={errors.postal_address}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="phone"
  //        label="Elérhetőségek (telefonszám)"
  //        value={signupData.phone || ''}
  //        onChange={onChange}
  //        error={errors.phone}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="email"
  //        label="Elérhetőségek (e-mail cím)"
  //        value={signupData.email || ''}
  //        disabled
  //        onChange={onChange}
  //        error={errors.email}/>
  //      <SelectInput
  //        disabled={finalized}
  //        name="legmagasabb_iskolai_vegzettseg"
  //        label="Legmagasabb iskolai végzettsége"
  //        value={signupData.legmagasabb_iskolai_vegzettseg || ''}
  //        defaultOption="Válasszon..."
  //        options={inputHelper.eduLevelOptions()}
  //        onChange={onChange} error={errors['legmagasabb_iskolai_vegzettseg']}
  //      />
  //    </div>
  //  ));
	//
  //  if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.FOISKOLA
  //    || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.EGYETEM) {
  //    let txt = signupData.legmagasabb_iskolai_vegzettseg === inputHelper.EGYETEM
  //      ? 'Egyetemi diploma megszerzésének éve'
  //      : 'Főiskolai oklevél megszerzésének éve';
  //    form.push(<div key="4.5">
	//
  //        <TextInput
  //          disabled={finalized}
  //          name="legmagasabb_iskolai_vegzettseg_eve"
  //          label={txt}
  //          value={signupData.legmagasabb_iskolai_vegzettseg_eve || ''}
  //          onChange={onChange}
  //          error={errors.legmagasabb_iskolai_vegzettseg_eve}/>
  //      </div>
  //    );
	//
  //  }
	//
  //  if (form18to25) {
  //    if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOSNAL_KEVESEBB) {
  //      form.push((
  //        <div key="2" className="alert alert-danger" role="alert">
  //          <span className="glyphicon glyphicon-exclamation-sign"></span>
  //          Sajnos a végzettsége nem elég a programban való részvételre.
  //        </div>
  //      ));
  //      return form;
  //    }
  //  }
  //  if (form25to30) {
  //    if (signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOSNAL_KEVESEBB
  //      || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOS
  //      || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.ALTALANOS_OKJ
  //      || signupData.legmagasabb_iskolai_vegzettseg === inputHelper.FELSOFOKU_SZAKKEPZES) {
  //      form.push((
  //        <div key="2" className="alert alert-danger" role="alert">
  //          <span className="glyphicon glyphicon-exclamation-sign"></span>
  //          Sajnos a végzettsége nem elég a programban való részvételre.
  //        </div>
  //      ));
  //      return form;
  //    }
  //  }
	//
	//
  //  if (form18to25) {
  //    form.push(<div key="5">
  //        <SelectInput
  //          disabled={finalized}
  //          name="allaskeresokent_regisztralt"
  //          label="Álláskeresőként regisztrált-e?"
  //          value={signupData.allaskeresokent_regisztralt || ''}
  //          defaultOption="Válasszon..."
  //          helpText="A programba elsősorban a tartós (min. 6 hónapja) álláskeresők vonhatók be
  //           vagy a min. 1 hónapja álláskeresőként regisztrált fiatal.
  //          Felhívjuk figyelmét, hogy amennyiben még nem
  //          regisztrált álláskereső, keresse fel a lakcíme szerint illetékes Kormányhivatal Foglalkoztatási Osztályát
  //          (volt Munkaügyi Központ kirendeltsége)."
  //          options={inputHelper.yesnoOptions()}
  //          onChange={onChange} error={errors['allaskeresokent_regisztralt']}/>
  //      </div>
  //    );
	//
  //    if (signupData.allaskeresokent_regisztralt === '0') {
  //      form.push((
  //        <div key="2" className="alert alert-danger" role="alert">
  //          <span className="glyphicon glyphicon-exclamation-sign"></span>
  //          Felhívjuk figyelmét, hogy amennyiben még nem regisztrált álláskereső, keresse fel lakcíme szerint illetékes
  //          Kormányhivatal Foglalkoztatási Osztályát (volt munkaügyi központ kirendeltsége)
  //        </div>
  //      ));
  //      return form;
  //    }
	//
  //    if (signupData.allaskeresokent_regisztralt === '1') {
  //      form.push(<div key="5.1">
	//
  //          <DateRangePickerInput
  //            disabled={finalized}
  //            name="allaskeresokent_regisztralt_datuma"
  //            onChange={onChange}
  //            helpText="A progaramba akkor kerülhet be, ha meglévő regisztrációja fennmarad 2016.09.01-ig."
  //            label="Álláskeresőként regisztrált dátuma"
  //            value={signupData.allaskeresokent_regisztralt_datuma || ''}
  //            singleDatePicker>
  //          </DateRangePickerInput>
  //        </div>
  //      );
  //    }
	//
  //  }
	//
  //  if (form25to30) {
  //    form.push(<div key="5.1">
  //        <SelectInput
  //          disabled={finalized}
  //          name="palyakezdo_allaskereso"
  //          label="Pályakezdő álláskereső-e?"
  //          value={signupData.palyakezdo_allaskereso || ''}
  //          defaultOption="Válasszon..."
  //          helpText="A felsőfokú végzettség megszerzése óta kevesebb,
  //            mint 360 napot dolgozott. Amennyiben bizonytalan a kérdésben,
  //            keresse fel a lakcíme szerint illetékes Kormányhivatal Foglalkoztatási Osztályát
  //            (volt Munkaügyi Központ kirendeltsége)"
  //          options={inputHelper.yesnoOptions()}
  //          onChange={onChange} error={errors['palyakezdo_allaskereso']}/>
  //      </div>
  //    );
  //    if (signupData.palyakezdo_allaskereso == '0') {
  //      form.push((
  //        <div key="2" className="alert alert-danger" role="alert">
  //          <span className="glyphicon glyphicon-exclamation-sign"></span>
  //          Amennyiben nem pályakezdő álláskereső, nem vehet részt a programban.
  //        </div>
  //      ));
  //      return form;
  //    }
  //  }
	//
  //  form.push(<div key="6">
	//
  //      <TextInput
  //        name="adoazonosito_jel"
  //        label="Adóazonosító jel"
  //        disabled={finalized}
  //        value={signupData.adoazonosito_jel || ''}
  //        onChange={onChange}
  //        error={errors.adoazonosito_jel}/>
  //      <TextInput
  //        disabled={finalized}
  //        name="taj"
  //        label="Tajszám"
  //        value={signupData.taj  || ''}
  //        onChange={onChange}
  //        error={errors.taj}/>
  //      <SelectInput
  //        disabled={finalized}
  //        name="kisebbsegi_vagy_hatranyos"
  //        label="Kisebbségi, vagy hátrányos helyzetbe tartozás"
  //        value={signupData.kisebbsegi_vagy_hatranyos  || ''}
  //        defaultOption="Válasszon..."
  //        options={inputHelper.yesnoOptions()}
  //        onChange={onChange} error={errors['kisebbsegi_vagy_hatranyos']}/>
	//
  //      <SelectInput
  //        disabled={finalized}
  //        name="kepzesi_helyszin"
  //        label="Preferált képzési helyszín"
  //        value={signupData.kepzesi_helyszin  || ''}
  //        defaultOption="Válasszon..."
  //        options={inputHelper.kepzesiHelyszinOptions()}
  //        onChange={onChange} error={errors['kepzesi_helyszin']}/>
	//
  //    </div>
  //  );
	//
  //  return form;
  //}

  render() {
    const {signupData,onChange, errors,finalized,saving,onSave}=this.props;
    return (
      <form >

        <MultiCheckboxInput
          name="honnan_ertesult"
          label="Honnan értesült a pályázati lehetőségről?"
          values={signupData.honnan_ertesult || {}}
          options={inputHelper.honnanErtesultOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.honnan_ertesult}
        />


        <RadioGroupInput
          name="tobbsegi_tulajdon_mas_vallalkozasban"
          label="Más vállalkozásnak egyedüli vagy többségi tulajdonosa-e, illetve rendelkezik-e más vállalkozásban közvetlen vagy közvetett többségi befolyást biztosító részesedéssel?"
          value={signupData.tobbsegi_tulajdon_mas_vallalkozasban || ''}
          defaultOption="Válasszon..."
          helpText="Egyéni vállalkozó-e, vagy van-e olyan vállalkozás, amelyben 50 %-nál nagyobb részesedése vagy befolyása van? Az 50%-os tulajdonrész nem kizáró ok."
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.tobbsegi_tulajdon_mas_vallalkozasban}/>

        { _.get(signupData,'tobbsegi_tulajdon_mas_vallalkozasban.value') == 1 &&
        <div className="alert alert-danger" role="alert">
          Amennyiben a programba lépéskor (képzés megkezdésekor) egyéni vállalkozó, vagy más vállalkozásban többségi tulajdona van, az útmutató előírásai miatt nem vehet részt a programban.
        </div>
        }

        <RadioGroupInput
          name="vezeto_tisztsegviselo_mas_vallalkozasban"
          label="Más vállalkozásban tölt-e be jelenleg vezető tisztségviselői posztot?"
          value={signupData.vezeto_tisztsegviselo_mas_vallalkozasban || ''}
          defaultOption="Válasszon..."
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vezeto_tisztsegviselo_mas_vallalkozasban}/>

        { _.get(signupData,'vezeto_tisztsegviselo_mas_vallalkozasban.value') == 1 &&
        <div className="alert alert-danger" role="alert">
          Amennyiben a programba lépéskor (képzés megkezdésekor) más vállalkozásban vezető tisztségviselői posztot betölt, az útmutató előírásai miatt nem vehet részt a programban.
        </div>
        }

        <RadioGroupInput
          name="korabban_vallalkozo"
          label="Volt-e korábban bármikor egyéni vállalkozó, volt-e már korábban vállalkozás többségi tulajdonosa, vagy  töltött-e már be más vállalkozásban vezető tisztségviselői posztot?"
          value={signupData.korabban_vallalkozo || ''}
          defaultOption="Válasszon..."
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.korabban_vallalkozo}
        />

        <SelectInput
          name="vallalkozas_szekhelye_megye"
          label="Melyik megyében lesz a leendő vállalkozásának székhelye?"
          value={signupData.vallalkozas_szekhelye_megye || ''}
          defaultOption="Válasszon megyét..."
          options={inputHelper.megyekOptions()}
          disabled={finalized}
          onChange={onChange}
          error={_.get(errors,'vallalkozas_szekhelye_megye.error')}
        />

        { signupData.vallalkozas_szekhelye_megye!='' && _.indexOf(['BA', 'SO', 'TO'], signupData.vallalkozas_szekhelye_megye) === -1 &&
        <div className="alert alert-danger" role="alert">

          A vállalkozásának székhelye nem a Dél-Dunántúl régióban (Baranya, Somogy, Tolna megye) lesz, más szervezethez
          kell jelentkeznie. Ebben az esetben kérjük
          tanulmányozza a <a target='_blank' href="http://www.vallalkozz2016.hu" style={{color:'white'}}>www.vallalkozz2016.hu</a> oldalt.
        </div>
        }

        <TextInput
          disabled={finalized}
          name="vallalkozas_szekhelye_telepules"
          label="Melyik településen lesz a vállalkozásának székhelye?"
          value={signupData.vallalkozas_szekhelye_telepules  || ''}
          onChange={onChange}
          error={_.get(errors,'vallalkozas_szekhelye_telepules.error')}/>

        <RadioGroupInput
          name="kepzes_helye"
          label="Amennyiben bekerül a programba, elsősorban melyik megyeszékhelyen venne részt személyesen a 3 hétig tartó 90 órás vállalkozói képzésen?"
          value={signupData.kepzes_helye || ''}
          defaultOption="Válasszon..."
          options={inputHelper.kepzesiHelyszinOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.kepzes_helye}/>

        { signupData.kepzes_helye == '0' &&
        <div className="alert alert-danger" role="alert">
          A 90 órás vállalkozói képzésen való személyes részvétel kötelező, maximálisan 10%-os hiányzás megengedett. Amennyiben előre látja, hogy nem tud részt venni a képzésen, és nem kap képzési tanúsítványt, nem tud pályázni a 3 millió forintos támogatásra.
        </div>
        }


        <RadioGroupInput
          name="alternativ_kepzes_helye"
          label="Amennyiben az előbb jelölt megyeszékhelyen nem tudna bekerülni a képzési csoportba, másik megyeszékhelyre be tudna járni személyesen a 3 hétig tartó 90 órás vállalkozói képzésre?"
          value={signupData.alternativ_kepzes_helye || ''}
          defaultOption="Válasszon..."
          options={inputHelper.alternativeKepzesiHelyszinOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.alternativ_kepzes_helye}/>

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


export default SignupData1Form;

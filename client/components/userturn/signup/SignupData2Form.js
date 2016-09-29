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

class SignupData2Form extends Component {

  static propTypes = {
    signupData: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    finalized: React.PropTypes.bool,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
  };


  render() {
    const {signupData,onChange, errors,finalized,saving,onSave}=this.props;

    let birthDateError = '';
    if (moment("1999-10-01") <= moment(signupData.birth_date)) {
      birthDateError = <p>
        Ön a jelenlegi programunkban nem tud részt venni, mivel nem töltötte be a 18. életévét, a pályázati útmutató szerint a programba csak 18 év felettiek léphetnek be.
        Örömmel vettük érdeklődését a program iránt, kérjük, amennyiben vállalkozni szeretne, iratkozzon fel GINOP-5.2.2 általános hírlevelünkre
        a <a href="http://www.vallalkozzitthon.hu" target="_blank" style={{color:'white'}}>www.vallalkozzitthon.hu</a> oldalon, ahol vállalkozásindítási témában további információkat talál</p>;
    } else if (moment("1998-10-07") <= moment(signupData.birth_date)) {
      birthDateError = 'Amennyiben az első turnus kezdetéig nem tölti be a 18. életévét, most nem tud részt venni a programban, mivel a pályázati útmutató szerint a programba csak 18 év felettiek léphetnek be. Amennyiben egy éven belül 18 éves lesz, be szeretne lépni a programba, és jelenleg még nem regisztrált álláskereső, nem is tanul, nem is dolgozik, mielőbb jelentkezzen a lakhelye szerint illetékes munkaügyi szervezetnél. Jelezze, hogy a GINOP-5.2.2-es programban szeretne részt venni, és ha a feltételek adottak, regisztráljon az Ifjúsági Garanciaprogramba álláskeresőként! Ezt követően tud majd jelentkezni a következő turnusba!';
    } else if (moment("1991-10-17") <= moment(signupData.birth_date)) {
      birthDateError = 'Ön a képzés várható kezdetekor 18-25 éves korú lesz, így akkor léphet a programba, ha rendelkezik legalább 8 általános iskolai végzettséggel, és legalább egy hónapja álláskeresőként regisztrált a munkaügyi szervezetnél.' +
        '(Amennyiben legalább fél éve regisztrált álláskereső, előnyt élvez a programba kerülésnél.)' +
        'Amennyiben még nem regisztrált álláskereső, és nem tanul, nem dolgozik, mielőbb jelentkezzen a lakhelye szerint illetékes munkaügyi szervezetnél, jelezze, hogy a GINOP-5.2.2-es programban szeretne részt venni, és ha a feltételek adottak, regisztráljon az Ifjúsági Garanciaprogramba álláskeresőként!';
    } else {
      if (moment("1986-10-10") <= moment(signupData.birth_date)) {
        birthDateError='Ön a programba lépéskor várhatóan 25-30 éves korú lesz, így akkor léphet a programba, ha felsőfokú végzettséggel rendelkezik (megkapta az oklevelét), és pályakezdő álláskeresőnek minősül (végzettsége megszerzését követően nincs több munkaviszonya 360 napnál), illetve legalább 1 hónapja regisztrált állláskereső. A pályakezdő álláskeresői státuszáról érdeklődjön a munkaügyi szervezetnél!';
      } else {
        birthDateError = 'Sajnos a programra nem tud jelentkezni, mivel a program kezdetére betölti a 30. életévét, így az útmutató szerint nem pályázhat.';
      }
    }

    return (
      <form >

        <TextInput
          name="name"
          label="Jelentkező neve"
          disabled
          value={signupData.name || ''}
          onChange={onChange}
          error={_.get(errors,'name.error')}/>


        <TextInput
          name="birth_name"
          label="Születési név"
          value={signupData.birth_name || ''}
          disabled={finalized}
          helpText="Akkor kell kitölteni ha eltérő."
          onChange={onChange}
          error={_.get(errors,'birth_name.error')}/>

        <RadioGroupInput
          name="gender"
          label="Neme?"
          value={signupData.gender || ''}
          options={inputHelper.genderOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.gender}/>


        <DateRangePickerInput
          name="birth_date"
          disabled={finalized}
          onChange={onChange}
          label="Születési idő"
          value={signupData.birth_date || ''}
          singleDatePicker>
        </DateRangePickerInput>

        { birthDateError &&
        <div className="alert alert-danger" role="alert">
          {birthDateError}
        </div>
        }

        <TextInput
          disabled={finalized}
          name="birth_place"
          label="Születési hely"
          value={signupData.birth_place || ''}
          onChange={onChange}
          error={_.get(errors,'birth_place.error')}/>
        <TextInput
          disabled={finalized}
          name="mothers_name"
          label="Anyja leánykori neve"
          value={signupData.mothers_name || ''}
          onChange={onChange}
          error={_.get(errors,'mothers_name.error')}/>
        <TextInput
          disabled={finalized}
          name="permanent_address_zip"
          label="Állandó lakcím irányítószám"
          value={signupData.permanent_address_zip || ''}
          onChange={onChange}
          error={_.get(errors,'permanent_address_zip.error')}/>
        <TextInput
          disabled={finalized}
          name="permanent_address_settlement"
          label="Állandó lakcím település"
          value={signupData.permanent_address_settlement || ''}
          onChange={onChange}
          error={_.get(errors,'permanent_address_settlement.error')}/>
        <TextInput
          disabled={finalized}
          name="permanent_address_street"
          label="Állandó lakcím utca és házszám"
          value={signupData.permanent_address_street || ''}
          onChange={onChange}
          error={_.get(errors,'permanent_address_street.error')}/>
        <TextInput
          disabled={finalized}
          name="temporary_address"
          label="Tartókodási hely"
          value={signupData.temporary_address || ''}
          onChange={onChange}
          helpText="Csak akkor kell kitölteni, ha eltér az állandó lakcímtől."
          error={_.get(errors,'temporary_address.error')}/>
        <TextInput
          disabled={finalized}
          name="postal_address"
          label="Postázási cím"
          value={signupData.postal_address || ''}
          onChange={onChange}
          helpText="Csak akkor kell kitölteni, ha eltér az állandó lakcímtől."
          error={_.get(errors,'postal_address')}/>
        <TextInput
          disabled={finalized}
          name="phone"
          label="Elérhetőségek (telefonszám)"
          value={signupData.phone || ''}
          onChange={onChange}
          error={_.get(errors,'phone.error')}/>
        <TextInput
          disabled={finalized}
          name="email"
          label="Elérhetőségek (e-mail cím)"
          value={signupData.email || ''}
          disabled
          onChange={onChange}
          error={_.get(errors,'email.error')}/>
        <SelectInput
          disabled={finalized}
          name="legmagasabb_iskolai_vegzettseg"
          label="Legmagasabb iskolai végzettsége"
          value={signupData.legmagasabb_iskolai_vegzettseg || ''}
          defaultOption="Válasszon..."
          options={inputHelper.eduLevelOptions()}
          onChange={onChange}
          error={_.get(errors,'legmagasabb_iskolai_vegzettseg.error')}
        />

        <TextInput
          disabled={finalized}
          name="legmagasabb_iskolai_vegzettseg_eve"
          label='Legmagasabb iskolai végzettség éve'
          value={signupData.legmagasabb_iskolai_vegzettseg_eve || ''}
          onChange={onChange}
          error={_.get(errors,'legmagasabb_iskolai_vegzettseg_eve.error')}/>

        <RadioGroupInput
          name="allaskeresokent_regisztralt"
          label="Álláskeresőként regisztrált-e?"
          value={signupData.allaskeresokent_regisztralt || ''}
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          helpText="A programba elsősorban a tartós (min. 6 hónapja) álláskeresők vonhatók be
             vagy a min. 1 hónapja álláskeresőként regisztrált fiatal.
            Felhívjuk figyelmét, hogy amennyiben még nem
            regisztrált álláskereső, keresse fel a lakcíme szerint illetékes Kormányhivatal Foglalkoztatási Osztályát
            (volt Munkaügyi Központ kirendeltsége)."

          onChange={onChange}
          error={errors.allaskeresokent_regisztralt}/>

        <DateRangePickerInput
          disabled={finalized}
          name="allaskeresokent_regisztralt_datuma"
          onChange={onChange}
          helpText="A progaramba akkor kerülhet be, ha meglévő regisztrációja fennmarad 2016.09.01-ig."
          label="Álláskeresőként regisztrált dátuma"
          value={signupData.allaskeresokent_regisztralt_datuma || ''}
          singleDatePicker>
        </DateRangePickerInput>



        <RadioGroupInput
          name="palyakezdo_allaskereso"
          label="Pályakezdő álláskereső-e?"
          value={signupData.palyakezdo_allaskereso || ''}
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          helpText="A felsőfokú végzettség megszerzése óta kevesebb,
              mint 360 napot dolgozott. Amennyiben bizonytalan a kérdésben,
              keresse fel a lakcíme szerint illetékes Kormányhivatal Foglalkoztatási Osztályát
              (volt Munkaügyi Központ kirendeltsége)"

          onChange={onChange}
          error={errors.palyakezdo_allaskereso}/>


        <TextInput
          name="adoazonosito_jel"
          label="Adóazonosító jel"
          disabled={finalized}
          value={signupData.adoazonosito_jel || ''}
          onChange={onChange}
          error={_.get(errors,'adoazonosito_jel.error')}/>
        <TextInput
          disabled={finalized}
          name="taj"
          label="Tajszám"
          value={signupData.taj  || ''}
          onChange={onChange}
          error={_.get(errors,'taj.error')}/>

        <MultiCheckboxInput
          name="kisebbsegi_vagy_hatranyos"
          label="Kisebbségi, vagy hátrányos helyzető csoporthoz tartozik-e?"
          values={signupData.kisebbsegi_vagy_hatranyos || {}}
          options={inputHelper.kisebbsegiOptions()}
          disabled={finalized}
          onChange={onChange}
          error={_.get(errors,'kisebbsegi_vagy_hatranyos')}
        />



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


export default SignupData2Form;

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';

import TextInput from '../../common/TextInput';
import TextAreaInput from '../../common/TextAreaInput';
import SelectInput from '../../common/SelectInput';
import MultiCheckboxInput from '../../common/MultiCheckboxInput';
import MultiTextInput from '../../common/MultiTextInput';
import RadioGroupInput from '../../common/RadioGroupInput';
import DateRangePickerInput from '../../common/DateRangePickerInput';
import * as inputHelper from '../../../../common/SelectInputHelper';

class SignupData3Form extends Component {

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
    return (
      <form >

        <TextAreaInput
          name="miert_szeretne_vallalkozast_inditani"
          label="Miért szeretne vállalkozást indítani? Mi motiválja, hogy vállalkozó legyen, vannak-e jó példák Ön előtt, van-e már valamilyen vállalkozási tapasztalata? Foglalja össze röviden, (maximum 1200 karakterben)!"
          disabled={finalized}
          value={signupData.miert_szeretne_vallalkozast_inditani || ''}
          onChange={onChange}
          maxCharacters={1200}
          error={_.get(errors,'miert_szeretne_vallalkozast_inditani.error') }

        />

        <TextAreaInput
          name="mivel_foglalkozik_a_vallalkozas"
          label="Írja le röviden (maximum 1000 karakterben), mivel foglalkozik majd a vállalkozása, milyen terméket, szolgáltatást kínál, kik lesznek a vevői, ügyfelei?"
          disabled={finalized}
          value={signupData.mivel_foglalkozik_a_vallalkozas || ''}
          onChange={onChange}
          maxCharacters={1000}
          error={_.get(errors,'mivel_foglalkozik_a_vallalkozas.error')}/>

        <RadioGroupInput
          name="piackutatast_vegzett"
          label="Végzett-e már piackutatást leendő vállalkozásával kapcsolatban?"
          value={signupData.piackutatast_vegzett || ''}
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          helpText="Vizsgálta-e, hogy terméke, szolgáltatása iránt mekkora a kereslet, mekkora a konkurencia, mivel lenne jobb az Ön szolgáltatása, mint a versenytérsaké?"

          onChange={onChange}
          error={errors.piackutatast_vegzett}/>

        {_.get(signupData, 'piackutatast_vegzett.value') == '1' &&
        <TextAreaInput
          name="piackutatast_vegzett_bemutatas"
          label="Ha végzett piackutatást, mutassa be röviden (maximum 1000 karakterben) a piackutatás eredményét!"
          disabled={finalized}
          value={signupData.piackutatast_vegzett_bemutatas || ''}
          onChange={onChange}
          maxCharacters={1000}
          error={_.get(errors,'piackutatast_vegzett_bemutatas')}/>
        }

        <RadioGroupInput
          name="vallalkozas_formaja"
          label="Milyen formában kívánja létrehozni vállalkozását?"
          value={signupData.vallalkozas_formaja || ''}
          options={inputHelper.vallalkozasFormajaOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vallalkozas_formaja}/>

        <RadioGroupInput
          name="vallalkozas_szektora"
          label="Milyen szektorban tervezi indítani vállalkozását?"
          value={signupData.vallalkozas_szektora || {}}
          options={inputHelper.vallalkozasSzektoraOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vallalkozas_szektora}/>

        <MultiCheckboxInput
          name="kivel_vallalkozik"
          label="Kivel/Kikkel tervezi vállalkozását létrehozni?"
          values={signupData.kivel_vallalkozik || {}}
          options={inputHelper.kivelVallalkozikOptions()}
          disabled={finalized}
          onChange={onChange}
          error={_.get(errors,'kivel_vallalkozik')}
        />

        <RadioGroupInput
          name="elso_12_honapban_alkalmazottat_vesz_fel"
          label="Tervezi-e, hogy már az első 12 hónapban alkalmazottat vesz fel?"
          value={signupData.elso_12_honapban_alkalmazottat_vesz_fel || {}}
          options={inputHelper.yesnoOptions(
          '',
          'Hány alkalmazottat tervez felvenni? (csak számot írjon, napi 8 órás munkaidőre számítva)',
          {numeric:true})
          }
          disabled={finalized}
          onChange={onChange}
          error={errors.elso_12_honapban_alkalmazottat_vesz_fel}/>

        <TextInput
          name="harmadik_evben_hany_alkalmazott_lesz"
          label="Tervei szerint az indulást követő harmadik évben hány alkalmazottja lesz a cégének?"
          disabled={finalized}
          value={signupData.harmadik_evben_hany_alkalmazott_lesz || ''}
          helpText="Csak számot írjon, napi 8 órás munkaidőre számítva."
          numeric
          onChange={onChange}
          error={_.get(errors,'harmadik_evben_hany_alkalmazott_lesz.error')}/>

        <RadioGroupInput
          name="vallalkozast_legalabb_4_evig_fenntartja"
          label="Vállalja-e, hogy vállalkozását megalapítástól kezdve legalább 4 évig fenntartja?"
          value={signupData.vallalkozast_legalabb_4_evig_fenntartja || {}}
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vallalkozast_legalabb_4_evig_fenntartja}/>

        <RadioGroupInput
          name="vallalkozast_legalább_4_evig_mukodteti"
          label="Vállalja-e, hogy személyes közreműködőként részt vesz a vállalkozásának működtetésében az alapítást követően legalább 4 évig?"
          value={signupData.vallalkozast_legalább_4_evig_mukodteti || {}}
          options={inputHelper.yesnoOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vallalkozast_legalább_4_evig_mukodteti}/>


        {!finalized &&
        <div>
          <input
            name="save"
            type="submit"
            disabled={saving}
            value={saving ? 'Mentés...' : 'Mentés'}
            className="btn btn-primary"
            onClick={onSave}/>
          <input
            name="next"
            type="submit"
            disabled={saving}
            value={saving ? 'Tovább...' : 'Tovább'}
            className="btn btn-primary"
            onClick={onSave}/>
        </div>
        }
      </form>
    );
  }
}

export default SignupData3Form;

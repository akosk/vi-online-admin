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

        { _.get(signupData, 'tobbsegi_tulajdon_mas_vallalkozasban.value') == 1 &&
        <div className="alert alert-danger" role="alert">
          Amennyiben a programba lépéskor (képzés megkezdésekor) egyéni vállalkozó, vagy más vállalkozásban többségi
          tulajdona van, az útmutató előírásai miatt nem vehet részt a programban.
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

        { _.get(signupData, 'vezeto_tisztsegviselo_mas_vallalkozasban.value') == 1 &&
        <div className="alert alert-danger" role="alert">
          Amennyiben a programba lépéskor (képzés megkezdésekor) más vállalkozásban vezető tisztségviselői posztot
          betölt, az útmutató előírásai miatt nem vehet részt a programban.
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

        { signupData.vallalkozas_szekhelye_megye != '' && _.indexOf(['BA', 'SO', 'TO'], signupData.vallalkozas_szekhelye_megye) === -1 &&
        <div className="alert alert-danger" role="alert">

          A vállalkozásának székhelye nem a Dél-Dunántúl régióban (Baranya, Somogy, Tolna megye) lesz, más szervezethez
          kell jelentkeznie. Ebben az esetben kérjük
          tanulmányozza a <a target='_blank' href="http://www.vallalkozz2016.hu" style={{color:'white'}}>www.vallalkozz2016.hu</a>
          oldalt.
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
          A 90 órás vállalkozói képzésen való személyes részvétel kötelező, maximálisan 10%-os hiányzás megengedett.
          Amennyiben előre látja, hogy nem tud részt venni a képzésen, és nem kap képzési tanúsítványt, nem tud pályázni
          a 3 millió forintos támogatásra.
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


        <RadioGroupInput
          name="megfelelo_idopont"
          label="Melyik időpont lenne Önnek legmegfelelőbb a programba lépésre és a 90 órás vállalkozói képzés megkezdésére?"
          helpText="Ha szeretne támogatást igényelni, akkor amíg nem végzi el a képzést, és nem kapja meg az üzleti tervére a jóváhagyást, ne alapítsa meg a vállalkozását!"
          value={signupData.megfelelo_idopont || ''}
          defaultOption="Válasszon..."
          options={inputHelper.megfeleloIdopontOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.megfelelo_idopont}
        />

        <RadioGroupInput
          name="vonatberlet"
          label="Szeretne-e a a 90 órás vállalkozói képzés idejére busz- vagy vonatbérletet kérni?"
          helpText="Csak akor kérhet bérletet, ha nem azon a településen lakik, ahol  képzés történik. Csak helyközi bérlet igényelhető, helyi bérlet nem. A bérletet a képzés első napján veheti át, és a képzés utolsó napján le kell adni!"
          value={signupData.vonatberlet || ''}
          defaultOption="Válasszon..."
          options={inputHelper.vonatberletOptions()}
          disabled={finalized}
          onChange={onChange}
          error={errors.vonatberlet}
        />

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


export default SignupData1Form;

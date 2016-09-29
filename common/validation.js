import _ from 'lodash';
import moment from 'moment';
import * as progressTypes from '../common/progressTypes';


export const isTestValid = function (usertest) {
  const emptyItem = _.find(usertest.questions, (item)=> {
    return item.value === '' || item.value === undefined || item.value === null;
  });
  return emptyItem === undefined;
};

export const isSignup1HasErrors = function (signupData) {
  const errors = {};
  // Honnan értesült
  const honnanErtesultKeys = _.keys(signupData.honnan_ertesult);
  let checkedCount = 0;
  _.forEach(honnanErtesultKeys, (value)=> {
    const item = _.get(signupData, `honnan_ertesult.${value}`, {});
    if (item.checked === true) checkedCount++;
    if (item.checked === true &&
      (_.get(item, 'extra.value', '') === '')) {
      _.set(errors, `honnan_ertesult.${value}.extra.error`,
        'A mező kitöltése kötelező');
    }
  });
  if (checkedCount === 0) {
    _.set(errors, `honnan_ertesult.error`,
      'Legalább egy válasz megadása kötelező');
  }


  if (!_.get(signupData, 'tobbsegi_tulajdon_mas_vallalkozasban.value')) {
    _.set(errors, 'tobbsegi_tulajdon_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!_.get(signupData, 'vezeto_tisztsegviselo_mas_vallalkozasban.value')) {
    _.set(errors, 'vezeto_tisztsegviselo_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!_.get(signupData, 'korabban_vallalkozo.value')) {
    _.set(errors, 'korabban_vallalkozo.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_megye) {
    _.set(errors, 'vallalkozas_szekhelye_megye.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_telepules) {
    _.set(errors, 'vallalkozas_szekhelye_telepules.error',
      'A mező kitöltése kötelező');
  }

  if (!_.get(signupData, 'kepzes_helye.value')) {
    _.set(errors, 'kepzes_helye.error',
      'A mező kitöltése kötelező');

  }

  if (!_.get(signupData, 'alternativ_kepzes_helye.value')) {
    _.set(errors, 'alternativ_kepzes_helye.error',
      'A mező kitöltése kötelező');
  }

  if (!_.get(signupData, 'megfelelo_idopont.value')) {
    _.set(errors, 'megfelelo_idopont.error',
      'A mező kitöltése kötelező');
  }

  if (!_.get(signupData, 'vonatberlet.value')) {
    _.set(errors, 'vonatberlet.error',
      'A mező kitöltése kötelező');
  }


  console.log('validation 1 ', errors);
  return errors;
};

export const isSignup2HasErrors = function (signupData) {
  const errors = {};

  const requiredFields = ['gender', 'birth_place', 'mothers_name',
    'permanent_address_zip', 'permanent_address_settlement', 'permanent_address_street',
    'phone', 'legmagasabb_iskolai_vegzettseg', 'legmagasabb_iskolai_vegzettseg_eve',
    'allaskeresokent_regisztralt',
    'palyakezdo_allaskereso', 'adoazonosito_jel',
    'taj'];

  requiredFields.forEach((i)=> {
    if (!signupData[i]) {
      _.set(errors, `${i}.error`,
        'A mező kitöltése kötelező');
    }
  });


  if (_.get(signupData, 'allaskeresokent_regisztralt.value') == '1' && !signupData.allaskeresokent_regisztralt_telepules) {
    _.set(errors, `allaskeresokent_regisztralt_telepules.error`,
      'A mező kitöltése kötelező');
  }

  const kisebbsegiKeys = _.keys(signupData.kisebbsegi_vagy_hatranyos);

  let checkedCount = 0;
  _.forEach(kisebbsegiKeys, (value)=> {
    const item = _.get(signupData, `kisebbsegi_vagy_hatranyos.${value}`, {});
    if (item.checked) checkedCount++;
    if (item.checked === true && item[value] == 'kisebbseg' &&
      (item.value === undefined || item.value === '')) {
      _.set(errors, `kisebbsegi_vagy_hatranyos.${value}.extra.error`,
        'A mező kitöltése kötelező');
    }
  });

  if (checkedCount === 0) {
    _.set(errors, `kisebbsegi_vagy_hatranyos.error`,
      'Legalább egy válasz megadása kötelező');
  }

  console.log('validation 2 ', errors);
  return errors;
};

export const isSignup3HasErrors = function (signupData) {
  const errors = {};
  const requiredFields = ['miert_szeretne_vallalkozast_inditani',
    'mivel_foglalkozik_a_vallalkozas', 'piackutatast_vegzett',
    'vallalkozas_formaja', 'vallalkozas_szektora',
    'elso_12_honapban_alkalmazottat_vesz_fel',
    'harmadik_evben_hany_alkalmazott_lesz', 'vallalkozast_legalabb_4_evig_fenntartja',
    'vallalkozast_legalább_4_evig_mukodteti'];

  requiredFields.forEach((i)=> {
    if (!signupData[i] || (_.isObject(signupData[i])) && !signupData[i].value) {
      _.set(errors, `${i}.error`,
        'A mező kitöltése kötelező');
    }
  });


  const kivelVallalkozasKeys = _.keys(signupData.kivel_vallalkozik);

  let checkedCount = 0;
  _.forEach(kivelVallalkozasKeys, (value)=> {
    const item = _.get(signupData, `kivel_vallalkozik.${value}`, {});
    if (item.checked) checkedCount++;
    if (item.checked === true && value == 'egyeb' &&
      _.get(item, 'extra.value', '') == '') {
      _.set(errors, `kivel_vallalkozik.${value}.extra.error`,
        'A mező kitöltése kötelező');
    }
  });

  if (checkedCount === 0) {
    _.set(errors, `kivel_vallalkozik.error`,
      'Legalább egy válasz megadása kötelező');
  }


  if (_.get(signupData, 'elso_12_honapban_alkalmazottat_vesz_fel.value') === '1'
    && _.get(signupData, 'elso_12_honapban_alkalmazottat_vesz_fel.extra.value', '') == ''
  ) {
    _.set(errors, `elso_12_honapban_alkalmazottat_vesz_fel.extra.error`,
      'A mező kitöltése kötelező');
  }


  console.log('validation 3 ', errors);
  console.log('signupData ', signupData);
  return errors;
};


export const validateSignupFinalize = function (progress) {
  const errors = [];

  if (!progress[progressTypes.SIGNUP_DATA1_VALID]) {
    errors.push('Az alapinformációk, vállalkozási alapfeltételek űrlap nincs megfelelően kitöltve.');
  }
  if (!progress[progressTypes.SIGNUP_DATA2_VALID]) {
    errors.push('A személyes adatok űrlap nincs megfelelően kitöltve.');
  }
  if (!progress[progressTypes.SIGNUP_DATA3_VALID]) {
    errors.push('A vállalkozástervezés űrlap nincs megfelelően kitöltve.');
  }
  if (!progress[progressTypes.SIGNUP_AGREEMENTS_ACCEPTED]) {
    errors.push('A nyilatkozatok nincsennek elfogadva.');
  }

  return errors;
};

export const TURN_USER_UNDER_18 = "TURN_USER_UNDER_18";
export const TURN_USER_ALMOST_18 = "TURN_USER_ALMOST_18";
export const TURN_USER_18_25 = "TURN_USER_18_25";
export const TURN_USER_25_30 = "TURN_USER_25_30";
export const TURN_USER_OVERAGE = "TURN_USER_OVERAGE";

export const getTurnUserData = (turn, birthdate)=> {
  var mBirthDate = moment(birthdate);
  var mTurnStart = moment(turn);
console.log(mTurnStart.format());
console.log(mTurnStart.subtract(17,'y').add(1,'d').format());
console.log(mTurnStart.subtract(18,'y').add(1,'d').format());
console.log(mTurnStart.subtract(25,'y').add(1,'d').format());
console.log(mTurnStart.subtract(30,'y').add(1,'d').format());

  if (mTurnStart.subtract(18,'y').add(1,'d') <= mBirthDate) {
    return TURN_USER_UNDER_18;
  } else if (mTurnStart.subtract(19,'y').add(1,'d') <= mBirthDate) {
    return TURN_USER_ALMOST_18;
  } else if (mTurnStart.subtract(25,'y').add(1,'d') <= mBirthDate) {
    return TURN_USER_18_25;
  } else if (mTurnStart.subtract(30,'y').add(1,'d') <= mBirthDate) {
    return TURN_USER_25_30;
  }

  return TURN_USER_OVERAGE
}

//export const isSignupHasErrors = function (signupData) {
//  const errors=[];
//  if (!signupData.adoazonosito_jel) {
//    errors.push('Az adóazonosító jel megadása kötelező');
//  }
//  if (!signupData.taj) {
//    errors.push('A TAJ szám megadása kötelező');
//  }
//  if (!signupData.birth_date) {
//    errors.push('Az születés dátumának megadása kötelező');
//  }
//  if (!signupData.vallalkozas_szekhelye) {
//    errors.push('A vállalkozás székhelyének megadása kötelező');
//  }
//  return errors;
//};



import _ from 'lodash';


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
  if (honnanErtesultKeys.length === 0) {
    _.set(errors,`honnan_ertesult.error`,
      'Legalább egy válasz megadása kötelező');
  }

  _.forEach(honnanErtesultKeys, (value)=> {
    const item = _.get(signupData, `honnan_ertesult.${value}`, {});
    if (item.checked === true &&
      (item.value === undefined || item.value === '')) {
      _.set(errors,`honnan_ertesult.${value}.value.error`,
        'A mező kitöltése kötelező');
    }
  });


  if (!signupData.tobbsegi_tulajdon_mas_vallalkozasban) {
    _.set(errors,'tobbsegi_tulajdon_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vezeto_tisztsegviselo_mas_vallalkozasban) {
    _.set(errors,'vezeto_tisztsegviselo_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.korabban_vallalkozo) {
    _.set(errors,'korabban_vallalkozo.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_megye) {
    _.set(errors,'vallalkozas_szekhelye_megye.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_telepules) {
    _.set(errors,'vallalkozas_szekhelye_telepules.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.kepzes_helye) {
    _.set(errors,'kepzes_helye.error',
      'A mező kitöltése kötelező');

  }

  if (!signupData.alternativ_kepzes_helye) {
    _.set(errors,'alternativ_kepzes_helye.error',
      'A mező kitöltése kötelező');
  }

  return errors;
};

export const isSignup2HasErrors = function (signupData) {
  const errors = {};
  // Honnan értesült
  const honnanErtesultKeys = _.keys(signupData.honnan_ertesult);
  if (honnanErtesultKeys.length === 0) {
    _.set(errors,`honnan_ertesult.error`,
      'Legalább egy válasz megadása kötelező');
  }

  _.forEach(honnanErtesultKeys, (value)=> {
    const item = _.get(signupData, `honnan_ertesult.${value}`, {});
    if (item.checked === true &&
      (item.value === undefined || item.value === '')) {
      _.set(errors,`honnan_ertesult.${value}.value.error`,
        'A mező kitöltése kötelező');
    }
  });


  if (!signupData.tobbsegi_tulajdon_mas_vallalkozasban) {
    _.set(errors,'tobbsegi_tulajdon_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vezeto_tisztsegviselo_mas_vallalkozasban) {
    _.set(errors,'vezeto_tisztsegviselo_mas_vallalkozasban.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.korabban_vallalkozo) {
    _.set(errors,'korabban_vallalkozo.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_megye) {
    _.set(errors,'vallalkozas_szekhelye_megye.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.vallalkozas_szekhelye_telepules) {
    _.set(errors,'vallalkozas_szekhelye_telepules.error',
      'A mező kitöltése kötelező');
  }

  if (!signupData.kepzes_helye) {
    _.set(errors,'kepzes_helye.error',
      'A mező kitöltése kötelező');

  }

  if (!signupData.alternativ_kepzes_helye) {
    _.set(errors,'alternativ_kepzes_helye.error',
      'A mező kitöltése kötelező');
  }

  return errors;
};

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

import _ from 'lodash';

export const isTestValid = function (usertest) {
  const emptyItem = _.find(usertest.questions, (item)=> {
    return item.value === '' || item.value === undefined || item.value === null;
  });
  return emptyItem === undefined;
};

export const isSignupHasErrors = function (signupData) {
  const errors=[];
  if (!signupData.adoazonosito_jel) {
    errors.push('Az adóazonosító jel megadása kötelező');
  }
  if (!signupData.taj) {
    errors.push('A TAJ szám megadása kötelező');
  }
  if (!signupData.birth_date) {
    errors.push('Az születés dátumának megadása kötelező');
  }
  if (!signupData.vallalkozas_szekhelye) {
    errors.push('A vállalkozás székhelyének megadása kötelező');
  }
  return errors;
};

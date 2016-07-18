export const ALTALANOSNAL_KEVESEBB = 'ALTALANOSNAL_KEVESEBB';
export const ALTALANOS = 'ALTALANOS';
export const ALTALANOS_OKJ = 'ALTALANOS_OKJ';
export const ERETTSEGI = 'ERETTSEGI';
export const FELSOFOKU_SZAKKEPZES = 'FELSOFOKU_SZAKKEPZES';
export const FOISKOLA = 'FOISKOLA';
export const EGYETEM = 'EGYETEM';

export function relationOptions(type='') {
  return [
    { value: '=', text: '=' },
    { value: '<', text: '<' },
    { value: '>', text: '>' },
    { value: '<=', text: '<=' },
    { value: '>=', text: '>=' },
    { value: 'LIKE', text: 'LIKE' },
    { value: 'NOT LIKE', text: 'NOT LIKE' },
  ]
}

export function yesnoOptions() {
  return [
    {
      value: '0',
      text: 'Nem'
    },
    {
      value: '1',
      text: 'Igen'
    }
  ];
}

export function roleOptions() {
  return [
    {
      value: 'user',
      text: 'Felhasználó'
    },
    {
      value: 'admin',
      text: 'Adminisztrátor'
    }
  ];
}

export function kepzesiHelyszinOptions() {
  return [
    {
      value: 'Szekszárd',
      text: 'Szekszárd'
    },
    {
      value: 'Kaposvár',
      text: 'Kaposvár'
    },
    {
      value: 'Pécs',
      text: 'Pécs'
    }
  ];
}


export function megyekOptions() {
  return [
    { value: 'BK', text: 'Bács-Kiskun' },
    { value: 'BE', text: 'Békés' },
    { value: 'BA', text: 'Baranya' },
    { value: 'BZ', text: 'Borsod-Abaúj-Zemplén' },
    { value: 'BU', text: 'Budapest' },
    { value: 'CS', text: 'Csongrád' },
    { value: 'FE', text: 'Fejér' },
    { value: 'GS', text: 'Győr-Moson-Sopron' },
    { value: 'HB', text: 'Hajdú-Bihar' },
    { value: 'HE', text: 'Heves' },
    { value: 'JN', text: 'Jász-Nagykun-Szolnok' },
    { value: 'KE', text: 'Komárom-Esztergom' },
    { value: 'NO', text: 'Nógrád' },
    { value: 'PE', text: 'Pest' },
    { value: 'SO', text: 'Somogy' },
    { value: 'SZ', text: 'Szabolcs-Szatmár-Bereg' },
    { value: 'TO', text: 'Tolna' },
    { value: 'VA', text: 'Vas' },
    { value: 'VE', text: 'Veszprém' },
    { value: 'ZA', text: 'Zala' },

  ];
}

export function eduLevelOptions() {
  return [
    {
      value: ALTALANOSNAL_KEVESEBB,
      text: '8 általánosnál kevesebb'
    },
    {
      value: ALTALANOS,
      text: '8 általános'
    },
    {
      value: ALTALANOS_OKJ,
      text: '8 általános és OKJ-s végzettség'
    },
    {
      value: ERETTSEGI,
      text: 'Érettségi'
    },
    {
      value: FELSOFOKU_SZAKKEPZES,
      text: 'Felsőfokú szakképzés'
    },
    {
      value: FOISKOLA,
      text: 'Főiskola'
    },
    {
      value: EGYETEM,
      text: 'Egyetem'
    }
  ];
}

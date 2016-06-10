export const ALTALANOSNAL_KEVESEBB = 'ALTALANOSNAL_KEVESEBB';
export const ALTALANOS = 'ALTALANOS';
export const ALTALANOS_OKJ = 'ALTALANOS_OKJ';
export const ERETTSEGI = 'ERETTSEGI';
export const FELSOFOKU_SZAKKEPZES = 'FELSOFOKU_SZAKKEPZES';
export const FOISKOLA = 'FOISKOLA';
export const EGYETEM = 'EGYETEM';

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
  ]
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
  ]
}

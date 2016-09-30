import * as fieldTypes from './fieldTypes';
export const ALTALANOSNAL_KEVESEBB = 'ALTALANOSNAL_KEVESEBB';
export const ALTALANOS = 'ALTALANOS';
export const ALTALANOS_OKJ = 'ALTALANOS_OKJ';
export const SZAKMUNKAS_SZAKKOZEP = 'SZAKMUNKAS_SZAKKOZEP';
export const ERETTSEGI = 'ERETTSEGI';
export const FELSOFOKU_SZAKKEPZES = 'FELSOFOKU_SZAKKEPZES';
export const FOISKOLA = 'FOISKOLA';
export const EGYETEM = 'EGYETEM';

const allRelationOptions = [
  { value: '=', text: '=' },
  { value: '<', text: '<' },
  { value: '>', text: '>' },
  { value: '<=', text: '<=' },
  { value: '>=', text: '>=' }
];

export function relationOptions(type = '') {
  return type === fieldTypes.STRING
    ? [...allRelationOptions,
    { value: 'LIKE', text: 'LIKE' },
    { value: 'NOT LIKE', text: 'NOT LIKE' }]
    : allRelationOptions;
}

export function yesnoOptions(noExtraQuestion,yesExtraQuestion) {
  return [
    {
      value: '0',
      text: 'Nem',
      extraQuestion:noExtraQuestion || undefined
    },
    {
      value: '1',
      text: 'Igen',
      extraQuestion:yesExtraQuestion || undefined
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

export function genderOptions() {
  return [
    {
      value: 'M',
      text: 'Férfi'
    },
    {
      value: 'F',
      text: 'Nő'
    }
  ];
}

export function kepzesiHelyszinOptions() {
  return [
    {
      value: '0',
      text: 'Nem tudok 3 héten át bejárni a képzésre'
    },
    {
      value: 'Pécs',
      text: 'Pécs'
    },

    {
      value: 'Kaposvár',
      text: 'Kaposvár'
    },
    {
      value: 'Szekszárd',
      text: 'Szekszárd'
    }

  ];
}

export function alternativeKepzesiHelyszinOptions() {
  return [
    {
      value: '0',
      text: 'Nem tudok másik városba átjárni a képzésre'
    },
    {
      value: 'Pecs',
      text: 'Igen, Pécsre át tudnék járni'
    },

    {
      value: 'Kaposvar',
      text: 'Igen, Kaposvárra át tudnék járni'
    },
    {
      value: 'Szekszard',
      text: 'Igen, Szekszárdra át tudnék járni'
    }

  ];
}

export function honnanErtesultOptions() {
  return [
    {
      text: 'Hírlevélből (pl. vallalkozzitthon.hu, Széchenyi Programiroda, fivosz.hu, iskola, pályázatíró hírlevele...).',
      value: 'hirlevelbol',
      extraQuestion:'Kérjük, írja le, mely szervezettől érkezett a hírlevél?'
    },    {
      text: 'Munkaügyi szervezettől (Kormányhivatal, Járási Hivatal, volt munkaügyi központ).',
      value: 'munkaugyi_szervezettol',
      extraQuestion:'Melyik hivataltól kapta az információt?'
    },
    {
      text: 'Széchenyi Programiroda (SZPI) értesített.',
      value: 'szechenyi_programiroda',
      extraQuestion:'Ha emlékszik az ügyintéző nevére, kérjük, írja be, ha nem, írja be, melyik településen kapta az információt?'
    },
    {
      text: 'Helyi, települési, megyei önkormányzattól kaptam a hírt.',
      value: 'onkormanyzat',
      extraQuestion:'Melyik önkörmányzattól kapta a hírt?'
    },
    {
      text: 'Az iskolám, vagy más helyi szervezet, intézmény plakátjáról, vagy értesítéséből tudok a lehetőségről.',
      value: 'helyi_szervezet',
      extraQuestion:'Melyik iskolán vagy szervezeten keresztül értesült a lehetőségről?'
    },
    {
      text: 'Helyi TV-ből, rádióból.',
      value: 'helyi_tv_radio',
      extraQuestion:'Melyik helyi TV-ből, vagy rádióból értesült a hírről?'
    },
    {
      text: 'Helyi újságból.',
      value: 'helyi_ujsag',
      extraQuestion:'Melyik helyi újságból értesült a hírről?'
    },
    {
      text: 'Országos TV-ből, rádióból.',
      value: 'orszagos_tv_radio',
      extraQuestion:'Melyik országos TV-ből, vagy rádióból értesült a hírről?'
    },
    {
      text: 'Országos napi, vagy hetilapból.',
      value: 'orszagos_ujsag',
      extraQuestion:'Melyik országos újságból értesült a hírről?'
    },
    {
      text: 'Interneten láttam az információt.',
      value: 'internet',
      extraQuestion:'Melyik honlapon, vagy melyik oldalon látta az információt'
    },
    {
      text: 'Szüleim, vagy egy családtag hallottak a lehetőségről.',
      value: 'rokon',
      extraQuestion:'Milyen családtagtól?(apa, anya, unokatestvér) értesült a hírről?'
    },
    {
      text: 'Egy barátom, ismerősöm értesített róla.',
      value: 'barat',
      extraQuestion:'Hogyan értesítette(szóban, telefonon, emailben) a barátja a hírről?'
    },
    {
      text: 'Magam kerestem meg a pályázati lehetőséget.',
      value: 'sajat_magam',
      extraQuestion:'Hol talált róla információt(melyik honlapon, újságban, szervezetnél)?'
    },
    {
      text: 'Pályázatíró cég értesített.',
      value: 'palyazatiro_ceg',
      extraQuestion:'Melyik cég értesítette?'
    },
    {
      text: 'Egyéb.',
      value: 'Egyeb',
      extraQuestion:'Egyéb, éspedig?'
    }
  ];
}

export function kisebbsegiOptions() {
  return [
    {
      text: 'Kisebbségi csoporthoz tartozom.',
      value: 'kisebbseg'
    },
    {
      text: 'Roma származásúnak vallom magam.',
      value: 'roma'
    },
    {
      text: 'Migráns/bevándorló vagyok.',
      value: 'migrans'
    },
    {
      text: 'Fogyatékkal élek.',
      value: 'fogyatekkel_elek'
    },
    {
      text: 'Egyéb hátrányos helyzetű csoportba tartozom.',
      value: 'egyeb_hatranyos',
      extraQuestion:'Melyik hátrányos helyzetű csoportba tartozik?'
    },
    {
      text: 'Nyilatkozom, hogy a felsorolt hátrányos helyzetű csoportok egyikébe sem tartozom..',
      value: 'nem_tartozom',
    },
  ];
}

export function vallalkozasFormajaOptions() {
  return [
    {
      text: 'Korlátolt felelősségű társaság - GFO 113',
      value: 'GFO113'
    },
    {
      text: 'Betéti társaság - GFO 117',
      value: 'GFO117'
    },
    {
      text: 'Egyéni vállalkozó - GFO 231',
      value: 'GFO231'
    },
    {
      text: 'Egyéb önálló vállalkozó - GFO 232',
      value: 'GFO232'
    },
    {
      text: 'Más formában.',
      value: 'mas_formaban',
      extraQuestion:'Mégpedig?'
    },
    {
      text: 'Még nem tudom.',
      value: 'nem_tudom',
    },
  ];
}



export function vallalkozasSzektoraOptions() {
  return [
    {
      text: 'Kereskedelem',
      value: 'kereskedelem'
    },
    {
      text: 'Szolgáltatás',
      value: 'szolgaltatas'
    },
    {
      text: 'Termelés',
      value: 'termeles'
    },
    {
      text: 'Innovatív vállalkozások',
      value: 'innovativ_vallalkozasok'
    },
    {
      text: 'Szoftverfejlesztés',
      value: 'szoftverfejlesztes',
    },
    {
      text: 'Még nem tudom.',
      value: 'nem_tudom',
    },
  ];
}


export function kivelVallalkozikOptions() {
  return [
    {
      text: 'Egyedül',
      value: 'egyedul'
    },
    {
      text: 'Családtag(ok)',
      value: 'csaladtagok'
    },
    {
      text: 'Barát(ok)',
      value: 'baratok'
    },
    {
      text: 'Korábbi munka/üzleti kapcsolat',
      value: 'korabbi_munka'
    },
    {
      text: 'Egyéb',
      value: 'egyeb',
      extraQuestion:'Éspedig?'
    },
  ];
}


export function megfeleloIdopontOptions() {
  return [
    {
      text: 'Nem tudok 3 héten át bejárni a képzésre',
      value: 'nem_tudok_bejarni'
    },
    {
      text: '2016. októbere vagy novembere',
      value: '2016_okt_nov'
    },
    {
      text: '2017. február vagy március',
      value: '2017_feb_mar'
    },
    {
      text: '2017. szeptember vagy október',
      value: '2017_szep_okt'
    }
  ];
}


export function vonatberletOptions() {
  return [
    {
      text: 'Megoldom a képzésre való eljutást, nem kérek bérletet',
      value: 'nem_kerek'
    },
    {
      text: 'Csak akkor kérek bérletet, ha nem az elsődlegesen bejelölt megyeszékhelyen jutok be a képzésbe',
      value: 'kerek_ha_mas_megyeszekhely'
    },
    {
      text: 'Igen, a képzésre utazáshoz igénylek bérletet. A 30 napos vasúti vagy buszbérlet ára a lakóhelyemről az elsődlegesen megjelölt képzési helyszínig (megyeszékhelyig)',
      value: 'kerek',
      extraQuestion:'Vonat vagy buszbérlet közül annak az árát írja be, amelyikkel utazni szeretne. Ha nem tudja a pontos összeget, írja be, kb. mennyibe kerülhet a 30 napos bérlet? (Ft)'
    }
  ];
}


export function allaskeresokentRegisztraltOptions() {
  return [
    {
      text: 'Igen, megszakítás nélkül álláskeresőként vagyok regisztrálva.',
      value: '1'
    },
    {
      text: 'Nem',
      value: '0'
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
      value: SZAKMUNKAS_SZAKKOZEP,
      text: 'Szakmunkás, szakközépiskolai végzettség'
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

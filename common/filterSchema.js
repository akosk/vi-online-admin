import * as types from './fieldTypes';
import * as inputHelper from './SelectInputHelper';
import * as validation from './validation';
import _ from 'lodash';

export const RATING_TYPE_AUTO = "RATING_TYPE_AUTO";
export const RATING_TYPE_MANUAL = "RATING_TYPE_MANUAL";

export const getTablesAsOptions = ()=> {
  return schema.map((i)=> {
    return {
      value: i.id,
      text: i.name
    }
  })
};

export const getFieldsAsOptions = (tableId)=> {
  const table = _.find(schema, (i)=> {
    return i.id == tableId
  });
  if (!table) return;


  return table.fields.map((i)=> {
    return {
      value: i.rname,
      text: i.name
    }
  })

};

export const findField = (tableId, fieldName) => {
  const table = _.find(schema, (i)=> {
    return i.id == tableId
  });
  if (!table) return;
  return _.find(table.fields, (i)=> {
    return i.rname === fieldName
  });
};

export const findTable = (tableId) => {
  const table = _.find(schema, (i)=> {
    return i.id == tableId
  });
  return table;
};

export const schema = [
  {
    id: 1,
    rname: "users",
    name: "Felhasználók",
    "fields": [
      {
        rname: "email",
        name: "Email",
        type: types.STRING
      },
      {
        rname: "name",
        name: "Név",
        type: types.STRING
      },
      {
        rname: "role",
        name: "Szerepkör",
        type: types.SELECT,
        options: inputHelper.roleOptions()
      },
    ]
  },

  {
    id: 2,
    rname: "userturns",
    name: "Felhasználó turnusadatai",
    "fields": [
      {
        rname: "progress",
        name: "Haladás",
        type: types.ENTRY,
        options: inputHelper.progressOptions()
      },
    ]
  },

  {
    id: 3,
    rname: "signup_datas",
    name: "Alapinformáció, vállalkozási alapfeltétel",
    "fields": [
      {
        rname: "honnan_ertesult",
        name: "Honnan értesült",
        longName:"Honnan értesült a pályázati lehetőségről?",
        type: types.MULTICHECKBOX,
        options: inputHelper.honnanErtesultOptions()
      },
      {
        rname: "tobbsegi_tulajdon_mas_vallalkozasban",
        name: "Többségi tulajdonos más vállakozásban",
        longName:"Más vállalkozásnak egyedüli vagy többségi tulajdonosa-e, illetve rendelkezik-e más vállalkozásban közvetlen vagy közvetett többségi befolyást biztosító részesedéssel?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '0': 0,
          '1': -10
        },
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "vezeto_tisztsegviselo_mas_vallalkozasban",
        name: "Vezető tisztségviselő más vállalkozásban",
        longName:"Más vállalkozásban tölt-e be jelenleg vezető tisztségviselői posztot?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '0': 0,
          '1': -10
        },
        options: inputHelper.yesnoOptions()
      },

      {
        rname: "korabban_vallalkozo",
        name: "Korábban vállalkozó",
        longName:"Volt-e korábban bármikor egyéni vállalkozó, volt-e már korábban vállalkozás többségi tulajdonosa, vagy  töltött-e már be más vállalkozásban vezető tisztségviselői posztot?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '0': 0,
          '1': 10
        },
        options: inputHelper.yesnoOptions()
      },

      {
        rname: "vallalkozas_szekhelye_megye",
        name: "Vállalkozás székhelye (megye)",
        longName:"Melyik megyében lesz a leendő vállalkozásának székhelye?",
        type: types.SELECT,
        rating: RATING_TYPE_AUTO,
        ratings: inputHelper.megyekOptions()
                            .reduce((prev, current, index, array)=> {
                              const score = ['BA', 'SO', 'TO'].indexOf(current.value) === -1 ? -1000 : 0;
                              prev[current.value] = score;
                              return prev;
                            }, {}),
        options: inputHelper.megyekOptions()
      },

      {
        rname: "vallalkozas_szekhelye_telepules",
        name: "Vállalkozás székhelye (település)",
        longName:"Melyik településen lesz a vállalkozásának székhelye?",
        type: types.STRING,
      },
      {
        rname: "kepzes_helye",
        name: "Képzés helye",
        longName:"Amennyiben bekerül a programba, elsősorban melyik megyeszékhelyen venne részt személyesen a 3 hétig tartó 90 órás vállalkozói képzésen?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '0': -10
        },
        options: inputHelper.kepzesiHelyszinOptions()
      },
      {
        rname: "alternativ_kepzes_helye",
        name: "Képzés helye (alternatív)",
        longName:"Amennyiben az előbb jelölt megyeszékhelyen nem tudna bekerülni a képzési csoportba, másik megyeszékhelyre be tudna járni személyesen a 3 hétig tartó 90 órás vállalkozói képzésre?",
        type: types.RADIOGROUP,
        options: inputHelper.alternativeKepzesiHelyszinOptions()
      },
      {
        rname: "megfelelo_idopont",
        name: "Megfelelő időpont",
        longName:"Melyik időpont lenne Önnek legmegfelelőbb a programba lépésre és a 90 órás vállalkozói képzés megkezdésére?",
        type: types.RADIOGROUP,
        options: inputHelper.megfeleloIdopontOptions()
      },
      {
        rname: "vonatberlet",
        name: "Vonatberlet",
        longName:"Szeretne-e a a 90 órás vállalkozói képzés idejére busz- vagy vonatbérletet kérni?",
        type: types.RADIOGROUP,
        options: inputHelper.vonatberletOptions()
      },

    ]
  },

  {
    id: 4,
    rname: "signup_datas",
    name: "Személyes adatok",
    "fields": [
      {
        rname: "name",
        name: "Jelentkező neve",
        type: types.STRING
      },
      {
        rname: "birth_name",
        name: "Születési név",
        type: types.STRING
      },
      {
        rname: "gender",
        name: "Nem",
        longName:"Neme?",
        type: types.RADIOGROUP,
        options: inputHelper.genderOptions()
      },
      {
        rname: "birth_date",
        name: "Születési idő",
        type: types.DATE,
      },
      {
        rname: "birth_category",
        name: "Születési kategória",
        type: types.ENTRY,
        options: inputHelper.birthCategoriesOptions()
      },

      {
        rname: "birth_category",
        name: "Születési kategória",
        calculated: true,
        type: types.SELECT,
        rating: RATING_TYPE_AUTO,
        ratings: {
          [validation.TURN_USER_UNDER_18]: -1000,
          [validation.TURN_USER_OVERAGE]: -1000,
        },

        options: inputHelper.birthCategoriesOptions(),
      },
      {
        rname: "birth_place",
        name: "Születési hely",
        type: types.STRING,
      },
      {
        rname: "mothers_name",
        name: "Anyja leánykori neve",
        type: types.STRING,
      },
      {
        rname: "permanent_address_zip",
        name: "Állandó lakcím irányítószám",
        type: types.STRING,
      },
      {
        rname: "permanent_address_settlement",
        name: "Állandó lakcím település",
        type: types.STRING,
      },
      {
        rname: "permanent_address_street",
        name: "Állandó lakcím utca és házszám",
        type: types.STRING,
      },
      {
        rname: "temporary_address",
        name: "Tartózkodási hely",
        type: types.STRING,
      },
      {
        rname: "postal_address",
        name: "Postázási cím",
        type: types.STRING,
      },
      {
        rname: "phone",
        name: "Elérhetőségek (telefonszám)",
        type: types.STRING,
      },
      {
        rname: "email",
        name: "Elérhetőségek (e-mail cím)",
        type: types.STRING,
      },
      {
        rname: "legmagasabb_iskolai_vegzettseg",
        name: "Legmagasabb iskolai végzettsége",
        type: types.SELECT,
        rating: RATING_TYPE_AUTO,
        ratings: {
          [inputHelper.ALTALANOSNAL_KEVESEBB]: -1000,
          [inputHelper.ALTALANOS]: -10,
          [inputHelper.ALTALANOS_OKJ]: -5,
          [inputHelper.SZAKMUNKAS_SZAKKOZEP]: 0,
          [inputHelper.ERETTSEGI]: 5,
          [inputHelper.FELSOFOKU_SZAKKEPZES]: 7,
          [inputHelper.FOISKOLA]: 10,
          [inputHelper.EGYETEM]: 10,
        },
        options: inputHelper.eduLevelOptions()
      },
      {
        rname: "legmagasabb_iskolai_vegzettseg_eve",
        name: "Legmagasabb iskolai végzettség éve",
        type: types.STRING,
      },
      {
        rname: "allaskeresokent_regisztralt",
        name: "Regisztrált álláskereső",
        longName:"Ön regisztrált álláskereső jelenleg?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '1': 30,
          '0': -10
        },
        options: inputHelper.allaskeresokentRegisztraltOptions()
      },
      {
        rname: "allaskeresokent_regisztralt_datuma",
        name: "Álláskeresés regisztrációjának ideje",
        longName:"Álláskeresőként mikor regisztrálta magát?",
        type: types.DATE,
      },
      {
        rname: "allaskeresokent_regisztralt_telepules",
        name: "Melyik településen regisztrált álláskeresőként",
        longName:"Melyik településen regisztrált álláskeresőként (Település neve)?",
        type: types.STRING,
      },
      {
        rname: "palyakezdo_allaskereso",
        name: "Pályakezdő álláskereső",
        longName:"Pályakezdő álláskereső-e?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '1': 10,
          '0': 0
        },
        options: inputHelper.allaskeresokentRegisztraltOptions()
      },
      {
        rname: "adoazonosito_jel",
        name: "Adóazonosító jel",
        type: types.STRING,
      },
      {
        rname: "taj",
        name: "TAJ-szám",
        type: types.STRING,
      },
      {
        rname: "kisebbsegi_vagy_hatranyos",
        name: "Kisebbségi vagy hátrányos",
        longName:"Kisebbségi, vagy hátrányos helyzetű csoporthoz tartozik-e?",
        type: types.MULTICHECKBOX,
        options: inputHelper.kisebbsegiOptions()
      },
    ]
  },

  {
    id: 5,
    rname: "signup_datas",
    name: "Vállalkozástervezés",
    "fields": [
      {
        rname: "miert_szeretne_vallalkozast_inditani",
        name: "Miért szeretne vállalkozást indítani",
        longName:"Miért szeretne vállalkozást indítani? Mi motiválja, hogy vállalkozó legyen, vannak-e jó példák Ön előtt, van-e már valamilyen vállalkozási tapasztalata? Foglalja össze röviden, (maximum 1200 karakterben)!",
        rating: RATING_TYPE_MANUAL,
        type: types.TEXT
      },
      {
        rname: "mivel_foglalkozik_a_vallalkozas",
        name: "Mivel foglalkozik majd a vállalkozása",
        longName:"Írja le röviden (maximum 1000 karakterben), mivel foglalkozik majd a vállalkozása, milyen terméket, szolgáltatást kínál, kik lesznek a vevői, ügyfelei?",
        rating: RATING_TYPE_MANUAL,
        type: types.TEXT
      },
      {
        rname: "piackutatast_vegzett",
        name: "Piackutatást végzett",
        longName:"Végzett-e már piackutatást leendő vállalkozásával kapcsolatban?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_MANUAL,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "piackutatast_vegzett_bemutatas",
        name: "Piackutatás bemutatása",
        longName:"Ha végzett piackutatást, mutassa be röviden (maximum 1000 karakterben) a piackutatás eredményét!",
        type: types.TEXT,
      },
      {
        rname: "vallalkozas_formaja",
        name: "Vállalkozás formája",
        longName:"Milyen formában kívánja létrehozni vállalkozását?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          'GFO113': 10,
          'GFO117': 10,
          'GFO231': 10,
          'GFO232': 10,
          'mas_formaban': -10,
          'nem_tudom': -10,
        },
        options: inputHelper.vallalkozasFormajaOptions()
      },
      {
        rname: "vallalkozas_szektora",
        name: "Vállalkozás szektora",
        longName:"Milyen szektorban tervezi indítani vállalkozását?",
        type: types.RADIOGROUP,
        options: inputHelper.vallalkozasSzektoraOptions()
      },
      {
        rname: "kivel_vallalkozik",
        name: "Kivel vállalkozik",
        longName:"Kivel/Kikkel tervezi vállalkozását létrehozni?",
        type: types.MULTICHECKBOX,
        options: inputHelper.kivelVallalkozikOptions()
      },
      {
        rname: "elso_12_honapban_alkalmazottat_vesz_fel",
        name: "Első 12 hónapban alkalmazottat vesz fel",
        longName:"Tervezi-e, hogy már az első 12 hónapban alkalmazottat vesz fel?",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "harmadik_evben_hany_alkalmazott_lesz",
        name: "Harmadik évben hány alkalmazott lesz",
        longName:"Tervei szerint az indulást követő harmadik évben hány alkalmazottja lesz a cégének?",
        type: types.STRING
      },
      {
        rname: "vallalkozast_legalabb_4_evig_fenntartja",
        name: "Vállalkozást legalább 4 évig fenntartja",
        longName:"Vállalja-e, hogy vállalkozását megalapítástól kezdve legalább 4 évig fenntartja?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '1': 10,
          '0': -10,
        },
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "vallalkozast_legalább_4_evig_mukodteti",
        name: "Vállalkozást legalább 4 évig mukodteti",
        longName:"Vállalja-e, hogy személyes közreműködőként részt vesz a vállalkozásának működtetésében az alapítást követően legalább 4 évig?",
        type: types.RADIOGROUP,
        rating: RATING_TYPE_AUTO,
        ratings: {
          '1': 10,
          '0': -10,
        },
        options: inputHelper.yesnoOptions()
      },
    ]
  },
];

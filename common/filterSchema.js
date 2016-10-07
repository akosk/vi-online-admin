import * as types from './fieldTypes';
import * as inputHelper from './SelectInputHelper';
import _ from 'lodash';

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
}

export const findTable = (tableId) => {
  const table = _.find(schema, (i)=> {
    return i.id == tableId
  });
  return table;
}



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
        type: types.MULTICHECKBOX,
        options: inputHelper.honnanErtesultOptions()
      },
      {
        rname: "tobbsegi_tulajdon_mas_vallalkozasban",
        name: "Többségi tulajdonos más vállakozásban",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "vezeto_tisztsegviselo_mas_vallalkozasban",
        name: "Vezető tisztségviselő más vállalkozásban",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },

      {
        rname: "korabban_vallalkozo",
        name: "Korábban vállalkozó",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },

      {
        rname: "vallalkozas_szekhelye_megye",
        name: "Vállalkozás székhelye (megye)",
        type: types.SELECT,
        options: inputHelper.megyekOptions()
      },

      {
        rname: "vallalkozas_szekhelye_telepules",
        name: "Vállalkozás székhelye (település)",
        type: types.STRING,
      },
      {
        rname: "kepzes_helye",
        name: "Képzés helye",
        type: types.RADIOGROUP,
        options: inputHelper.kepzesiHelyszinOptions()
      },
      {
        rname: "alternativ_kepzes_helye",
        name: "Képzés helye (alternatív)",
        type: types.RADIOGROUP,
        options: inputHelper.alternativeKepzesiHelyszinOptions()
      },
      {
        rname: "megfelelo_idopont",
        name: "Megfelelő időpont",
        type: types.RADIOGROUP,
        options: inputHelper.megfeleloIdopontOptions()
      },
      {
        rname: "vonatberlet",
        name: "Vonatberlet",
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
        name: "Név",
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
        type: types.RADIOGROUP,
        options: inputHelper.genderOptions()
      },
      {
        rname: "birth_date",
        name: "Születési idő",
        type: types.DATE,
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
        type: types.RADIOGROUP,
        options: inputHelper.allaskeresokentRegisztraltOptions()
      },
      {
        rname: "allaskeresokent_regisztralt_datuma",
        name: "Álláskeresés regisztrációjának ideje",
        type: types.DATE,
      },
      {
        rname: "allaskeresokent_regisztralt_telepules",
        name: "Melyik településen regisztrált álláskeresőként",
        type: types.STRING,
      },
      {
        rname: "palyakezdo_allaskereso",
        name: "Pályakezdő álláskereső",
        type: types.RADIOGROUP,
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
        type: types.STRING
      },
      {
        rname: "mivel_foglalkozik_a_vallalkozas",
        name: "Mivel foglalkozik majd a vállalkozása",
        type: types.STRING
      },
      {
        rname: "piackutatast_vegzett",
        name: "Piackutatást végzett",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "piackutatast_vegzett_bemutatas",
        name: "Piackutatás bemutatása",
        type: types.DATE,
      },
      {
        rname: "vallalkozas_formaja",
        name: "Vállalkozás formája",
        type: types.RADIOGROUP,
        options: inputHelper.vallalkozasFormajaOptions()
      },
      {
        rname: "vallalkozas_szektora",
        name: "Vállalkozás szektora",
        type: types.RADIOGROUP,
        options: inputHelper.vallalkozasSzektoraOptions()
      },
      {
        rname: "kivel_vallalkozik",
        name: "Kivel vállalkozik",
        type: types.MULTICHECKBOX,
        options: inputHelper.kivelVallalkozikOptions()
      },
      {
        rname: "elso_12_honapban_alkalmazottat_vesz_fel",
        name: "Első 12 hónapban alkalmazottat vesz fel",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "harmadik_evben_hany_alkalmazott_lesz",
        name: "Harmadik évben hány alkalmazott lesz",
        type: types.STRING
      },
      {
        rname: "vallalkozast_legalabb_4_evig_fenntartja",
        name: "Vállalkozást legalább 4 évig fenntartja",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "vallalkozast_legalább_4_evig_mukodteti",
        name: "Vállalkozást legalább 4 évig mukodteti",
        type: types.RADIOGROUP,
        options: inputHelper.yesnoOptions()
      },
    ]
  },
];

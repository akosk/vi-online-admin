import * as types from './fieldTypes';
import * as inputHelper from './SelectInputHelper';
import _ from 'lodash';

export const getTablesAsOptions = ()=> {
  return schema.map((i)=> {
    return {
      value: i.rname,
      text: i.name
    }
  })
};

export const getFieldsAsOptions = (tablename)=> {
  const table = _.find(schema, (i)=> {
    return i.rname === tablename
  });
  if (!table) return;

  return table.fields.map((i)=> {
    return {
      value: i.rname,
      text: i.name
    }
  })
};

export const findField = (tableName, fieldName) => {
  const table = _.find(schema, (i)=> {
    return i.rname === tableName
  });
  if (!table) return;
  return _.find(table.fields, (i)=> {
    return i.rname === fieldName
  });
}

export const findTable = (tableName) => {
  const table = _.find(schema, (i)=> {
    return i.rname === tableName
  });
  return table;
}

///r.db('vi_del_dunantul')
//  .table("usertests")
//  .filter(function (doc){
//    return doc("questions").contains(function(q){
//      return q("id").eq("q_0").and(q("value").eq("Miskolc"))
//    }

export const schema = [

  {
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
    rname: "signup_datas",
    name: "Alapinformáció, vállalkozási alapfeltétel",
    "fields": [
      {
        rname: "honnan_ertesult",
        name: "Honnan értesült",
        type: types.MULTICHECKBOX,
        options:inputHelper.honnanErtesultOptions()
      },
      {
        rname: "allaskeresokent_regisztralt",
        name: "Álláskeresőként regisztrált",
        type: types.SELECT,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "allaskeresokent_regisztralt_datuma",
        name: "Álláskeresőként regisztrált dátuma",
        type: types.DATE
      },
      {
        rname: "birth_date",
        name: "Születési idő",
        type: types.DATE
      },
      {
        rname: "birth_name",
        name: "Születési név",
        type: types.STRING
      },
      {
        rname: "birth_place",
        name: "Születés helye",
        type: types.STRING
      },
      {
        rname: "created_at",
        name: "Létrehozva",
        type: types.DATE
      },
      {
        rname: "email",
        name: "Email",
        type: types.STRING
      },
      {
        rname: "kepzesi_helyszin",
        name: "Képzési helyszín",
        type: types.STRING
      },
      {
        rname: "kisebbsegi_vagy_hatranyos",
        name: "Kisebbségi vagy hátrányos",
        type: types.SELECT,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "legmagasabb_iskolai_vegzettseg",
        name: "Legmagasabb iskolai végzettség",
        type: types.STRING
      },
      {
        rname: "legmagasabb_iskolai_vegzettseg_eve",
        name: "Legmagasabb iskolai végzettség éve",
        type: types.STRING
      },
      {
        rname: "mothers_name",
        name: "Anyja neve",
        type: types.STRING
      },
      {
        rname: "name",
        name: "Név",
        type: types.STRING
      },
      {
        rname: "palyakezdo_allaskereso",
        name: "Pályakezdő álláskereső",
        type: types.SELECT,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "permanent_address",
        name: "Állandó lakcím",
        type: types.STRING
      },
      {
        rname: "phone",
        name: "Telefon",
        type: types.STRING
      },
      {
        rname: "postal_address",
        name: "Postázási cím",
        type: types.STRING
      },
      {
        rname: "taj",
        name: "Tajszám",
        type: types.STRING
      },
      {
        rname: "temporary_address",
        name: "Tartózkodási hely",
        type: types.STRING
      },
      {
        rname: "tobbsegi_tulajdon_mas_vallalkozasban",
        name: "Többségi tulajdonos más vállakozásban",
        type: types.SELECT,
        options: inputHelper.yesnoOptions()
      },
      {
        rname: "updated_at",
        name: "Módosítva",
        type: types.DATE
      },
      {
        rname: "vallalkozas_szekhelye",
        name: "Vállalkozs székhelye",
        type: types.STRING
      },
    ]
  }
];

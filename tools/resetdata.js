var r = require("rethinkdb");
var async = require("async");

var data = {
  users: [{
    "email": "admin@admin.hu",
    "id": "d49dda99-28ce-444a-a59a-ce5441b85459",
    "name": "Admin Andrea",
    "password": "$2a$10$n1ibxVDRwPpHsao7suMmEO1dmxaLnjTohr0XxcCMwWvT61ZKfP9Ei",
    "role": "admin"
  }, {
    "email": "akos.kiszely@gmail.com",
    "id": "daacd210-e114-452f-95fd-8a2ef3b7a419",
    "name": "Kiszely Ákos",
    "password": "$2a$10$VoOTxbjnFMOstIRhIe/LLuOYL.hcKSHrAWSlFGTPdQbIwBJFb7e3e",
    "role": "user"
  }],
  turns: [{
    "active": true,
    "competency_test": { "end_at": 1466071650937, "id": "12724bc9-9874-41c4-8d5e-7aaf6f642dfe", "start_at": 1466071650937 },
    "id": "12724bc9-9874-41c4-8d5e-7aaf6f642df",
    "name": "Teszt turnus 1.",
    "slug": "teszt-turnus-1",
    "start_at": 1466071650937
  }],
  tests: [{
    "id": "12724bc9-9874-41c4-8d5e-7aaf6f642dfe",
    "name": "Kompetencia teszt 1.",
    "questions": [{
      "question": "Mely településen lesz leendő vállakozásának székhelye",
      "type": "text"
    }, {
      "question": "Tervezett vállalkozási forma",
      "type": "text"
    }, {
      "question": "Milyen szektorban tervezi indítani vállalkozását",
      "type": "text"
    }, {
      "question": "Leendő vállalkozás tervezett tevékenységi területe",
      "type": "text"
    }, {
      "question": "Miért szeretne vállalkozást indítani",
      "type": "text"
    }, { "question": "Kivel/Kikkel tervezi vállalkozását létrehozni", "type": "text" }, {
      "answers": [{
        "text": "Igen",
        "value": "Igen"
      }, { "text": "Nem", "value": "Nem" }],
      "question": "Vállalja-e, hogy vállalkozását megalapítástól kezdve legalább 4 évig fenntartja?",
      "type": "select"
    }, {
      "answers": [{ "text": "Igen", "value": "Igen" }, { "text": "Nem", "value": "Nem" }],
      "question": "Vállalja-e, hogy személyes közreműködőként részt vesz a vállalkozásának működtetésében az alapítást követően legalább 4 évig?",
      "type": "select"
    }, {
      "answers": [{
        "helptext": "*az álláskeresők közül azok a felsőfokú végzettséggel rendelkező, 30. életévüket be nem töltött fiatalok, akik tanulmányaik befejezését követően munkanélküli ellátásra nem szereztek jogosultságot.",
        "text": "25 és 30 év közötti pályakezdő álláskereső* vagyok",
        "value": "25 és 30 év közötti pályakezdő álláskereső* vagyok"
      }, {
        "text": "Kevesebb, mint 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és 18 és 25 év közötti fiatal vagyok",
        "value": "Kevesebb, mint 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és 18 és 25 év közötti fiatal vagyok"
      }, {
        "text": "Legalább 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és 18 és 25 év közötti fiatal vagyok",
        "value": "Legalább 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és 18 és 25 év közötti fiatal vagyok"
      }, {
        "helptext": "*nem vesz részt oktatásban és nem dolgozik.",
        "text": "18 és 25 év közötti Inaktív fiatal* vagyok",
        "value": "18 és 25 év közötti Inaktív fiatal* vagyok"
      }], "question": "Kérjük, válassza ki az Önre illőt!", "type": "select"
    }, {
      "answers": [{ "text": "Igen", "value": "Igen" }, { "text": "Nem", "value": "Nem" }],
      "helptext": "*van olyan vállalkozás a családban vagy ismeretségi körben, amelyben 50 %-nál nagyobb részesedése van a pályázónak.",
      "question": "Más vállalkozásban többségi tulajdonnal rendelkezem*",
      "type": "select"
    }, {
      "answers": [{ "text": "Pécs", "value": "Pécs" }, {
        "text": "Szekszárd",
        "value": "Szekszárd"
      }, { "text": "Kaposvár", "value": "Kaposvár" }],
      "question": "A képzés és tanácsadások választott helyszíne",
      "type": "select"
    }, {
      "answers": [{ "text": "Igen", "value": "Igen" }, { "text": "Nem", "value": "Nem" }],
      "question": "Rendelkezem a vállalkozás indításához szükséges üzleti ötlettel",
      "type": "select"
    }, {
      "answers": [{ "text": "Szolgáltatás", "value": "Szolgáltatás" }, {
        "text": "Ipar",
        "value": "Ipar"
      }, { "text": "Termelés", "value": "Termelés" }, {
        "text": "Kereskedelem",
        "value": "Kereskedelem"
      }, { "text": "Kutatás és innováció", "value": "Kutatás és innováció" }, {
        "text": "Mezőgazdasági termelés",
        "value": "Mezőgazdasági termelés"
      }, { "text": "Halászat, akvakultúra", "value": "Halászat, akvakultúra" }, { "text": "Egyéb", "value": "Egyéb" }],
      "question": "Üzleti ötletem az alábbi tevékenységi körhöz kapcsolódik",
      "type": "select"
    }, {
      "answers": [{ "text": "Helyi, településszintű", "value": "Helyi, településszintű" }, {
        "text": "Megyei",
        "value": "Megyei"
      }, { "text": "Régiós", "value": "Régiós" }, { "text": "Országos", "value": "Országos" }, {
        "text": "Nemzetközi",
        "value": "Nemzetközi"
      }], "question": "Üzleti ötletem hatóköre", "type": "select"
    }, {
      "answers": [{ "text": "3", "value": "3" }, { "text": "3-5", "value": "3-5" }, {
        "text": "minimum 5",
        "value": "minimum 5"
      }], "question": "Kialakítani kívánt piaci kapcsolataim száma a fizikai befejezésig", "type": "select"
    }, {
      "answers": [{ "text": "minimum 100000 Ft", "value": "minimum 100000 Ft" }, {
        "text": "minimum 500000 Ft",
        "value": "minimum 500000 Ft"
      }, { "text": "minimum 1000000 Ft", "value": "minimum 1000000 Ft" }],
      "question": "A projekt fizikai befejezését követő első lezárt, teljes üzleti évben realizált nettó árbevételem",
      "type": "select"
    }]
  }],
  signup_data: [{
    "allaskeresokent_regisztralt": "",
    "allaskeresokent_regisztralt_datuma": "",
    "birth_date": 644796000000,
    "birth_name": "",
    "birth_place": "Miskolc",
    "created_at": { "$reql_type$": "TIME", "epoch_time": 1466158212.719, "timezone": "+00:00" },
    "email": "akos.kiszely@gmail.com",
    "id": "59a47012-d417-42b1-bc91-b5cafa603b89",
    "legmagasabb_iskolai_vegzettseg": "",
    "legmagasabb_iskolai_vegzettseg_eve": "",
    "mothers_name": "",
    "name": "Kiszely Ákos",
    "permanent_address": "",
    "phone": "",
    "postal_address": "",
    "temporary_address": "",
    "tobbsegi_tulajdon_mas_vallalkozasban": "1",
    "updated_at": { "$reql_type$": "TIME", "epoch_time": 1466165132.81, "timezone": "+00:00" },
    "user_id": "daacd210-e114-452f-95fd-8a2ef3b7a419",
    "vallalkozas_szekhelye": "BA"
  }],
  userturns: [{
    "crated_at": { "$reql_type$": "TIME", "epoch_time": 1466079824.187, "timezone": "+00:00" },
    "id": "23b36700-a6c0-4207-a058-316db390601b",
    "turn_id": "12724bc9-9874-41c4-8d5e-7aaf6f642df",
    "user_id": "daacd210-e114-452f-95fd-8a2ef3b7a419"
  }, {
    "crated_at": { "$reql_type$": "TIME", "epoch_time": 1466079606.176, "timezone": "+00:00" },
    "id": "7c5d93f1-960d-4002-9428-4567584ead22",
    "turn_id": "12724bc9-9874-41c4-8d5e-7aaf6f642df",
    "user_id": "daacd210-e114-452f-95fd-8a2ef3b7a419"
  }, {
    "crated_at": { "$reql_type$": "TIME", "epoch_time": 1466080560.321, "timezone": "+00:00" },
    "id": "305672ec-2937-4be7-8257-ef30ce73da1d",
    "turn_id": "12724bc9-9874-41c4-8d5e-7aaf6f642df",
    "user_id": "daacd210-e114-452f-95fd-8a2ef3b7a419"
  }]
};


data.tests[0].questions.forEach(function(item,index){
  item.id='q_'+index;
});

var config = {
  host: '192.168.99.100',
  port: '28015',
  db: 'vi_del_dunantul'
};


var createDb = function (next) {
  r.connect(config, function (err, conn) {
    r.dbCreate(config.db).run(conn, function (err, res) {
      conn.close();
      next(err, res);
    });
  });
};

var createTable = function (name, next) {
  r.connect(config, function (err, conn) {
    r.tableCreate(name).run(conn, function (err, res) {
      conn.close();
      next(err, res);
    });
  });
};

var loadData = function (name, next) {
  console.log(`loadData ${name}`)
  r.connect(config, function (err, conn) {
    r.table(name).insert(data[name]).run(conn, function (err, res) {
      conn.close();
      next(err, res);
    });

  });
};

var createTables = function (next) {
  async.map(["users", "turns", "tests", "signup_datas", "userturns","usertests"], createTable, next);
};
var createData = function (next) {
  async.map(["users", "turns", "tests", "signup_datas", "userturns"], loadData, next);
};

async.series({
  created: createDb,
  tables: createTables,
  data: createData
}, function (err, res) {
  console.log(res);
});



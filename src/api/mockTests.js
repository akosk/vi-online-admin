const tests = [
  {
    name: "Kompetencia teszt 1.",
    questions: [
      {
        question: 'Mely településen lesz leendő vállakozásának székhelye',
        type: 'text'
      },
      {

        question: 'Tervezett vállalkozási forma',
        type: 'text'
      },
      {

        question: 'Milyen szektorban tervezi indítani vállalkozását',
        type: 'text'
      },
      {

        question: 'Leendő vállalkozás tervezett tevékenységi területe',
        type: 'text'
      },
      {

        question: 'Miért szeretne vállalkozást indítani',
        type: 'text'
      },
      {
        question: 'Kivel/Kikkel tervezi vállalkozását létrehozni',
        type: 'text'
      },
      {
        question: 'Vállalja-e, hogy vállalkozását megalapítástól kezdve legalább 4 évig fenntartja?',
        answers: [
          { value: 'Igen', text: 'Igen' },
          { value: 'Nem', text: 'Nem' },
        ],
        type: 'select'
      },
      {
        question: 'Vállalja-e, hogy személyes közreműködőként részt vesz a vállalkozásának működtetésében az alapítást követően legalább 4 évig?',
        answers: [
          { value: 'Igen', text: 'Igen' },
          { value: 'Nem', text: 'Nem' },
        ],
        type: 'select'
      },
      {
        question: 'Kérjük, válassza ki az Önre illőt!',
        type: 'select',
        answers: [
          {
            value: '25 és 30 év közötti pályakezdő álláskereső* vagyok',
            text: '25 és 30 év közötti pályakezdő álláskereső* vagyok',
            helptext: '*az álláskeresők közül azok a felsőfokú végzettséggel rendelkező, ' +
            '30. életévüket be nem töltött fiatalok, akik tanulmányaik befejezését ' +
            'követően munkanélküli ellátásra nem szereztek jogosultságot.'
          },
          {
            value: 'Kevesebb, mint 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok',
            text: 'Kevesebb, mint 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok'
          },
          {
            text: 'Legalább 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok',
            value: 'Legalább 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok'
          },
          {
            value: '18 és 25 év közötti Inaktív fiatal* vagyok',
            text: '18 és 25 év közötti Inaktív fiatal* vagyok',
            helptext: '*nem vesz részt oktatásban és nem dolgozik.'
          }
        ]
      },
      {
        question: 'Más vállalkozásban többségi tulajdonnal rendelkezem*',
        helptext: '*van olyan vállalkozás a családban vagy ismeretségi körben, amelyben 50 %-nál nagyobb részesedése van a pályázónak.',
        type: 'select',
        answers: [
          { value: 'Igen', text: 'Igen' },
          { value: 'Nem', text: 'Nem' },
        ]
      },
      {
        question: 'A képzés és tanácsadások választott helyszíne',
        type: 'select',
        answers: [
          { value: 'Pécs', text: 'Pécs' },
          { value: 'Szekszárd', text: 'Szekszárd' },
          { value: 'Kaposvár', text: 'Kaposvár' },
        ]
      },
      {
        question: 'Rendelkezem a vállalkozás indításához szükséges üzleti ötlettel',
        type: 'select',
        answers: [
          { value: 'Igen', text: 'Igen' },
          { value: 'Nem', text: 'Nem' },
        ]
      },
      {
        question: 'Üzleti ötletem az alábbi tevékenységi körhöz kapcsolódik',
        type: 'select',
        answers: [
          { value: 'Szolgáltatás', text: 'Szolgáltatás' },
          { value: 'Ipar', text: 'Ipar' },
          { value: 'Termelés', text: 'Termelés' },
          { value: 'Kereskedelem', text: 'Kereskedelem' },
          { value: 'Kutatás és innováció', text: 'Kutatás és innováció' },
          { value: 'Mezőgazdasági termelés', text: 'Mezőgazdasági termelés' },
          { value: 'Halászat, akvakultúra', text: 'Halászat, akvakultúra' },
          { value: 'Egyéb', text: 'Egyéb' },
        ]
      },
      {
        question: 'Üzleti ötletem hatóköre',
        type: 'select',
        answers: [
          { value: 'Helyi, településszintű', text: 'Helyi, településszintű' },
          { value: 'Megyei', text: 'Megyei' },
          { value: 'Régiós', text: 'Régiós' },
          { value: 'Országos', text: 'Országos' },
          { value: 'Nemzetközi', text: 'Nemzetközi' },
        ]
      },
      {
        question: 'Kialakítani kívánt piaci kapcsolataim száma a fizikai befejezésig',
        type: 'select',
        answers: [
          { value: '3', text: '3' },
          { value: '3-5', text: '3-5' },
          { value: 'minimum 5', text: 'minimum 5' },
        ]
      },
      {
        question: 'A projekt fizikai befejezését követő első lezárt, teljes üzleti évben realizált nettó árbevételem',
        type: 'select',
        answers: [
          { value: 'minimum 100000 Ft', text: 'minimum 100000 Ft' },
          { value: 'minimum 500000 Ft', text: 'minimum 500000 Ft' },
          { value: 'minimum 1000000 Ft', text: 'minimum 1000000 Ft' },
        ]
      }
    ]

  },

];

tests[0].questions.forEach((item, i)=>item.id = `q_${i}`);

export default tests;

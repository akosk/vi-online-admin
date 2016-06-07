const tests = [
  {
    id: "1",
    name: "Kompetencia teszt 1.",
    questions: [
      {
        question: 'Kérjük, válassza ki az Önre illőt!',
        answers: [
          {
            answer: '25 és 30 év közötti pályakezdő álláskereső* vagyok',
            helptext: '*az álláskeresők közül azok a felsőfokú végzettséggel rendelkező, ' +
            '30. életévüket be nem töltött fiatalok, akik tanulmányaik befejezését ' +
            'követően munkanélküli ellátásra nem szereztek jogosultságot.'
          },
          {
            answer: 'Kevesebb, mint 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok'
          },
          {
            answer: 'Legalább 6 hónapja munkanélküli, regisztrált a Munkaügyi Központban és ' +
            '18 és 25 év közötti fiatal vagyok'
          },
          {
            answer: '18 és 25 év közötti Inaktív fiatal* vagyok',
            helptext: '*nem vesz részt oktatásban és nem dolgozik.'
          }
        ]
      },
      {
        question: 'Más vállalkozásban többségi tulajdonnal rendelkezem*',
        helptext: '*van olyan vállalkozás a családban vagy ismeretségi körben, amelyben 50 %-nál nagyobb részesedése van a pályázónak.',
        answers: [
          { answer: 'Igen' },
          { answer: 'Nem' },
        ]
      }
    ]

  },

];

export default tests;

/**
 * Edit this file with your personal details. Components read only from here.
 */
const config = {
  siteUrl: 'https://graduation-invitation-one-teal.vercel.app',
  ogImagePath: '/photos/1.jpeg',
  name: 'Keza Manzi Leila',
  initials: 'KML',
  phoneDisplay: '+250 786 201 066',
  eventDurationMinutes: {
    ceremony: 120,
    reception: 360,
  },
  degree: {
    en: "Bachelor's Degree in Software Engineering, Adventist University of Central Africa",
    fr: "Licence en génie logiciel, Université Adventiste d'Afrique Centrale",
    rw: 'Impamyabumenyi mu Guhanga Porogaramu, Kaminuza ya Adventiste mu Afurika yo Hagati',
  },
  date: '2026-11-15',
  city: 'Kigali',
  about: {
    en: 'I am Keza Manzi Leila — a software engineering graduate grateful for every lesson, late-night study session, and person who believed in me along the way.',
    fr: 'Je suis Keza Manzi Leila — diplômée en génie logiciel, reconnaissante pour chaque leçon, chaque nuit d’étude et chaque personne qui a cru en moi.',
    rw: 'Nitwa Keza Manzi Leila — ndasoje amasomo mu guhanga porogaramu, nishimira buri somo, buri gihe cyo kwiga n’umuntu wese wanyizeye.',
  },
  highlights: [
    {
      en: 'Bachelor’s in Software Engineering, AUCA',
      fr: 'Licence en génie logiciel, AUCA',
      rw: 'Impamyabumenyi mu guhanga porogaramu, AUCA',
    },
    {
      en: 'Passionate about building thoughtful, useful technology',
      fr: 'Passionnée par des technologies utiles et bien pensées',
      rw: 'Nkunda gukora ikoranabuhanga gifasha abantu neza',
    },
    {
      en: 'Celebrating in Kigali with the people I love most',
      fr: 'Je célèbre à Kigali entourée des personnes que j’aime',
      rw: 'Niriwe mu birori byo mu Kigali n’abakunzi banjye',
    },
  ],
  /** Optional — leave url empty to hide the button */
  playlist: {
    url: '',
  },
  programIntro: {
    en: 'Reception · KK 386 St, Kigali',
    fr: 'Réception · KK 386 St, Kigali',
    rw: 'Ibirori byo kwakira · KK 386 St, Kigali',
  },
  program: [
    {
      time: '16:00',
      title: {
        en: 'Everyone arrives',
        fr: 'Arrivée des invités',
        rw: 'Abashyitsi bagera',
      },
      note: {
        en: 'Hugs, drinks, snacks and catching up',
        fr: 'Câlins, boissons, collations et retrouvailles',
        rw: 'Gusuhura, ibinyobwa n’ibiribwa byoroshye',
      },
    },
    {
      time: '16:45',
      title: {
        en: 'Quick hello from the host',
        fr: 'Mot de bienvenue de l’hôte',
        rw: 'Ijambo rito ry’uwakiriye',
      },
      note: {
        en: 'And a big cheer for the grad',
        fr: 'Et une grande acclamation pour la diplômée',
        rw: 'N’ishimwe rikomeye ku musomyi',
      },
    },
    {
      time: '17:00',
      title: {
        en: 'Family and friends say a few words',
        fr: 'Quelques mots de la famille et des amis',
        rw: 'Impuza n’inshuti bavuga amagambo make',
      },
      note: {
        en: 'Short, sweet and funny is perfect',
        fr: 'Court, sincère et un peu drôle — parfait',
        rw: 'Bigufi, byiza kandi byishimo — ni byiza',
      },
    },
    {
      time: '17:45',
      title: {
        en: 'Photo time',
        fr: 'Photos',
        rw: 'Amafoto',
      },
      note: {
        en: 'In the yard or garden, including one with Grandma',
        fr: 'Dans le jardin, y compris une photo avec grand-mère',
        rw: 'Mu busitani, harimo n’ifoto na nyir’urugo',
      },
    },
    {
      time: '18:30',
      title: {
        en: 'Dinner',
        fr: 'Dîner',
        rw: 'Ifunguro rya nimugoroba',
      },
      note: {
        en: 'Grab a plate and enjoy',
        fr: 'Servez-vous et bon appétit',
        rw: 'Fata igikoni wishimire',
      },
    },
    {
      time: '19:30',
      title: {
        en: 'Cake and a toast to the grad',
        fr: 'Gâteau et toast à la diplômée',
        rw: 'Keke n’amata y’ishimwe ku musomyi',
      },
    },
    {
      time: '19:45',
      title: {
        en: 'Gifts and cards',
        fr: 'Cadeaux et cartes',
        rw: 'Impano n’amakarita',
      },
    },
    {
      time: '20:15',
      title: {
        en: 'The grad says thank you',
        fr: 'Remerciements de la diplômée',
        rw: 'Umusomyi avuga urakoze',
      },
    },
    {
      time: '20:30',
      title: {
        en: 'Music, games and dancing',
        fr: 'Musique, jeux et danse',
        rw: 'Umuziki, imikino no kubyina',
      },
    },
    {
      time: '21:45',
      title: {
        en: 'Last dance and goodbyes',
        fr: 'Dernière danse et au revoir',
        rw: 'Umuziki wa nyuma no kwiranganwa',
      },
    },
    {
      time: '22:00',
      title: {
        en: 'Party’s over',
        fr: 'Fin de la fête',
        rw: 'Ibirori birangiye',
      },
    },
  ],
  photos: [
    { src: '/photos/1.jpeg', alt: 'Keza Manzi Leila' },
    { src: '/photos/2.jpeg', alt: 'Keza Manzi Leila' },
    { src: '/photos/3.jpeg', alt: 'Keza Manzi Leila' },
    { src: '/photos/4.jpeg', alt: 'Keza Manzi Leila' },
    { src: '/photos/5.jpeg', alt: 'Keza Manzi Leila' },
  ],
  events: [
    {
      key: 'ceremony',
      time: '09:00',
      venue: {
        en: '343V+W6H, Kigali',
        fr: '343V+W6H, Kigali',
        rw: '343V+W6H, Kigali',
      },
      mapUrl: 'https://maps.google.com/?q=343V%2BW6H,+Kigali',
    },
    {
      key: 'reception',
      time: '16:00',
      venue: {
        en: 'KK 386 St, Kigali',
        fr: 'KK 386 St, Kigali',
        rw: 'KK 386 St, Kigali',
      },
      mapUrl: 'https://maps.google.com/?q=KK+386+St,+Kigali',
    },
  ],
  whatsappNumber: '250786201066',
  /** Optional — shown in “Share a blessing” (e.g. for graduation photos on social). */
  celebrationHashtag: '#KezaGrad2026',
  /**
   * Google Form → linked Sheet. See GOOGLE_FORM_SETUP.md
   * Leave actionUrl empty until your form is ready.
   */
  googleForm: {
    actionUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSemgUtZHPILLJmsUBiZ5RzNLtioCxlxDN9jAI3yvGBT0EtesQ/formResponse',
    entries: {
      name: 'entry.891082014',
      attendance: 'entry.84978969',
      phone: 'entry.657872678',
      note: 'entry.794185543',
    },
    attendanceOptions: {
      yes: 'Joyfully accepts',
      no: 'Regretfully declines',
    },
  },
};

export default config;

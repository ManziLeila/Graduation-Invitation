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
    reception: 180,
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
  program: [
    {
      time: '08:45',
      title: {
        en: 'Arrive & find your seat',
        fr: 'Arrivée et installation',
        rw: 'Kuza no kwicara',
      },
    },
    {
      time: '09:00',
      title: {
        en: 'Graduation ceremony',
        fr: 'Cérémonie de remise des diplômes',
        rw: 'Umuhango wo gutanga impamyabumenyi',
      },
    },
    {
      time: '11:30',
      title: {
        en: 'Photos & congratulations',
        fr: 'Photos et félicitations',
        rw: 'Amafoto n’ubwishimo',
      },
      note: {
        en: 'After the ceremony on campus',
        fr: 'Après la cérémonie sur le campus',
        rw: 'Nyuma y’umuhango ku ishuri',
      },
    },
    {
      time: '16:00',
      title: {
        en: 'Reception with family & friends',
        fr: 'Réception en famille et entre amis',
        rw: 'Ibirori byo kwakira abakunzi n’umuryango',
      },
      note: {
        en: 'KK 386 St — see map above',
        fr: 'KK 386 St — voir la carte ci-dessus',
        rw: 'KK 386 St — reba ikarita hejuru',
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

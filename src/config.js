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
    en: "Bachelor's Degree, Adventist University of Central Africa",
    fr: "Licence, Université Adventiste d'Afrique Centrale",
    rw: 'Impamyabumenyi, Kaminuza ya Adventiste mu Afurika yo Hagati',
  },
  date: '2026-11-15',
  city: 'Kigali',
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
  momo: [
    {
      name: 'Keza Manzi Leila',
      number: '0786201066',
      note: '',
    },
  ],
  bank: {
    bank: {
      en: 'Bank of Kigali',
      fr: 'Bank of Kigali',
      rw: 'Banki ya Kigali',
    },
    branch: '',
    accountName: 'KEZA MANZI LEILA',
    accountNumber: '100280178343',
  },
};

export default config;

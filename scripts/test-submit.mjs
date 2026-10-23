import config from '../src/config.js';
import { postToGoogleForm } from '../src/utils/googleFormPayload.js';

await postToGoogleForm(config.googleForm, {
  name: `API util test ${Date.now()}`,
  attendance: 'yes',
  phone: '+250000',
  note: 'postToGoogleForm',
  lang: 'en',
});

console.log('OK — check your Google Sheet for a new row.');

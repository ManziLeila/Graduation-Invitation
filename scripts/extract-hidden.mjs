import fs from 'fs';

const h = fs.readFileSync('form.html', 'utf8');
for (const m of h.matchAll(/name="([^"]+)"[^>]*value="([^"]*)"/g)) {
  if (/entry|partial|fbzx|fvv|submit|sentinel|submission/i.test(m[1])) {
    console.log(m[1], '=', m[2]);
  }
}
const sentinel = h.match(/name="entry\.84978969_sentinel"[^>]*value="([^"]*)"/);
console.log('sentinel tag', h.match(/<input[^>]*entry\.84978969_sentinel[^>]*>/)?.[0]);

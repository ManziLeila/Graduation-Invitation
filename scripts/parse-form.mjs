import fs from 'fs';

const h = fs.readFileSync('form.html', 'utf8');
const m = h.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[.*?\]);/s);
if (!m) {
  console.log('no FB_PUBLIC_LOAD_DATA_');
  process.exit(1);
}
const data = JSON.parse(m[1]);
const questions = data[1]?.[1] ?? [];
for (const q of questions) {
  const title = q?.[1];
  const type = q?.[3];
  const entryId = q?.[4]?.[0]?.[0];
  const options = q?.[4]?.[0]?.[1];
  console.log('\n---', title, 'type', type, 'entry', entryId);
  if (options) console.log(JSON.stringify(options, null, 2));
}
console.log('\nfbzx', h.match(/name="fbzx"\s+value="(-?\d+)"/)?.[1]);

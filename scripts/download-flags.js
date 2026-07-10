import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FLAGS_DIR = path.join(__dirname, '../public/images/flags');

// Ensure directory exists
if (!fs.existsSync(FLAGS_DIR)) {
  fs.mkdirSync(FLAGS_DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const flags = [
  { code: 'eg', url: 'https://flagcdn.com/w20/eg.png' },
  { code: 'sa', url: 'https://flagcdn.com/w20/sa.png' },
  { code: 'ch', url: 'https://flagcdn.com/w20/ch.png' },
  { code: 'de', url: 'https://flagcdn.com/w20/de.png' },
  { code: 'gb', url: 'https://flagcdn.com/w20/gb.png' }
];

async function main() {
  try {
    for (const flag of flags) {
      const dest = path.join(FLAGS_DIR, `${flag.code}.png`);
      console.log(`Downloading flag: ${flag.code} to ${dest}...`);
      await downloadFile(flag.url, dest);
      console.log(`Saved ${flag.code}.png`);
    }
    console.log('All flags downloaded successfully!');
  } catch (error) {
    console.error('Error downloading flags:', error);
  }
}

main();

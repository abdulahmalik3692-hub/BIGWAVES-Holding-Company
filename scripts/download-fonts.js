import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONTS_DIR = path.join(__dirname, '../public/fonts');

// Ensure directory exists
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
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

async function downloadFont(fontId, variants) {
  console.log(`Fetching metadata for font: ${fontId}...`);
  const data = await getJson(`https://gwfh.mranftl.com/api/fonts/${fontId}?subsets=latin`);
for (const variantId of variants) {
    const variant = data.variants.find(v => v.id === variantId);
    if (!variant) {
      console.warn(`Variant ${variantId} not found for font ${fontId}`);
      continue;
    }
    
    const url = variant.woff2;
    const variantLabel = variantId === 'regular' ? '400' : variantId;
    const filename = `${fontId}-latin-${variantLabel}.woff2`;
    const dest = path.join(FONTS_DIR, filename);
    
    console.log(`Downloading ${filename} from ${url}...`);
    await downloadFile(url, dest);
    console.log(`Saved ${filename}`);
  }
}

async function main() {
  try {
    await downloadFont('cormorant-garamond', ['300', 'regular', '500', '600', '700']);
    await downloadFont('dm-sans', ['300', 'regular', '500', '600']);
    console.log('All fonts downloaded successfully!');
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
}


main();

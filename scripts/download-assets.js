import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const PARTNERS_DIR = path.join(IMAGES_DIR, 'partners');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}
if (!fs.existsSync(PARTNERS_DIR)) {
  fs.mkdirSync(PARTNERS_DIR, { recursive: true });
}

const imagesToDownload = [
  {
    url: 'https://big-wave-landing.vercel.app/images/yacht-2.png',
    dest: path.join(IMAGES_DIR, 'yacht-2.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/waterline-BLi99-BU.jpg',
    dest: path.join(PARTNERS_DIR, 'waterline.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/mynetwork-CrJoh1CX.jpg',
    dest: path.join(PARTNERS_DIR, 'mynetwork.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/qnet-4dFeZYjZ.jpg',
    dest: path.join(PARTNERS_DIR, 'qnet.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/stylies-Do4Ws4Ck.jpg',
    dest: path.join(PARTNERS_DIR, 'stylies.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/alpin-DzOT0pjc.jpg',
    dest: path.join(PARTNERS_DIR, 'alpin.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/windsorpatania-yDjHicGC.jpg',
    dest: path.join(PARTNERS_DIR, 'windsorpatania.webp')
  },
  {
    url: 'https://big-wave-landing.vercel.app/assets/chainmoray-BJwipTY_.jpg',
    dest: path.join(PARTNERS_DIR, 'chainmoray.webp')
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const tempFile = destPath + '.temp';
    const file = fs.createWriteStream(tempFile);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status code ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close(() => {
          resolve(tempFile);
        });
      });
    }).on('error', (err) => {
      fs.unlink(tempFile, () => {});
      reject(err);
    });
  });
}

async function convertToWebP(tempPath, destPath) {
  await sharp(tempPath)
    .webp({ quality: 85 })
    .toFile(destPath);
  fs.unlinkSync(tempPath);
}

async function run() {
  console.log('Starting asset download and conversion to WebP...');
  for (const item of imagesToDownload) {
    try {
      console.log(`Downloading ${item.url}...`);
      const tempPath = await downloadFile(item.url, item.dest);
      console.log(`Converting ${tempPath} to WebP at ${item.dest}...`);
      await convertToWebP(tempPath, item.dest);
      console.log(`Successfully created ${item.dest}`);
    } catch (error) {
      console.error(`Error processing ${item.url}:`, error.message);
    }
  }
  console.log('Asset downloads and WebP conversions finished!');
}

run();

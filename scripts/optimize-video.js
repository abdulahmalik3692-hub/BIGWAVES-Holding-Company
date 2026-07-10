import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegInstaller.path;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const VIDEO_PATH = path.join(PUBLIC_DIR, 'videos/bigwave_hero.mp4');
const COMPRESSED_VIDEO_PATH = path.join(PUBLIC_DIR, 'videos/bigwave_hero_compressed.mp4');
const WEBM_VIDEO_PATH = path.join(PUBLIC_DIR, 'videos/bigwave_hero.webm');
const POSTER_JPG_PATH = path.join(PUBLIC_DIR, 'images/hero_poster.jpg');
const POSTER_WEBP_PATH = path.join(PUBLIC_DIR, 'images/hero_poster.webp');

async function run() {
  try {
    console.log('--- Starting Video Optimization ---');
    console.log('Using ffmpeg binary at: ' + ffmpegPath);

    // 1. Extract first frame as poster image (JPG)
    console.log('Extracting first frame from video...');
    const extractCmd = `"${ffmpegPath}" -y -i "${VIDEO_PATH}" -ss 00:00:00 -vframes 1 "${POSTER_JPG_PATH}"`;
    execSync(extractCmd, { stdio: 'inherit' });
    console.log('First frame extracted to ' + POSTER_JPG_PATH);

    // 2. Convert poster JPG to optimized WebP
    console.log('Converting poster JPG to WebP...');
    await sharp(POSTER_JPG_PATH)
      .webp({ quality: 80 })
      .toFile(POSTER_WEBP_PATH);
    if (fs.existsSync(POSTER_JPG_PATH)) {
      fs.unlinkSync(POSTER_JPG_PATH);
    }
    console.log('Poster WebP created at ' + POSTER_WEBP_PATH);

    // 3. Compress video to WebM using VP9 CRF 48 (720p, very high compression, no audio)
    console.log('Compressing video to WebM (VP9, 720p)...');
    const compressWebMCmd = `"${ffmpegPath}" -y -i "${VIDEO_PATH}" -vcodec libvpx-vp9 -vf "scale=1280:-2" -b:v 0 -crf 48 -speed 4 -cpu-used 4 -an "${WEBM_VIDEO_PATH}"`;
    execSync(compressWebMCmd, { stdio: 'inherit' });
    console.log('WebM video compressed successfully!');

    // 4. Compress video to MP4 using H.264 CRF 34 (720p, high compression fallback, with compressed audio)
    console.log('Compressing video fallback to MP4 (H.264, 720p)...');
    const compressMP4Cmd = `"${ffmpegPath}" -y -i "${VIDEO_PATH}" -vcodec h264 -acodec aac -b:a 64k -vf "scale=1280:-2" -crf 34 -preset veryfast "${COMPRESSED_VIDEO_PATH}"`;
    execSync(compressMP4Cmd, { stdio: 'inherit' });
    console.log('MP4 video compressed successfully!');

    // 5. Swap original MP4 files
    if (fs.existsSync(COMPRESSED_VIDEO_PATH)) {
      const oldSize = fs.statSync(VIDEO_PATH).size;
      const newMP4Size = fs.statSync(COMPRESSED_VIDEO_PATH).size;
      const newWebMSize = fs.existsSync(WEBM_VIDEO_PATH) ? fs.statSync(WEBM_VIDEO_PATH).size : 0;
      
      console.log(`Original video size: ${(oldSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Compressed MP4 size: ${(newMP4Size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Compressed WebM size: ${(newWebMSize / 1024 / 1024).toFixed(2)} MB`);
      
      console.log('Replacing original MP4 video with compressed version...');
      fs.unlinkSync(VIDEO_PATH);
      fs.renameSync(COMPRESSED_VIDEO_PATH, VIDEO_PATH);
      console.log('Replacement complete!');
    }

    console.log('--- Video Optimization Finished Successfully ---');
  } catch (err) {
    console.error('Error during video optimization:', err);
  }
}

run();

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const heroDesktop = [
  "https://harmless-tapir-303.convex.cloud/api/storage/bc728afb-a2f0-4ea3-9a74-94b7ad89c432",
  "https://harmless-tapir-303.convex.cloud/api/storage/b122d7c1-8a08-4e81-b598-563793135485",
  "https://harmless-tapir-303.convex.cloud/api/storage/168a96d0-77e6-4dce-8f09-dd6604b7957e",
  "https://harmless-tapir-303.convex.cloud/api/storage/f52829a0-e7ae-459e-abbb-af9e238c3141",
  "https://harmless-tapir-303.convex.cloud/api/storage/28e9b1f2-db2d-4c4d-9581-e98758916547",
  "https://harmless-tapir-303.convex.cloud/api/storage/4c267195-2f30-40a9-b4f9-967172ed94c6",
  "https://harmless-tapir-303.convex.cloud/api/storage/9220dfa0-c67a-4c34-91be-e61c6b978e31",
  "https://harmless-tapir-303.convex.cloud/api/storage/fe493285-4bb8-42a7-91da-7756fa9cb679",
];

const heroMobile = [
  "https://harmless-tapir-303.convex.cloud/api/storage/07b5732b-3754-4805-9018-b663d5dd6958",
  "https://harmless-tapir-303.convex.cloud/api/storage/c1ec3c88-42a1-4c08-8f28-0fb711d12cc2",
  "https://harmless-tapir-303.convex.cloud/api/storage/a5443f3f-a551-4eeb-b243-9dfa1fed9805",
  "https://harmless-tapir-303.convex.cloud/api/storage/60a45ed4-4631-4503-a971-2b756b3988c0",
  "https://harmless-tapir-303.convex.cloud/api/storage/d5ba003b-c798-4573-a4a3-31c7df1176d8",
  "https://harmless-tapir-303.convex.cloud/api/storage/4a898f25-d7a3-4207-8dd9-713912281ca2",
  "https://harmless-tapir-303.convex.cloud/api/storage/21474769-7eb6-44b5-9d5b-a67a67f80e86",
  "https://harmless-tapir-303.convex.cloud/api/storage/c76a9d10-d523-455a-8108-43da912dd63b",
];

const aboutImage = "https://harmless-tapir-303.convex.cloud/api/storage/d448a866-375a-46e2-b8d1-6bc30de4a26a";

async function main() {
  console.log("Starting asset download...");

  // Download Hero Images
  console.log("Downloading Hero Images...");
  for (let i = 0; i < heroDesktop.length; i++) {
    await downloadFile(heroDesktop[i], `public/assets/hero/desktop-${i + 1}.jpg`);
  }
  for (let i = 0; i < heroMobile.length; i++) {
    await downloadFile(heroMobile[i], `public/assets/hero/mobile-${i + 1}.jpg`);
  }

  // Download About Image
  console.log("Downloading About Image...");
  await downloadFile(aboutImage, `public/assets/about/team.jpg`);

  // Parse and Download Gallery/Video Images from backup
  console.log("Reading backup data...");
  const backupContent = fs.readFileSync('src/lib/landing-data.backup.ts', 'utf8');
  
  // Extract Photos
  const photoRegex = /id:\s*(\d+),[\s\S]*?src:\s*"([^"]+)"/g;
  let match;
  console.log("Downloading Gallery Photos...");
  while ((match = photoRegex.exec(backupContent)) !== null) {
    const id = match[1];
    const url = match[2];
    await downloadFile(url, `public/assets/gallery/${id}.jpg`);
    process.stdout.write(`\rDownloaded photo ${id}`);
  }
  console.log("\nGallery photos downloaded.");

  // Extract Video Thumbnails
  const videoRegex = /id:\s*(\d+),[\s\S]*?thumbnail:\s*"([^"]+)"/g;
  console.log("Downloading Video Thumbnails...");
  while ((match = videoRegex.exec(backupContent)) !== null) {
    const id = match[1];
    const url = match[2];
    await downloadFile(url, `public/assets/videos/${id}.jpg`);
  }
  console.log("Video thumbnails downloaded.");

  console.log("All assets downloaded successfully!");
}

main().catch(console.error);

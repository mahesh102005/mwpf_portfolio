import fs from 'fs';
import https from 'https';
import path from 'path';

const dirs = [
  'public/assets/hero',
  'public/assets/about',
  'public/assets/logo'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const downloads = [
  // Hero Desktop
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/bc728afb-a2f0-4ea3-9a74-94b7ad89c432", path: "public/assets/hero/desktop-1.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/b122d7c1-8a08-4e81-b598-563793135485", path: "public/assets/hero/desktop-2.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/168a96d0-77e6-4dce-8f09-dd6604b7957e", path: "public/assets/hero/desktop-3.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/f52829a0-e7ae-459e-abbb-af9e238c3141", path: "public/assets/hero/desktop-4.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/28e9b1f2-db2d-4c4d-9581-e98758916547", path: "public/assets/hero/desktop-5.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/4c267195-2f30-40a9-b4f9-967172ed94c6", path: "public/assets/hero/desktop-6.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/9220dfa0-c67a-4c34-91be-e61c6b978e31", path: "public/assets/hero/desktop-7.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/fe493285-4bb8-42a7-91da-7756fa9cb679", path: "public/assets/hero/desktop-8.jpg" },
  
  // Hero Mobile
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/07b5732b-3754-4805-9018-b663d5dd6958", path: "public/assets/hero/mobile-1.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/c1ec3c88-42a1-4c08-8f28-0fb711d12cc2", path: "public/assets/hero/mobile-2.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/a5443f3f-a551-4eeb-b243-9dfa1fed9805", path: "public/assets/hero/mobile-3.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/60a45ed4-4631-4503-a971-2b756b3988c0", path: "public/assets/hero/mobile-4.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/d5ba003b-c798-4573-a4a3-31c7df1176d8", path: "public/assets/hero/mobile-5.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/4a898f25-d7a3-4207-8dd9-713912281ca2", path: "public/assets/hero/mobile-6.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/21474769-7eb6-44b5-9d5b-a67a67f80e86", path: "public/assets/hero/mobile-7.jpg" },
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/c76a9d10-d523-455a-8108-43da912dd63b", path: "public/assets/hero/mobile-8.jpg" },

  // About
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/d448a866-375a-46e2-b8d1-6bc30de4a26a", path: "public/assets/about/team.jpg" },

  // Logos
  // Main logo (Navbar/Auth) - already exists as logo.png but downloading to be safe/consistent or check
  // { url: "https://harmless-tapir-303.convex.cloud/api/storage/6d7aa915-5fdc-44c0-8a25-2caeff1f7828", path: "public/assets/logo.png" },
  // Form logo
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/12f3af3e-9161-4b2f-bfd5-081de370261e", path: "public/assets/logo-form.png" }
];

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

async function run() {
  console.log('Starting downloads...');
  for (const item of downloads) {
    console.log(`Downloading ${item.path}...`);
    try {
      await downloadFile(item.url, item.path);
    } catch (e) {
      console.error(`Failed to download ${item.path}:`, e);
    }
  }
  console.log('Done.');
}

run();

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const dirs = [
  'public/assets/gallery',
  'public/assets/videos',
];

dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(projectRoot, dest));
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(path.join(projectRoot, dest), () => {});
      reject(err);
    });
  });
};

const resources = [
  // Logo
  { url: "https://harmless-tapir-303.convex.cloud/api/storage/6d7aa915-5fdc-44c0-8a25-2caeff1f7828", dest: "public/assets/logo.png" },
  
  // Photos from landing-data.ts
  { id: 1, url: "https://harmless-tapir-303.convex.cloud/api/storage/500ff364-b20d-402f-8309-92abfe83df04", dest: "public/assets/gallery/photo-1.jpg" },
  { id: 2, url: "https://harmless-tapir-303.convex.cloud/api/storage/9cd0b89b-4198-4326-8c92-9b335417ec78", dest: "public/assets/gallery/photo-2.jpg" },
  { id: 3, url: "https://harmless-tapir-303.convex.cloud/api/storage/14f0092a-3750-4219-a36f-268d6177f7dc", dest: "public/assets/gallery/photo-3.jpg" },
  { id: 4, url: "https://harmless-tapir-303.convex.cloud/api/storage/1c3d2146-e798-4673-b8ec-219d28d8e452", dest: "public/assets/gallery/photo-4.jpg" },
  { id: 5, url: "https://harmless-tapir-303.convex.cloud/api/storage/799ae19a-6405-40d7-bfa9-f954d55954f9", dest: "public/assets/gallery/photo-5.jpg" },
  { id: 6, url: "https://harmless-tapir-303.convex.cloud/api/storage/8b315867-b08b-48cb-922c-ceb5b4e625fa", dest: "public/assets/gallery/photo-6.jpg" },
  { id: 7, url: "https://harmless-tapir-303.convex.cloud/api/storage/bee45cff-7831-4509-bd5b-62975b47bf82", dest: "public/assets/gallery/photo-7.jpg" },
  { id: 8, url: "https://harmless-tapir-303.convex.cloud/api/storage/61f69825-eabb-444f-a949-66f845e000dc", dest: "public/assets/gallery/photo-8.jpg" },
  { id: 9, url: "https://harmless-tapir-303.convex.cloud/api/storage/3bf386d5-3629-4a49-af82-b62819322d77", dest: "public/assets/gallery/photo-9.jpg" },
  { id: 10, url: "https://harmless-tapir-303.convex.cloud/api/storage/b46b6057-635b-44b7-878f-96f0a9ad1e04", dest: "public/assets/gallery/photo-10.jpg" },
  { id: 11, url: "https://harmless-tapir-303.convex.cloud/api/storage/659d6868-212b-41aa-9eb1-1b0a7fd1358f", dest: "public/assets/gallery/photo-11.jpg" },
  { id: 12, url: "https://harmless-tapir-303.convex.cloud/api/storage/4319c1d5-d297-4736-9354-20ae9453d32d", dest: "public/assets/gallery/photo-12.jpg" },
  { id: 13, url: "https://harmless-tapir-303.convex.cloud/api/storage/92c7983d-8f02-4d8f-9538-6cfe66c19dbb", dest: "public/assets/gallery/photo-13.jpg" },
  { id: 14, url: "https://harmless-tapir-303.convex.cloud/api/storage/70285e90-7108-4145-9119-7d6333338aec", dest: "public/assets/gallery/photo-14.jpg" },
  { id: 15, url: "https://harmless-tapir-303.convex.cloud/api/storage/417629d8-cb25-463e-9534-0b380f2865e4", dest: "public/assets/gallery/photo-15.jpg" },
  { id: 16, url: "https://harmless-tapir-303.convex.cloud/api/storage/5765e692-1a35-448d-99ea-06286638d7a1", dest: "public/assets/gallery/photo-16.jpg" },
  { id: 17, url: "https://harmless-tapir-303.convex.cloud/api/storage/352d8519-c6e7-420f-b925-0d931e032895", dest: "public/assets/gallery/photo-17.jpg" },
  { id: 18, url: "https://harmless-tapir-303.convex.cloud/api/storage/21bdc6b9-6f08-4555-adac-4afe563df4eb", dest: "public/assets/gallery/photo-18.jpg" },
  { id: 19, url: "https://harmless-tapir-303.convex.cloud/api/storage/ceaedea7-f32b-4f66-815a-7306017f2c9b", dest: "public/assets/gallery/photo-19.jpg" },
  { id: 20, url: "https://harmless-tapir-303.convex.cloud/api/storage/cd09934d-f8eb-49cf-8497-0fab26403798", dest: "public/assets/gallery/photo-20.jpg" },
  { id: 21, url: "https://harmless-tapir-303.convex.cloud/api/storage/9ac3b742-dbab-4c49-9988-ab8b57f0c9d2", dest: "public/assets/gallery/photo-21.jpg" },
  { id: 22, url: "https://harmless-tapir-303.convex.cloud/api/storage/b6c8f5ec-5c13-4850-a7b8-c25eecf18d08", dest: "public/assets/gallery/photo-22.jpg" },
  { id: 23, url: "https://harmless-tapir-303.convex.cloud/api/storage/246afbec-b7a9-400f-b1d3-01163976b097", dest: "public/assets/gallery/photo-23.jpg" },
  { id: 24, url: "https://harmless-tapir-303.convex.cloud/api/storage/6b496982-5ee4-40c8-afa2-d09aaf3c015b", dest: "public/assets/gallery/photo-24.jpg" },
  { id: 25, url: "https://harmless-tapir-303.convex.cloud/api/storage/d1c9679b-77cb-45f0-ace8-105bc558d983", dest: "public/assets/gallery/photo-25.jpg" },
  { id: 26, url: "https://harmless-tapir-303.convex.cloud/api/storage/11be9199-6ccc-468c-a319-017be442f177", dest: "public/assets/gallery/photo-26.jpg" },
  { id: 27, url: "https://harmless-tapir-303.convex.cloud/api/storage/97c57884-bb2e-4424-8f41-5a4dc9bc057f", dest: "public/assets/gallery/photo-27.jpg" },
  { id: 28, url: "https://harmless-tapir-303.convex.cloud/api/storage/1cc374bc-424d-4241-9bad-a32bb0bf29d6", dest: "public/assets/gallery/photo-28.jpg" },
  { id: 29, url: "https://harmless-tapir-303.convex.cloud/api/storage/efe55dcd-1703-4d61-b306-a63de30bd196", dest: "public/assets/gallery/photo-29.jpg" },
  { id: 30, url: "https://harmless-tapir-303.convex.cloud/api/storage/92b5380c-009e-4fb9-be40-939d416949e7", dest: "public/assets/gallery/photo-30.jpg" },
  { id: 31, url: "https://harmless-tapir-303.convex.cloud/api/storage/cb8f7625-4491-4694-8d51-1a40bc79b120", dest: "public/assets/gallery/photo-31.jpg" },
  { id: 32, url: "https://harmless-tapir-303.convex.cloud/api/storage/caf97ecb-08fe-47ff-9191-5e9ca7928fef", dest: "public/assets/gallery/photo-32.jpg" },
  { id: 33, url: "https://harmless-tapir-303.convex.cloud/api/storage/d15b2502-a9c6-4782-b9ad-9970d7a38ed5", dest: "public/assets/gallery/photo-33.jpg" },
  { id: 34, url: "https://harmless-tapir-303.convex.cloud/api/storage/4cbc9760-eca0-4e9d-b0e5-9d8491adee3b", dest: "public/assets/gallery/photo-34.jpg" },
  { id: 35, url: "https://harmless-tapir-303.convex.cloud/api/storage/bd734005-6366-4148-bd99-979beeba239d", dest: "public/assets/gallery/photo-35.jpg" },
  { id: 36, url: "https://harmless-tapir-303.convex.cloud/api/storage/c9e36912-2911-449d-9b47-c786d4cc99c7", dest: "public/assets/gallery/photo-36.jpg" },
  { id: 37, url: "https://harmless-tapir-303.convex.cloud/api/storage/0faf31a6-87c5-43dc-8360-174ca1456c6f", dest: "public/assets/gallery/photo-37.jpg" },
  { id: 38, url: "https://harmless-tapir-303.convex.cloud/api/storage/c8488970-089d-4a67-93f4-0912ef717932", dest: "public/assets/gallery/photo-38.jpg" },
  { id: 39, url: "https://harmless-tapir-303.convex.cloud/api/storage/b1d8c8b7-0cbb-4c08-b9aa-093d5f6a2af8", dest: "public/assets/gallery/photo-39.jpg" },
  { id: 40, url: "https://harmless-tapir-303.convex.cloud/api/storage/23bcd895-71fd-4651-9960-188095d618e0", dest: "public/assets/gallery/photo-40.jpg" },
  { id: 41, url: "https://harmless-tapir-303.convex.cloud/api/storage/737b50a2-ceba-4090-b17c-d409b7980a2a", dest: "public/assets/gallery/photo-41.jpg" },
  { id: 42, url: "https://harmless-tapir-303.convex.cloud/api/storage/2715621d-2af0-4ef8-ba2e-e16f07e95ca8", dest: "public/assets/gallery/photo-42.jpg" },
  { id: 43, url: "https://harmless-tapir-303.convex.cloud/api/storage/f8d9b8ed-49a1-44f6-ae6f-ad2cacdce612", dest: "public/assets/gallery/photo-43.jpg" },
  { id: 44, url: "https://harmless-tapir-303.convex.cloud/api/storage/e82ad24d-a3db-4335-b327-629a94d30f5d", dest: "public/assets/gallery/photo-44.jpg" },
  { id: 45, url: "https://harmless-tapir-303.convex.cloud/api/storage/c492fee1-3795-4f86-836e-bac8c079ed51", dest: "public/assets/gallery/photo-45.jpg" },
  { id: 46, url: "https://harmless-tapir-303.convex.cloud/api/storage/8d770577-089f-4571-892a-9b5091c075c2", dest: "public/assets/gallery/photo-46.jpg" },
  { id: 47, url: "https://harmless-tapir-303.convex.cloud/api/storage/d146a52f-e76f-474f-a741-de88e705811c", dest: "public/assets/gallery/photo-47.jpg" },
  { id: 48, url: "https://harmless-tapir-303.convex.cloud/api/storage/90c8a571-e121-484b-a72d-de0ddd135b70", dest: "public/assets/gallery/photo-48.jpg" },
  { id: 49, url: "https://harmless-tapir-303.convex.cloud/api/storage/1bdba34c-a9ca-480f-8306-427a813fa15d", dest: "public/assets/gallery/photo-49.jpg" },
  { id: 50, url: "https://harmless-tapir-303.convex.cloud/api/storage/eafea26a-fc4e-42b9-8027-6f9a1adc4997", dest: "public/assets/gallery/photo-50.jpg" },
  { id: 51, url: "https://harmless-tapir-303.convex.cloud/api/storage/81f665b8-a545-447a-ad2b-6808fff7b1e7", dest: "public/assets/gallery/photo-51.jpg" },
  { id: 52, url: "https://harmless-tapir-303.convex.cloud/api/storage/4fb4d701-773c-4976-85e9-9596df41b5f3", dest: "public/assets/gallery/photo-52.jpg" },
  { id: 53, url: "https://harmless-tapir-303.convex.cloud/api/storage/925061f1-6d37-4148-8aae-e8886f210cde", dest: "public/assets/gallery/photo-53.jpg" },
  { id: 54, url: "https://harmless-tapir-303.convex.cloud/api/storage/54ed073d-201d-4a3b-8598-cc431414f9d8", dest: "public/assets/gallery/photo-54.jpg" },
  { id: 55, url: "https://harmless-tapir-303.convex.cloud/api/storage/ed70faff-63dc-447b-a1e0-c6964462cc0c", dest: "public/assets/gallery/photo-55.jpg" },
  { id: 56, url: "https://harmless-tapir-303.convex.cloud/api/storage/85373785-15ca-4d47-930d-69a3804cf519", dest: "public/assets/gallery/photo-56.jpg" },
  { id: 57, url: "https://harmless-tapir-303.convex.cloud/api/storage/b3b363d4-2709-4f86-937b-1a80aac2a787", dest: "public/assets/gallery/photo-57.jpg" },
  { id: 58, url: "https://harmless-tapir-303.convex.cloud/api/storage/a6cca1a5-98ef-4816-bae9-0ba97a828d7f", dest: "public/assets/gallery/photo-58.jpg" },
  { id: 59, url: "https://harmless-tapir-303.convex.cloud/api/storage/37e98419-39bc-4d3b-b6df-e374a27939ce", dest: "public/assets/gallery/photo-59.jpg" },
  { id: 60, url: "https://harmless-tapir-303.convex.cloud/api/storage/b4879321-de83-429a-9f22-e2f8db90f371", dest: "public/assets/gallery/photo-60.jpg" },
  { id: 61, url: "https://harmless-tapir-303.convex.cloud/api/storage/29aee823-6ecb-40ab-8bf3-20d32fda9be5", dest: "public/assets/gallery/photo-61.jpg" },
  { id: 62, url: "https://harmless-tapir-303.convex.cloud/api/storage/35cbfb08-e95c-464d-a450-4067f3bbaa29", dest: "public/assets/gallery/photo-62.jpg" },
  { id: 63, url: "https://harmless-tapir-303.convex.cloud/api/storage/6b1fe483-7e61-4944-b366-a64021fb9dbb", dest: "public/assets/gallery/photo-63.jpg" },
  { id: 64, url: "https://harmless-tapir-303.convex.cloud/api/storage/8a3b8512-9b8d-4d94-a53a-6ae981320726", dest: "public/assets/gallery/photo-64.jpg" },
  { id: 65, url: "https://harmless-tapir-303.convex.cloud/api/storage/726557d3-4245-4586-81b9-8c5109a11e71", dest: "public/assets/gallery/photo-65.jpg" },
  { id: 66, url: "https://harmless-tapir-303.convex.cloud/api/storage/85eb03b3-7376-47e6-96f9-a024137e0504", dest: "public/assets/gallery/photo-66.jpg" },
  { id: 67, url: "https://harmless-tapir-303.convex.cloud/api/storage/557229ff-7bb5-4c21-a54b-e4c5bc3bbece", dest: "public/assets/gallery/photo-67.jpg" },
  { id: 68, url: "https://harmless-tapir-303.convex.cloud/api/storage/39ee517e-7209-42af-a8ea-f92ac2d7b32c", dest: "public/assets/gallery/photo-68.jpg" },
  { id: 69, url: "https://harmless-tapir-303.convex.cloud/api/storage/028424a2-5dc4-4af9-ae5b-e228739d1ea7", dest: "public/assets/gallery/photo-69.jpg" },
  { id: 70, url: "https://harmless-tapir-303.convex.cloud/api/storage/f8f0a042-2e00-461a-ac7d-0aeb8c3c8623", dest: "public/assets/gallery/photo-70.jpg" },
  { id: 71, url: "https://harmless-tapir-303.convex.cloud/api/storage/d652c8a5-9571-4acf-9e1a-f31832e15bbe", dest: "public/assets/gallery/photo-71.jpg" },
  { id: 72, url: "https://harmless-tapir-303.convex.cloud/api/storage/63ce4377-f443-4789-b532-ffab7fbd8aba", dest: "public/assets/gallery/photo-72.jpg" },
  { id: 73, url: "https://harmless-tapir-303.convex.cloud/api/storage/489b47ef-2f31-4b45-b33b-414178578778", dest: "public/assets/gallery/photo-73.jpg" },
  { id: 74, url: "https://harmless-tapir-303.convex.cloud/api/storage/b2ab80be-29b7-44a2-b8f1-28851cd42f10", dest: "public/assets/gallery/photo-74.jpg" },
  { id: 75, url: "https://harmless-tapir-303.convex.cloud/api/storage/a118337a-4366-4a6b-9a07-b7a7c83760ee", dest: "public/assets/gallery/photo-75.jpg" },
  { id: 76, url: "https://harmless-tapir-303.convex.cloud/api/storage/06f38bbb-ced6-4682-a2e5-1ff364a242fd", dest: "public/assets/gallery/photo-76.jpg" },

  // Video Thumbnails
  { id: 10, url: "https://harmless-tapir-303.convex.cloud/api/storage/8be1e8ba-b2e3-4cc9-a330-9d2f8bd759bd", dest: "public/assets/videos/thumb-10.jpg" },
  { id: 9, url: "https://harmless-tapir-303.convex.cloud/api/storage/cc0e185d-7582-4976-a29c-2b0275e83e04", dest: "public/assets/videos/thumb-9.jpg" },
  { id: 8, url: "https://harmless-tapir-303.convex.cloud/api/storage/1273264c-8772-40fb-ab9d-3d4590d9c0f0", dest: "public/assets/videos/thumb-8.jpg" },
  { id: 7, url: "https://harmless-tapir-303.convex.cloud/api/storage/81f8e825-61cf-429a-b5fa-716bb5cd047c", dest: "public/assets/videos/thumb-7.jpg" },
  { id: 6, url: "https://harmless-tapir-303.convex.cloud/api/storage/6a5017bc-8141-4e1f-947c-3e85de2bb4e4", dest: "public/assets/videos/thumb-6.jpg" },
  { id: 5, url: "https://harmless-tapir-303.convex.cloud/api/storage/2f6e34be-2ccd-4623-93db-c56554a62f98", dest: "public/assets/videos/thumb-5.jpg" },
  { id: 4, url: "https://harmless-tapir-303.convex.cloud/api/storage/5c1e95e1-cdad-42c5-bc26-338ffbab24bb", dest: "public/assets/videos/thumb-4.jpg" },
  { id: 1, url: "https://harmless-tapir-303.convex.cloud/api/storage/1f4f90b5-0f53-43c4-9662-c8378ed0a32b", dest: "public/assets/videos/thumb-1.jpg" },
];

async function downloadAll() {
  console.log(`Starting download of ${resources.length} files...`);
  for (const res of resources) {
    try {
      await downloadFile(res.url, res.dest);
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('All downloads complete.');
}

downloadAll();

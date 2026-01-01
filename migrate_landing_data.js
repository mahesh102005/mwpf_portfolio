const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'lib', 'landing-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace photos
// Pattern matches: id: 1,\n    src: "https://..."
content = content.replace(/id: (\d+),\s+src: "https:\/\/harmless-tapir-303\.convex\.cloud\/api\/storage\/[^"]+"/g, (match, id) => {
    return `id: ${id},\n    src: "/assets/gallery/photo-${id}.jpg"`;
});

// Replace video thumbnails
// Pattern matches the block starting with id until the thumbnail field
content = content.replace(/id: (\d+),[\s\S]*?thumbnail: "(https:\/\/harmless-tapir-303\.convex\.cloud\/api\/storage\/[^"]+)"/g, (match, id, url) => {
    return match.replace(url, `/assets/videos/thumb-${id}.jpg`);
});

fs.writeFileSync(filePath, content);
console.log('Updated landing-data.ts');

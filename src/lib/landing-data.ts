export const photos = Array.from({ length: 76 }, (_, i) => {
  const id = i + 1;
  // Map categories and titles based on the original data structure
  // We'll use a helper or just default values since we're generating this
  // Ideally we'd preserve the metadata. 
  // Since I'm rewriting the file, I should try to preserve the metadata from the backup.
  // However, for the sake of the "local assets" refactor, I will assume the user wants clean references.
  // To be safe and preserve titles/categories, I will copy the array structure but replace src.
  return {
    id,
    src: `/assets/gallery/${id}.jpg`,
    category: getCategory(id),
    title: getTitle(id)
  };
});

// Helper functions to reconstruct the data (simplified for brevity, 
// in a real scenario we'd parse the backup, but here I'll reconstruct the array 
// based on the original file content I have in context to ensure no data loss)

export const videos = [
  {
    id: 10,
    title: "Pre-Wedding Moments",
    category: "Love Stories",
    videoUrl: "https://drive.google.com/file/d/1u-UpRp5clQdcBMU-e7jpqrg3X6aZcxm7/preview",
    thumbnail: "/assets/videos/10.jpg",
  },
  {
    id: 9,
    title: "Bridal Portrait",
    category: "Wedding Films",
    videoUrl: "https://drive.google.com/file/d/1eHK0AoXW6wQsxQfLpRHCTbVRtJ4w-PGt/preview",
    thumbnail: "/assets/videos/9.jpg",
  },
  {
    id: 8,
    title: "Wedding Celebration",
    category: "Wedding Films",
    videoUrl: "https://drive.google.com/file/d/1QkMyuahY0bwwxsgjjdFhCQacrGTZ0j1Q/preview",
    thumbnail: "/assets/videos/8.jpg",
  },
  {
    id: 7,
    title: "Cinematic Wedding Film",
    category: "Wedding Films",
    videoUrl: "https://drive.google.com/file/d/14hAFGnqlZlpDK2IKB2lLU_x8onHcv6u_/preview",
    thumbnail: "/assets/videos/7.jpg",
  },
  {
    id: 6,
    title: "Cinematic Wedding Teaser",
    category: "Wedding Films",
    videoUrl: "https://drive.google.com/file/d/1Fv4GtfnnhosZg-eCr6hS0lg--92DGQgD/preview",
    thumbnail: "/assets/videos/6.jpg",
  },
  {
    id: 5,
    title: "Suyog & Harshadha",
    category: "Love Stories",
    videoUrl: "https://drive.google.com/file/d/1ExeOlOFLF4VLHa4HZrH6VtHCjiAH1LAm/preview",
    thumbnail: "/assets/videos/5.jpg",
  },
  {
    id: 4,
    title: "Romantic Couple Shoot",
    category: "Love Stories",
    videoUrl: "https://drive.google.com/file/d/1xSvMyem27KRWuime9_dU86IpIy4gvzN9/preview",
    thumbnail: "/assets/videos/4.jpg",
  },
  {
    id: 1,
    title: "Cinematic Wedding Highlights",
    category: "Wedding Films",
    videoUrl: "https://drive.google.com/file/d/1zbV8NjOu8dlA_HhY_XFRKl7PJ7-MbHCz/preview",
    thumbnail: "/assets/videos/1.jpg",
  },
];

function getCategory(id: number): string {
  const categories: Record<number, string> = {
    1: "Wedding", 2: "Celebration", 3: "Portrait", 4: "Wedding", 5: "Celebration",
    6: "Portrait", 7: "Event", 8: "Event", 9: "Wedding", 10: "Portrait",
    11: "Portrait", 12: "Wedding", 13: "Wedding", 14: "Wedding", 15: "Wedding",
    16: "Portrait", 17: "Wedding", 18: "Portrait", 19: "Wedding", 20: "Wedding",
    21: "Portrait", 22: "Wedding", 23: "Wedding", 24: "Wedding", 25: "Wedding",
    26: "Wedding", 27: "Portrait", 28: "Portrait", 29: "Wedding", 30: "Wedding",
    31: "Wedding", 32: "Portrait", 33: "Wedding", 34: "Wedding", 35: "Portrait",
    36: "Event", 37: "Wedding", 38: "Portrait", 39: "Wedding", 40: "Portrait",
    41: "Wedding", 42: "Event", 43: "Event", 44: "Wedding", 45: "Wedding",
    46: "Wedding", 47: "Portrait", 48: "Portrait", 49: "Portrait", 50: "Portrait",
    51: "Portrait", 52: "Portrait", 53: "Portrait", 54: "Portrait", 55: "Wedding",
    56: "Detail", 57: "Wedding", 58: "Pre-Wedding", 59: "Pre-Wedding", 60: "Pre-Wedding",
    61: "Pre-Wedding", 62: "Wedding", 63: "Portrait", 64: "Wedding", 65: "Event",
    66: "Event", 67: "Portrait", 68: "Wedding", 69: "Portrait", 70: "Wedding",
    71: "Wedding", 72: "Pre-Wedding", 73: "Pre-Wedding", 74: "Pre-Wedding", 75: "Pre-Wedding",
    76: "Pre-Wedding"
  };
  return categories[id] || "Portfolio";
}

function getTitle(id: number): string {
  const titles: Record<number, string> = {
    1: "Ceremonial Bliss", 2: "Joyful Moments", 3: "Romantic Gaze", 4: "Eternal Love",
    5: "First Dance", 6: "Bridal Elegance", 7: "Festive Spirit", 8: "Joyous Celebration",
    9: "Traditional Elegance", 10: "Candid Moment", 11: "Natural Beauty", 12: "Groom's Portrait",
    13: "Couple's Joy", 14: "Timeless Moment", 15: "Ceremonial Joy", 16: "Couple's Portrait",
    17: "Intimate Moment", 18: "Groom's Style", 19: "Beach Romance", 20: "Seaside Joy",
    21: "Artistic Shadow", 22: "Elegant Couple", 23: "Intimate Moment", 24: "Joyful Couple",
    25: "Traditional Moment", 26: "Ceremonial Smile", 27: "Beach Romance", 28: "Seaside Walk",
    29: "Romantic Gaze", 30: "Loving Glance", 31: "First Dance", 32: "Close Embrace",
    33: "Together Forever", 34: "Captured Moment", 35: "Timeless Memory", 36: "Joyful Celebration",
    37: "Elegant Detail", 38: "Beautiful Smile", 39: "Joyful Walk", 40: "Loving Gaze",
    41: "Couple's Portrait", 42: "Proposal Moment", 43: "She Said Yes", 44: "Traditional Detail",
    45: "Bridal Art", 46: "Ceremonial Art", 47: "Couple's Moment", 48: "Silhouette Love",
    49: "Silhouette Dance", 50: "Sunset Walk", 51: "Golden Hour Connection", 52: "Romantic Silhouette",
    53: "Traditional Beauty", 54: "Elegant Smile", 55: "Royal Couple", 56: "Intimate Details",
    57: "Traditional Walk", 58: "Joyful Run", 59: "Chai Moments", 60: "Candid Conversation",
    61: "Tea Break", 62: "Journey Together", 63: "Monochrome Love", 64: "Tender Moment",
    65: "Joyful Bonds", 66: "Family Celebration", 67: "Serene Togetherness", 68: "Vibrant Journey",
    69: "Timeless Monochrome", 70: "Urban Romance", 71: "Joyful Connection", 72: "Tea Time",
    73: "Street Chai", 74: "Candid Chai", 75: "Heritage Walk", 76: "Scenic Walk"
  };
  return titles[id] || "Untitled";
}
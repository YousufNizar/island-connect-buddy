export interface Experience {
  id: string;
  artisanId: string;
  title: string;
  category: "tea" | "batik" | "coconut" | "cuisine" | "pottery" | "woodcraft";
  description: string;
  shortDescription: string;
  images: string[];
  duration: number; // minutes
  price: number; // USD
  location: {
    name: string;
    city: string;
    lat: number;
    lng: number;
    distanceKm: number;
  };
  rating: number;
  reviewCount: number;
  availableSlots: {
    date: string;
    times: string[];
  }[];
  maxParticipants: number;
  included: string[];
  requirements: string[];
  languages: string[];
  sustainabilityScore: number;
  tags: string[];
  verified: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  specialization: string[];
  bio: string;
  yearsOfExperience: number;
  experiencesHosted: number;
  rating: number;
  reviewCount: number;
  certifications: string[];
  languages: string[];
}

export const artisans: Artisan[] = [
  {
    id: "artisan_001",
    name: "Lakshmi Perera",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    verified: true,
    specialization: ["tea", "cuisine"],
    bio: "Third-generation tea maker from the hill country. Passionate about sharing traditional Ceylon tea culture.",
    yearsOfExperience: 15,
    experiencesHosted: 234,
    rating: 4.9,
    reviewCount: 187,
    certifications: ["Ceylon Tea Board Certified", "Cultural Heritage Guide"],
    languages: ["Sinhala", "English", "Tamil"]
  },
  {
    id: "artisan_002",
    name: "Rohan Silva",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    verified: true,
    specialization: ["batik"],
    bio: "Award-winning batik artist preserving 200-year-old family techniques. Each piece tells a story.",
    yearsOfExperience: 20,
    experiencesHosted: 412,
    rating: 4.8,
    reviewCount: 328,
    certifications: ["Master Batik Artisan", "UNESCO Heritage Keeper"],
    languages: ["Sinhala", "English"]
  },
  {
    id: "artisan_003",
    name: "Nalini Fernando",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    verified: true,
    specialization: ["cuisine"],
    bio: "Home chef specializing in authentic Sri Lankan curries and traditional recipes passed down through generations.",
    yearsOfExperience: 12,
    experiencesHosted: 298,
    rating: 4.9,
    reviewCount: 245,
    certifications: ["Food Safety Certified", "Traditional Cuisine Master"],
    languages: ["Sinhala", "English", "Tamil"]
  },
  {
    id: "artisan_004",
    name: "Kumar Jayasinghe",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    verified: true,
    specialization: ["coconut", "woodcraft"],
    bio: "Coconut craftsman from the southern coast. Teaches sustainable coconut product creation using traditional methods.",
    yearsOfExperience: 18,
    experiencesHosted: 156,
    rating: 4.7,
    reviewCount: 142,
    certifications: ["Eco-Certified Artisan", "Sustainable Craft Specialist"],
    languages: ["Sinhala", "English"]
  },
  {
    id: "artisan_005",
    name: "Chaminda Bandara",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    verified: true,
    specialization: ["pottery"],
    bio: "Fifth-generation potter creating traditional clay items. Workshop located in ancient pottery village.",
    yearsOfExperience: 25,
    experiencesHosted: 189,
    rating: 4.8,
    reviewCount: 156,
    certifications: ["Master Potter", "Cultural Heritage Keeper"],
    languages: ["Sinhala", "English"]
  }
];

export const experiences: Experience[] = [
  {
    id: "exp_001",
    artisanId: "artisan_001",
    title: "Traditional Tea Plucking & Tasting Experience",
    category: "tea",
    description: "Join Lakshmi on her family's tea estate nestled in the misty hills of Nuwara Eliya. Learn the art of 'two leaves and a bud' plucking technique used for centuries. After harvesting, witness the withering and rolling process, then enjoy a curated tasting session of 5 premium Ceylon teas paired with traditional snacks.",
    shortDescription: "Pluck tea leaves, learn processing, taste 5 Ceylon teas",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800"
    ],
    duration: 180,
    price: 45,
    location: {
      name: "Perera Tea Estate",
      city: "Nuwara Eliya",
      lat: 6.9497,
      lng: 80.7891,
      distanceKm: 12.5
    },
    rating: 4.9,
    reviewCount: 187,
    availableSlots: [
      {
        date: "2025-10-20",
        times: ["08:00", "14:00"]
      },
      {
        date: "2025-10-21",
        times: ["08:00", "14:00"]
      },
      {
        date: "2025-10-22",
        times: ["08:00"]
      }
    ],
    maxParticipants: 8,
    included: [
      "Tea plucking basket and hat",
      "All tea samples",
      "Traditional snacks",
      "Certificate of participation",
      "Recipe booklet"
    ],
    requirements: [
      "Comfortable walking shoes",
      "Sun protection",
      "Basic English understanding"
    ],
    languages: ["English", "Sinhala"],
    sustainabilityScore: 95,
    tags: ["Family-friendly", "Photo opportunity", "Eco-certified", "UNESCO heritage"],
    verified: true
  },
  {
    id: "exp_002",
    artisanId: "artisan_002",
    title: "Batik Art Workshop: Create Your Own Masterpiece",
    category: "batik",
    description: "Discover the ancient art of batik with master artisan Rohan Silva. Using traditional copper tjanting tools and natural dyes, design and create your own unique fabric art piece. Learn the symbolic meanings behind traditional Sri Lankan patterns and take home your handcrafted creation.",
    shortDescription: "Design & dye your own batik fabric with natural colors",
    images: [
      "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800"
    ],
    duration: 150,
    price: 38,
    location: {
      name: "Silva Batik Studio",
      city: "Kandy",
      lat: 7.2906,
      lng: 80.6337,
      distanceKm: 3.2
    },
    rating: 4.8,
    reviewCount: 328,
    availableSlots: [
      {
        date: "2025-10-20",
        times: ["09:00", "13:00", "16:00"]
      },
      {
        date: "2025-10-21",
        times: ["09:00", "13:00"]
      }
    ],
    maxParticipants: 6,
    included: [
      "All materials (fabric, wax, dyes)",
      "Tjanting tools",
      "Apron",
      "Your finished batik piece",
      "Pattern guide book"
    ],
    requirements: [
      "Old clothes (dye may splash)",
      "Patience for drying time"
    ],
    languages: ["English", "Sinhala"],
    sustainabilityScore: 92,
    tags: ["Hands-on", "Artistic", "Take-home souvenir", "UNESCO heritage"],
    verified: true
  },
  {
    id: "exp_003",
    artisanId: "artisan_003",
    title: "Sri Lankan Home Cooking: Authentic Curry Masterclass",
    category: "cuisine",
    description: "Step into Nalini's kitchen and learn to cook a traditional Sri Lankan feast! Master the art of roasting and grinding spices, cooking perfect rice & curry, making coconut sambol, and crafting string hoppers. Enjoy your creations family-style with your fellow participants.",
    shortDescription: "Cook 5 traditional dishes including curry & string hoppers",
    images: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
      "https://images.unsplash.com/photo-1596040033229-a0b3b83b6ae7?w=800",
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800"
    ],
    duration: 210,
    price: 42,
    location: {
      name: "Fernando Family Kitchen",
      city: "Galle",
      lat: 6.0535,
      lng: 80.2210,
      distanceKm: 5.8
    },
    rating: 4.9,
    reviewCount: 245,
    availableSlots: [
      {
        date: "2025-10-20",
        times: ["10:00", "17:00"]
      },
      {
        date: "2025-10-21",
        times: ["10:00"]
      },
      {
        date: "2025-10-23",
        times: ["10:00", "17:00"]
      }
    ],
    maxParticipants: 10,
    included: [
      "All ingredients",
      "Recipe cards for each dish",
      "Full meal with drinks",
      "Spice sample pack to take home",
      "Apron and chef's hat"
    ],
    requirements: [
      "Empty stomach!",
      "Love for spicy food (adjustable)",
      "Closed-toe shoes"
    ],
    languages: ["English", "Sinhala", "Tamil"],
    sustainabilityScore: 88,
    tags: ["Family-friendly", "Foodie paradise", "Vegetarian options", "Halal available"],
    verified: true
  },
  {
    id: "exp_004",
    artisanId: "artisan_004",
    title: "Coconut Craft Workshop: From Tree to Treasure",
    category: "coconut",
    description: "Explore the incredible versatility of coconuts with Kumar! Watch traditional coconut tree climbing, learn to husk and extract coconut oil, then craft your own eco-friendly products: coconut shell bowls, coir rope, and natural soap using ancient techniques.",
    shortDescription: "Climb, husk, craft coconut bowls & make natural soap",
    images: [
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800",
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800",
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800"
    ],
    duration: 120,
    price: 32,
    location: {
      name: "Jayasinghe Coconut Grove",
      city: "Hikkaduwa",
      lat: 6.1408,
      lng: 80.1015,
      distanceKm: 8.3
    },
    rating: 4.7,
    reviewCount: 142,
    availableSlots: [
      {
        date: "2025-10-20",
        times: ["08:30", "15:00"]
      },
      {
        date: "2025-10-22",
        times: ["08:30", "15:00"]
      }
    ],
    maxParticipants: 8,
    included: [
      "All materials and tools",
      "Your crafted products",
      "King coconut drink",
      "Coconut oil sample",
      "Eco-tips booklet"
    ],
    requirements: [
      "Sun protection",
      "Comfortable clothes",
      "Tree climbing is optional!"
    ],
    languages: ["English", "Sinhala"],
    sustainabilityScore: 97,
    tags: ["Eco-friendly", "Unique experience", "Zero-waste", "Adventure"],
    verified: true
  },
  {
    id: "exp_005",
    artisanId: "artisan_005",
    title: "Traditional Pottery: Shape Clay with Ancient Techniques",
    category: "pottery",
    description: "Visit the historic pottery village and learn 2,000-year-old techniques from Chaminda. Try the traditional kick wheel, hand-coil pots, and create your own clay vessel. Watch master potters at work and learn about the symbolic importance of pottery in Sri Lankan culture.",
    shortDescription: "Wheel throwing & hand-coiling with ancient methods",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800"
    ],
    duration: 135,
    price: 35,
    location: {
      name: "Bandara Pottery Village",
      city: "Kelaniya",
      lat: 6.9553,
      lng: 79.9220,
      distanceKm: 15.7
    },
    rating: 4.8,
    reviewCount: 156,
    availableSlots: [
      {
        date: "2025-10-21",
        times: ["09:00", "14:00"]
      },
      {
        date: "2025-10-22",
        times: ["09:00", "14:00"]
      },
      {
        date: "2025-10-23",
        times: ["09:00"]
      }
    ],
    maxParticipants: 6,
    included: [
      "Clay and glazing materials",
      "Wheel access",
      "Your pottery piece (shipped if needed)",
      "Village tour",
      "Traditional tea break"
    ],
    requirements: [
      "Comfortable old clothes",
      "Patience for drying/firing process",
      "Hand towel"
    ],
    languages: ["English", "Sinhala"],
    sustainabilityScore: 90,
    tags: ["Artistic", "Cultural heritage", "Meditative", "UNESCO village"],
    verified: true
  },
  {
    id: "exp_006",
    artisanId: "artisan_003",
    title: "Street Food Safari: Hoppers & Kottu Adventure",
    category: "cuisine",
    description: "Hit the streets with chef Nalini for an evening food adventure! Learn to flip egg hoppers like a pro, master the rhythmic kottu roti chopping, and discover 10+ street snacks. This walking tour includes 8 tastings and insider stories about Sri Lankan food culture.",
    shortDescription: "Make hoppers, kottu & taste 8 authentic street foods",
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
      "https://images.unsplash.com/photo-1563379091339-03b92ca0d49d?w=800",
      "https://images.unsplash.com/photo-1554978991-33ef7f31d658?w=800"
    ],
    duration: 165,
    price: 40,
    location: {
      name: "Galle Fort Market",
      city: "Galle",
      lat: 6.0267,
      lng: 80.2170,
      distanceKm: 2.1
    },
    rating: 4.9,
    reviewCount: 198,
    availableSlots: [
      {
        date: "2025-10-20",
        times: ["17:30"]
      },
      {
        date: "2025-10-21",
        times: ["17:30"]
      },
      {
        date: "2025-10-22",
        times: ["17:30"]
      }
    ],
    maxParticipants: 12,
    included: [
      "All food tastings",
      "Bottled water",
      "Street food guide map",
      "Recipe cards",
      "Food vendor discounts"
    ],
    requirements: [
      "Adventurous appetite",
      "Walking shoes",
      "Come hungry!"
    ],
    languages: ["English", "Sinhala", "Tamil"],
    sustainabilityScore: 85,
    tags: ["Evening activity", "Foodie paradise", "Instagram-worthy", "Local secrets"],
    verified: true
  }
];

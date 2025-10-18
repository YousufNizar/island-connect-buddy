export interface Location {
  id: number;
  name: string;
  category: "beach" | "cultural" | "food" | "adventure" | "hidden";
  lat: number;
  lng: number;
  images: string[];
  description: string;
  sustainabilityScore: number;
  breakdown: {
    localOwnership: number;
    ecoFriendly: number;
    culturalValue: number;
    touristImpact: number;
  };
  rating: number;
  reviewCount: number;
  safetyStatus: "verified_safe" | "caution" | "warning";
  openingHours?: string;
  entryFee?: string;
  nearestPoliceStation?: string;
  scamAlert?: {
    level: "low" | "medium" | "high";
    warnings: string[];
    tips: string[];
  };
}

export const sampleLocations: Location[] = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    category: "cultural",
    lat: 7.9570,
    lng: 80.7603,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800"
    ],
    description: "Ancient rock fortress and UNESCO World Heritage site. Climb 1,200 steps to witness stunning frescoes and panoramic views of the surrounding jungle.",
    sustainabilityScore: 87,
    breakdown: {
      localOwnership: 95,
      ecoFriendly: 85,
      culturalValue: 90,
      touristImpact: 78
    },
    rating: 4.8,
    reviewCount: 2847,
    safetyStatus: "verified_safe",
    openingHours: "7:00 AM - 5:30 PM",
    entryFee: "$30 (foreigners)",
    nearestPoliceStation: "2.3 km - Sigiriya Police Station"
  },
  {
    id: 2,
    name: "Mirissa Beach",
    category: "beach",
    lat: 5.9467,
    lng: 80.4706,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800"
    ],
    description: "Paradise beach perfect for whale watching, surfing, and sunset vibes. Great local food scene and eco-friendly accommodations nearby.",
    sustainabilityScore: 72,
    breakdown: {
      localOwnership: 80,
      ecoFriendly: 65,
      culturalValue: 60,
      touristImpact: 82
    },
    rating: 4.6,
    reviewCount: 1923,
    safetyStatus: "verified_safe",
    openingHours: "Open 24/7",
    entryFee: "Free",
    nearestPoliceStation: "1.8 km - Mirissa Tourist Police"
  },
  {
    id: 3,
    name: "Galle Fort",
    category: "cultural",
    lat: 6.0261,
    lng: 80.2168,
    images: [
      "https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=800",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800"
    ],
    description: "17th-century Dutch fort with cobblestone streets, colonial architecture, boutique shops, and amazing cafes. UNESCO World Heritage site.",
    sustainabilityScore: 91,
    breakdown: {
      localOwnership: 92,
      ecoFriendly: 88,
      culturalValue: 95,
      touristImpact: 89
    },
    rating: 4.9,
    reviewCount: 3201,
    safetyStatus: "caution",
    openingHours: "Open 24/7 (fort walls)",
    entryFee: "Free (museums extra)",
    nearestPoliceStation: "0.5 km - Galle Fort Police",
    scamAlert: {
      level: "medium",
      warnings: [
        "⚠️ Gem shop tours with high-pressure sales tactics",
        "🎨 'Artists' who add unexpected charges for photos",
        "🛍️ Shops with fake 'closing down' sales year-round",
        "🚕 Tuk-tuk drivers offering 'special tours' at inflated prices"
      ],
      tips: [
        "✅ Research gem certificates before buying (many are fake)",
        "✅ Ask prices before taking photos or accepting services",
        "✅ Compare prices across multiple shops",
        "✅ Walk the fort - it's small and easy to explore yourself"
      ]
    }
  },
  {
    id: 4,
    name: "Nine Arch Bridge, Ella",
    category: "adventure",
    lat: 6.8724,
    lng: 81.0454,
    images: [
      "https://images.unsplash.com/photo-1588442428752-af15d3283bb8?w=800"
    ],
    description: "Iconic railway bridge built during British colonial period. Watch trains pass through lush tea plantations. Best visited early morning.",
    sustainabilityScore: 85,
    breakdown: {
      localOwnership: 88,
      ecoFriendly: 90,
      culturalValue: 82,
      touristImpact: 80
    },
    rating: 4.7,
    reviewCount: 1564,
    safetyStatus: "caution",
    openingHours: "Open 24/7",
    entryFee: "Free",
    nearestPoliceStation: "3.2 km - Ella Police Station"
  },
  {
    id: 5,
    name: "Temple of the Tooth - Kandy",
    category: "cultural",
    lat: 7.2906,
    lng: 80.6414,
    images: [
      "https://images.unsplash.com/photo-1608193444240-d2c6e34def44?w=800"
    ],
    description: "Sacred Buddhist temple housing a tooth relic of Buddha. Dress modestly (knees and shoulders covered). Evening puja ceremony at 6:30 PM is spectacular.",
    sustainabilityScore: 93,
    breakdown: {
      localOwnership: 100,
      ecoFriendly: 85,
      culturalValue: 98,
      touristImpact: 89
    },
    rating: 4.8,
    reviewCount: 4129,
    safetyStatus: "caution",
    openingHours: "5:30 AM - 8:00 PM",
    entryFee: "Rs 2,000",
    nearestPoliceStation: "0.8 km - Kandy Central Police",
    scamAlert: {
      level: "medium",
      warnings: [
        "⚠️ Fake 'official guides' outside temple entrance",
        "💰 Inflated flower/offering prices near entrance",
        "🚕 Tuk-tuk drivers may claim temple is 'closed' to take you elsewhere",
        "👔 Shops selling 'temple-approved' clothing at 5x normal price"
      ],
      tips: [
        "✅ Buy flowers from shops away from temple (Rs 100 vs Rs 500)",
        "✅ Official guides have government ID badges",
        "✅ Temple is rarely closed except for special ceremonies",
        "✅ Modest clothing can be rented inside for Rs 200"
      ]
    }
  },
  {
    id: 6,
    name: "Yala National Park",
    category: "adventure",
    lat: 6.3725,
    lng: 81.5185,
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"
    ],
    description: "Best place to spot leopards in Sri Lanka! Safari tours through diverse ecosystems. Book ethical operators who maintain distance from animals.",
    sustainabilityScore: 68,
    breakdown: {
      localOwnership: 75,
      ecoFriendly: 60,
      culturalValue: 55,
      touristImpact: 82
    },
    rating: 4.5,
    reviewCount: 2890,
    safetyStatus: "verified_safe",
    openingHours: "6:00 AM - 6:00 PM",
    entryFee: "$30 + safari vehicle",
    nearestPoliceStation: "12 km - Palatupana Police"
  },
  {
    id: 7,
    name: "Secret Waterfall - Ella",
    category: "hidden",
    lat: 6.8596,
    lng: 81.0465,
    images: [
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800"
    ],
    description: "Hidden gem found by locals! 30-minute hike through tea plantations. Natural pool perfect for swimming. Bring cash to tip the local guide.",
    sustainabilityScore: 92,
    breakdown: {
      localOwnership: 100,
      ecoFriendly: 95,
      culturalValue: 85,
      touristImpact: 88
    },
    rating: 4.9,
    reviewCount: 287,
    safetyStatus: "verified_safe",
    openingHours: "Daylight hours only",
    entryFee: "Donation to guide",
    nearestPoliceStation: "4.1 km - Ella Police Station"
  },
  {
    id: 8,
    name: "Colombo Street Food Tour",
    category: "food",
    lat: 6.9271,
    lng: 79.8612,
    images: [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"
    ],
    description: "Authentic kottu, hoppers, and fresh crab curry! Meet at Pettah Market. Local guide speaks 3 languages. Vegetarian options available.",
    sustainabilityScore: 78,
    breakdown: {
      localOwnership: 95,
      ecoFriendly: 70,
      culturalValue: 85,
      touristImpact: 62
    },
    rating: 4.7,
    reviewCount: 1045,
    safetyStatus: "caution",
    openingHours: "Tours: 6 PM daily",
    entryFee: "$25 per person",
    nearestPoliceStation: "0.3 km - Pettah Police Station",
    scamAlert: {
      level: "high",
      warnings: [
        "🚨 Pickpockets active in crowded Pettah Market area",
        "💰 Money changers offering 'better rates' may use sleight of hand",
        "🎫 Unauthorized 'tour guides' charging excessive fees",
        "📱 Be alert - phone snatching from tuk-tuks reported"
      ],
      tips: [
        "✅ Book tours through verified platforms only",
        "✅ Keep valuables in front pockets or money belt",
        "✅ Use official money changers with proper signage",
        "✅ Travel in groups, especially after dark",
        "✅ Keep phones secured - don't use them near road"
      ]
    }
  },
  {
    id: 9,
    name: "Arugam Bay",
    category: "beach",
    lat: 6.8447,
    lng: 81.8344,
    images: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
    ],
    description: "World-class surf spot with laid-back vibes. Perfect for beginners and pros. Great hostels, yoga studios, and beach parties. Best season: April-October.",
    sustainabilityScore: 74,
    breakdown: {
      localOwnership: 82,
      ecoFriendly: 70,
      culturalValue: 65,
      touristImpact: 79
    },
    rating: 4.8,
    reviewCount: 1678,
    safetyStatus: "verified_safe",
    openingHours: "Open 24/7",
    entryFee: "Free",
    nearestPoliceStation: "2.5 km - Arugam Bay Police"
  },
  {
    id: 10,
    name: "Lipton's Seat",
    category: "hidden",
    lat: 6.7982,
    lng: 80.8746,
    images: [
      "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800"
    ],
    description: "Sunrise viewpoint overlooking tea estates. Named after Sir Thomas Lipton. Drive through misty mountains or hike from Haputale. Bring warm clothes!",
    sustainabilityScore: 89,
    breakdown: {
      localOwnership: 90,
      ecoFriendly: 92,
      culturalValue: 88,
      touristImpact: 86
    },
    rating: 4.9,
    reviewCount: 892,
    safetyStatus: "verified_safe",
    openingHours: "Best before 10 AM",
    entryFee: "Free",
    nearestPoliceStation: "15 km - Haputale Police"
  },
  {
    id: 11,
    name: "Jaffna Crab Curry Experience",
    category: "food",
    lat: 9.6615,
    lng: 80.0255,
    images: [
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800"
    ],
    description: "Authentic Tamil cuisine in the northern peninsula. Fresh mud crabs cooked in coconut gravy with spices. Cultural experience with local Tamil families.",
    sustainabilityScore: 86,
    breakdown: {
      localOwnership: 100,
      ecoFriendly: 75,
      culturalValue: 92,
      touristImpact: 77
    },
    rating: 4.8,
    reviewCount: 534,
    safetyStatus: "verified_safe",
    openingHours: "Lunch & dinner",
    entryFee: "Rs 3,500 per person",
    nearestPoliceStation: "1.2 km - Jaffna Police Station"
  },
  {
    id: 12,
    name: "Knuckles Mountain Range",
    category: "adventure",
    lat: 7.4500,
    lng: 80.7833,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    description: "UNESCO World Heritage wilderness. Multi-day treks through cloud forests, waterfalls, and traditional villages. Hire certified local guides only.",
    sustainabilityScore: 91,
    breakdown: {
      localOwnership: 95,
      ecoFriendly: 93,
      culturalValue: 88,
      touristImpact: 88
    },
    rating: 4.9,
    reviewCount: 671,
    safetyStatus: "caution",
    openingHours: "Permit required",
    entryFee: "$10 + guide fees",
    nearestPoliceStation: "18 km - Matale Police"
  }
];

export const categoryEmojis = {
  beach: "🏖️",
  cultural: "🏛️",
  food: "🍜",
  adventure: "🎒",
  hidden: "💎"
};

export const categoryColors = {
  beach: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
  cultural: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400",
  food: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  adventure: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  hidden: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400"
};

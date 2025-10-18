export interface ConnectUser {
  userId: string;
  name: string;
  age: number;
  gender: "male" | "female" | "non-binary";
  pronouns?: string;
  verified: boolean;
  photos: string[];
  bio: string;
  interests: string[];
  lookingFor: ("friends" | "travel_buddy")[];
  currentLocation: {
    city: string;
    distanceKm: number;
    lat: number;
    lng: number;
  };
  travelDates: {
    from: string;
    to: string;
  };
  languages: string[];
  badges: string[];
  rating: number;
  connectionCount: number;
  eventsHosted: number;
  online: boolean;
  lastSeen?: string;
}

export const sampleUsers: ConnectUser[] = [
  {
    userId: "user_001",
    name: "Sarah K.",
    age: 28,
    gender: "female",
    pronouns: "she/her",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400"
    ],
    bio: "Adventure seeker exploring Sri Lanka for 3 weeks! 🌿 Love hiking, photography, and meeting locals. Always up for spontaneous trips!",
    interests: ["Hiking", "Photography", "Food", "Culture", "Beach"],
    lookingFor: ["friends", "travel_buddy"],
    currentLocation: {
      city: "Kandy",
      distanceKm: 2.5,
      lat: 7.2906,
      lng: 80.6414
    },
    travelDates: {
      from: "2025-10-15",
      to: "2025-11-05"
    },
    languages: ["English", "French"],
    badges: ["Verified", "Eco Warrior", "Event Host"],
    rating: 4.9,
    connectionCount: 47,
    eventsHosted: 8,
    online: true
  },
  {
    userId: "user_002",
    name: "Mike R.",
    age: 32,
    gender: "male",
    pronouns: "he/him",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    ],
    bio: "Digital nomad working remotely from paradise 💻🌴 Looking for surf buddies and coffee shop recommendations!",
    interests: ["Surfing", "Tech", "Coffee", "Coworking", "Yoga"],
    lookingFor: ["friends", "travel_buddy"],
    currentLocation: {
      city: "Arugam Bay",
      distanceKm: 5.8,
      lat: 6.8447,
      lng: 81.8344
    },
    travelDates: {
      from: "2025-09-01",
      to: "2025-12-31"
    },
    languages: ["English", "Spanish"],
    badges: ["Verified", "Digital Nomad"],
    rating: 4.7,
    connectionCount: 34,
    eventsHosted: 3,
    online: false,
    lastSeen: "2 hours ago"
  },
  {
    userId: "user_003",
    name: "Emma L.",
    age: 25,
    gender: "female",
    pronouns: "she/her",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    ],
    bio: "Foodie on a mission to try every street food stall 🍜 Can't speak Sinhala but smile works everywhere! Let's explore together.",
    interests: ["Food", "Markets", "Culture", "History", "Cooking"],
    lookingFor: ["friends"],
    currentLocation: {
      city: "Colombo",
      distanceKm: 12.3,
      lat: 6.9271,
      lng: 79.8612
    },
    travelDates: {
      from: "2025-10-10",
      to: "2025-10-25"
    },
    languages: ["English", "German"],
    badges: ["Verified", "Foodie Champion"],
    rating: 4.8,
    connectionCount: 29,
    eventsHosted: 5,
    online: true
  },
  {
    userId: "user_004",
    name: "Alex T.",
    age: 30,
    gender: "non-binary",
    pronouns: "they/them",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
    ],
    bio: "Wildlife photographer & conservation enthusiast 📷🐘 Documenting endangered species. Looking for eco-conscious travelers!",
    interests: ["Photography", "Wildlife", "Conservation", "Nature", "Hiking"],
    lookingFor: ["travel_buddy", "friends"],
    currentLocation: {
      city: "Yala",
      distanceKm: 8.1,
      lat: 6.3725,
      lng: 81.5185
    },
    travelDates: {
      from: "2025-10-01",
      to: "2025-11-15"
    },
    languages: ["English", "Sinhala (learning)"],
    badges: ["Verified", "Eco Warrior", "Wildlife Expert"],
    rating: 5.0,
    connectionCount: 52,
    eventsHosted: 12,
    online: true
  },
  {
    userId: "user_005",
    name: "Raj P.",
    age: 27,
    gender: "male",
    pronouns: "he/him",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
    ],
    bio: "Local Sri Lankan here to show you the real SL! 🇱🇰 Off-the-beaten-path adventures, hidden waterfalls, and authentic food.",
    interests: ["Local Culture", "Hidden Gems", "Adventure", "Music", "Beach"],
    lookingFor: ["friends"],
    currentLocation: {
      city: "Ella",
      distanceKm: 3.2,
      lat: 6.8724,
      lng: 81.0454
    },
    travelDates: {
      from: "2025-01-01",
      to: "2025-12-31"
    },
    languages: ["Sinhala", "English", "Tamil"],
    badges: ["Verified", "Local Guide", "Super Host"],
    rating: 4.9,
    connectionCount: 118,
    eventsHosted: 24,
    online: false,
    lastSeen: "5 hours ago"
  },
  {
    userId: "user_006",
    name: "Lily C.",
    age: 24,
    gender: "female",
    pronouns: "she/her",
    verified: false,
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"
    ],
    bio: "Yoga instructor & wellness enthusiast 🧘‍♀️ Sunrise sessions on the beach anyone? All levels welcome!",
    interests: ["Yoga", "Wellness", "Beach", "Meditation", "Healthy Living"],
    lookingFor: ["friends", "travel_buddy"],
    currentLocation: {
      city: "Mirissa",
      distanceKm: 6.4,
      lat: 5.9467,
      lng: 80.4706
    },
    travelDates: {
      from: "2025-10-12",
      to: "2025-11-02"
    },
    languages: ["English", "Mandarin"],
    badges: ["Wellness Guru"],
    rating: 4.6,
    connectionCount: 21,
    eventsHosted: 2,
    online: true
  },
  {
    userId: "user_007",
    name: "Tom H.",
    age: 35,
    gender: "male",
    pronouns: "he/him",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400"
    ],
    bio: "History buff exploring ancient temples 🏛️ Can talk for hours about archaeology! Looking for fellow culture lovers.",
    interests: ["History", "Archaeology", "Culture", "Museums", "Architecture"],
    lookingFor: ["friends"],
    currentLocation: {
      city: "Anuradhapura",
      distanceKm: 15.7,
      lat: 8.3114,
      lng: 80.4037
    },
    travelDates: {
      from: "2025-10-08",
      to: "2025-10-22"
    },
    languages: ["English", "Italian"],
    badges: ["Verified", "Culture Explorer"],
    rating: 4.8,
    connectionCount: 38,
    eventsHosted: 6,
    online: false,
    lastSeen: "1 day ago"
  },
  {
    userId: "user_008",
    name: "Nina S.",
    age: 29,
    gender: "female",
    pronouns: "she/her",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400"
    ],
    bio: "Solo backpacker on a budget 🎒 Hostels, street food, and local buses are my jam! Always open to joining group trips.",
    interests: ["Backpacking", "Budget Travel", "Hostels", "Street Food", "Adventure"],
    lookingFor: ["travel_buddy", "friends"],
    currentLocation: {
      city: "Galle",
      distanceKm: 4.2,
      lat: 6.0261,
      lng: 80.2168
    },
    travelDates: {
      from: "2025-10-05",
      to: "2025-11-20"
    },
    languages: ["English", "Portuguese"],
    badges: ["Verified", "Budget Traveler"],
    rating: 4.7,
    connectionCount: 45,
    eventsHosted: 7,
    online: true
  }
];

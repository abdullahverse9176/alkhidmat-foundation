import { 
  Users, 
  MapPin, 
  Heart, 
  Flame, 
  Apple, 
  Stethoscope, 
  Briefcase, 
  GraduationCap, 
  Droplet, 
  Trees, 
  Sparkles, 
  UserCheck 
} from "lucide-react";

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: "Users" | "MapPin" | "Heart" | "Flame" | "Apple" | "Stethoscope";
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: "Flame" | "Apple" | "Stethoscope" | "GraduationCap" | "Droplet" | "Trees" | "Sparkles" | "Briefcase";
  image: string;
  features: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  imageUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  excerpt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const impactStatsData: StatItem[] = [
  {
    id: "stat-1",
    label: "Active Volunteers",
    value: 15430,
    suffix: "+",
    iconName: "Users"
  },
  {
    id: "stat-2",
    label: "Cities Covered",
    value: 120,
    suffix: "+",
    iconName: "MapPin"
  },
  {
    id: "stat-3",
    label: "Families Helped",
    value: 85000,
    suffix: "+",
    iconName: "Heart"
  },
  {
    id: "stat-4",
    label: "Meals Distributed",
    value: 1200000,
    suffix: "+",
    iconName: "Apple"
  },
  {
    id: "stat-5",
    label: "Medical Camps",
    value: 450,
    suffix: "+",
    iconName: "Stethoscope"
  },
  {
    id: "stat-6",
    label: "Relief Projects",
    value: 95,
    suffix: "+",
    iconName: "Flame"
  }
];

export const partyAboutData = {
  subtitle: "Who We Are",
  title: "Al-Khidmat Citizens Alliance (ACA)",
  description1: "The Al-Khidmat Citizens Alliance is a forward-thinking political movement dedicated to combining progressive state leadership with extensive social welfare networks. Founded on the principles of justice, service, and equal opportunity, we believe that political power is a trust to be used solely for the betterment of humanity.",
  description2: "Unlike traditional political entities, our actions speak before our speeches do. With over a decade of grassroots community service, our volunteers work around the clock to provide disaster relief, primary health resources, and educational empowerment. We are paving the way for a self-reliant, ethical, and thriving society.",
  mission: "To establish a just, corruption-free society by empowering local communities, optimizing public services, and rendering compassionate aid to all citizens without discrimination.",
  vision: "A prosperous democratic nation where healthcare, clean water, quality education, and rapid disaster relief are guaranteed rights for every citizen.",
  imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
};

export interface ServiceItemDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: "Flame" | "Apple" | "Stethoscope" | "GraduationCap" | "Droplet" | "Trees" | "Sparkles" | "Briefcase";
  image: string;
  features: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const servicesData: ServiceItemDetail[] = [
  {
    id: "srv-1",
    slug: "disaster-relief",
    title: "Disaster Relief",
    description:
      "Rapid response deployment for floods, earthquakes, and emergencies.",
    longDescription:
      "Our Disaster Relief program provides immediate humanitarian assistance during natural disasters and emergencies. We deliver food, clean drinking water, temporary shelter, medical aid, and essential supplies to affected families while supporting long-term recovery efforts.",
    iconName: "Flame",
    image: "/images/services/disaster-relief.jpg",
    features: [
      "Emergency Food Distribution",
      "Temporary Shelters",
      "Clean Drinking Water",
      "Rescue & Relief Operations",
      "Medical Assistance",
    ],
    stats: [
      { label: "Families Helped", value: "50,000+" },
      { label: "Relief Camps", value: "300+" },
      { label: "Volunteers", value: "5,000+" },
    ],
  },
  {
    id: "srv-2",
    slug: "clean-water-initiative",
    title: "Clean Water Initiative",
    description:
      "Providing safe drinking water through hand pumps and water wells.",
    longDescription:
      "We install hand pumps, construct water wells, and provide clean drinking water to underserved communities. Access to safe water improves health, reduces waterborne diseases, and enhances the quality of life for thousands of families.",
    iconName: "Droplet",
    image: "/images/services/clean-water.jpg",
    features: [
      "Hand Pump Installation",
      "Water Well Construction",
      "Water Filtration",
      "Maintenance Services",
      "Emergency Water Supply",
    ],
    stats: [
      { label: "Hand Pumps", value: "350+" },
      { label: "Villages", value: "120+" },
      { label: "Families", value: "10,000+" },
    ],
  },
  {
    id: "srv-3",
    slug: "food-distribution",
    title: "Food Distribution",
    description:
      "Providing meals and ration packages to families facing food insecurity.",
    longDescription:
      "Our Food Distribution program delivers nutritious meals, ration packages, and emergency food assistance to low-income families, ensuring no one goes hungry during difficult times.",
    iconName: "Apple",
    image: "/images/services/food-distribution.jpg",
    features: [
      "Monthly Ration Packs",
      "Daily Meals",
      "Ramadan Food Drives",
      "Emergency Food Support",
      "Community Kitchens",
    ],
    stats: [
      { label: "Meals Served", value: "1M+" },
      { label: "Families", value: "80,000+" },
      { label: "Distribution Centers", value: "150+" },
    ],
  },
  {
    id: "srv-4",
    slug: "education-support",
    title: "Education Support",
    description:
      "Helping deserving students through scholarships and educational resources.",
    longDescription:
      "We empower students from underprivileged backgrounds by providing scholarships, books, uniforms, school supplies, and digital learning opportunities.",
    iconName: "GraduationCap",
    image: "/images/services/education.jpg",
    features: [
      "Scholarships",
      "School Supplies",
      "Books & Uniforms",
      "IT Labs",
      "Career Guidance",
    ],
    stats: [
      { label: "Students", value: "15,000+" },
      { label: "Scholarships", value: "4,500+" },
      { label: "Schools", value: "200+" },
    ],
  },
  {
    id: "srv-5",
    slug: "tree-plantation",
    title: "Tree Plantation",
    description:
      "Creating a greener future through nationwide plantation campaigns.",
    longDescription:
      "Our Tree Plantation initiative promotes environmental sustainability by planting indigenous trees, restoring green spaces, and educating communities about climate action.",
    iconName: "Trees",
    image: "/images/services/tree-plantation.jpg",
    features: [
      "Tree Plantation Drives",
      "Community Awareness",
      "School Campaigns",
      "Environmental Protection",
      "Climate Action",
    ],
    stats: [
      { label: "Trees Planted", value: "5M+" },
      { label: "Cities", value: "80+" },
      { label: "Volunteers", value: "20,000+" },
    ],
  },
  {
    id: "srv-6",
    slug: "medical-camps",
    title: "Medical Camps",
    description:
      "Providing free healthcare services in underserved communities.",
    longDescription:
      "Our Medical Camps offer free health checkups, diagnostic tests, medicines, and specialist consultations for individuals who lack access to quality healthcare.",
    iconName: "Stethoscope",
    image: "/images/services/medical-camps.jpg",
    features: [
      "Free Checkups",
      "Medicines",
      "Diagnostic Tests",
      "Health Awareness",
      "Specialist Consultations",
    ],
    stats: [
      { label: "Patients", value: "250,000+" },
      { label: "Medical Camps", value: "800+" },
      { label: "Doctors", value: "1,200+" },
    ],
  },
  {
    id: "srv-7",
    slug: "blood-donation",
    title: "Blood Donation",
    description:
      "Connecting voluntary donors with patients in need of lifesaving blood.",
    longDescription:
      "Our Blood Donation program maintains an active donor network, ensuring timely blood availability for emergencies, surgeries, and patients with chronic illnesses such as thalassemia.",
    iconName: "Droplet",
    image: "/images/services/blood-donation.jpg",
    features: [
      "Emergency Blood Requests",
      "Donor Registration",
      "Blood Donation Camps",
      "Awareness Campaigns",
      "Hospital Partnerships",
    ],
    stats: [
      { label: "Donors", value: "100,000+" },
      { label: "Lives Saved", value: "50,000+" },
      { label: "Camps", value: "500+" },
    ],
  },
  {
    id: "srv-8",
    slug: "women-empowerment",
    title: "Women Empowerment",
    description:
      "Supporting women through skills training and economic opportunities.",
    longDescription:
      "We help women become financially independent by providing vocational training, entrepreneurship support, sewing courses, and micro-financing opportunities.",
    iconName: "Sparkles",
    image: "/images/services/women-empowerment.jpg",
    features: [
      "Vocational Training",
      "Sewing Courses",
      "Micro Grants",
      "Business Support",
      "Skill Development",
    ],
    stats: [
      { label: "Women Trained", value: "12,000+" },
      { label: "Training Centers", value: "75+" },
      { label: "Businesses Started", value: "2,000+" },
    ],
  },
  {
    id: "srv-9",
    slug: "youth-development",
    title: "Youth Development",
    description:
      "Developing future leaders through education, training, and leadership programs.",
    longDescription:
      "Our Youth Development initiative equips young people with leadership skills, career guidance, technical training, and volunteer opportunities to prepare them for a brighter future.",
    iconName: "Briefcase",
    image: "/images/services/youth-development.jpg",
    features: [
      "Leadership Programs",
      "Career Counseling",
      "Technical Training",
      "Volunteer Opportunities",
      "Sports Activities",
    ],
    stats: [
      { label: "Youth Trained", value: "25,000+" },
      { label: "Programs", value: "350+" },
      { label: "Cities", value: "60+" },
    ],
  },
];

export const featuredProjectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Clean Water Safe Life Project",
    category: "Clean Water",
    description: "Installing 500 solar-powered water filtration plants in remote desert and arid regions to secure safe drinking water.",
    targetAmount: 250000,
    raisedAmount: 187500,
    imageUrl: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj-2",
    title: "Emergency Flood Rehabilitation",
    category: "Disaster Relief",
    description: "Building 1,200 climate-resilient permanent brick homes for families displaced by recent riverine floods.",
    targetAmount: 500000,
    raisedAmount: 412000,
    imageUrl: "https://images.unsplash.com/photo-1469571486040-7a9b13de3d75?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj-3",
    title: "Al-Khidmat Pediatric Care Hospital",
    category: "Healthcare",
    description: "Constructing and equipping a state-of-the-art 150-bed mother and child healthcare hospital in Chiniot.",
    targetAmount: 1200000,
    raisedAmount: 850000,
    imageUrl: "https://images.unsplash.com/photo-1538108176447-280586497d96?auto=format&fit=crop&q=80&w=600"
  }
];

export const campaignData = {
  title: "General Election Campaign 2026",
  description: "Join the movement that prioritizes healthcare, education, and humanitarian values in state policies. Our campaign represents a transparent democracy, accountability, and the direct translation of welfare models into governance. Support the Al-Khidmat Citizens Alliance today.",
  electionDate: "2026-10-15T00:00:00",
  imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200"
};

export const chairmanMessageData = {
  name: "Dr. Muhammad Tahir Chaudhry",
  role: "Chairman, Al-Khidmat Citizens Alliance",
  message: "Our political ideology is simple: power is empty if it does not serve the weakest member of the society. For over a decade, we have stayed beside our brothers and sisters in their times of distress, whether through floods, poverty, or pandemics. We are transitioning this practical service model into national legislative agendas. The Al-Khidmat Citizens Alliance is not just another political option; it is a promise of service, honesty, and sustainable progress. Join us as we build a nation where no child sleeps hungry and no family is left without a home.",
  signatureText: "M. Tahir Chaudhry",
  imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
};

export const volunteerOfMonthData = {
  name: "Sarah Ameen",
  photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  city: "Multan",
  hoursServed: 320,
  projectsCompleted: 14,
  badgeText: "Distinguished Leader Badge",
  appreciationNote: "Sarah has demonstrated exceptional leadership during the Southern Punjab Flood Relief operation. She single-handedly coordinated medical logistics for 12 temporary health camps, ensuring critical medicines reached over 4,500 displaced families in record time.",
  quote: "Serving the community isn't just a duty; it's the highest form of worship. The smiles on children's faces when they receive help keeps me going."
};

export const upcomingEventsData: EventItem[] = [
  {
    id: "evt-1",
    title: "National Health Expo & Free Camp",
    date: "2026-07-28T09:00:00",
    location: "Jinnah Sports Stadium, Islamabad",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "evt-2",
    title: "Green Earth Afforestation Seminar",
    date: "2026-08-12T14:00:00",
    location: "Royal Palm Auditorium, Lahore",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "evt-3",
    title: "Youth Leadership Convention 2026",
    date: "2026-09-05T10:00:00",
    location: "Arts Council Complex, Karachi",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
  }
];

export const latestNewsData: NewsItem[] = [
  {
    id: "news-1",
    title: "Al-Khidmat Establishes Smart IT Lab in Chiniot School",
    date: "July 2, 2026",
    category: "Education",
    excerpt: "In our ongoing efforts to bridge the digital divide, Al-Khidmat Citizens Alliance has inaugurated a state-of-the-art computer laboratory with high-speed internet and modern coding resources for local orphanages.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-2",
    title: "Relief Teams Reach Isolated Mountain Villages",
    date: "June 25, 2026",
    category: "Disaster Relief",
    excerpt: "Following recent landslides in the Northern valleys, our dedicated mountain response unit successfully transported 15 tons of warm clothing, dry rations, and medical kits to cut-off families.",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "news-3",
    title: "Chairman Proposes National Healthcare Reform Policy",
    date: "June 18, 2026",
    category: "Politics & Policy",
    excerpt: "Dr. Tahir Chaudhry has unveiled a comprehensive legislative proposal that aims to institutionalize mobile medical clinics nationwide, drawing on Al-Khidmat's successful grassroots models.",
    imageUrl: "https://images.unsplash.com/photo-1576091160621-26330057b435?auto=format&fit=crop&q=80&w=600"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "tst-1",
    name: "Kamran Shah",
    role: "Community Elder, Flood-affected Village",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "When the floods swept away everything we owned, Al-Khidmat was the first team on the ground. They didn't just give us food bags; they stood by us for months and rebuilt our homes stronger than before. They are the true servants of the nation."
  },
  {
    id: "tst-2",
    name: "Zainab Fatima",
    role: "Medical Student & Recipient Scholarship",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "I was on the verge of quitting medical school after my father lost his job. The Al-Khidmat Education Scholarship covered my tuition fees and lodging. Now I volunteer at their free medical camps to give back to my community."
  },
  {
    id: "tst-3",
    name: "Mohammad Irfan",
    role: "Proprietor, Multan General Stores",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "I trust Al-Khidmat with my Zakat donations because their operation is entirely transparent. They publish regular audit reports, and I can physically see their projects in action right here in Multan. That transparency is very rare."
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Mobile Dental Clinic",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-2",
    title: "Rescue Inundation Drill",
    category: "Disaster Relief",
    imageUrl: "https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-3",
    title: "Ration Bags Assembly Line",
    category: "Welfare",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-4",
    title: "Primary School Library",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-5",
    title: "Clean Water Plant Inauguration",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-6",
    title: "Volunteer Training Session",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
  }
];

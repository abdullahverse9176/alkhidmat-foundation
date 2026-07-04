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
  title: string;
  description: string;
  iconName: "Flame" | "Apple" | "Stethoscope" | "GraduationCap" | "Droplet" | "Trees" | "Sparkles" | "Briefcase";
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

export const servicesData: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Disaster Relief",
    description: "Rapid response deployment for floods, earthquakes, and emergencies, providing food, clean drinking water, and safe shelter.",
    iconName: "Flame"
  },
  {
    id: "srv-2",
    title: "Food Distribution",
    description: "Daily meals and monthly ration packs provided to marginalized families and daily wage earners to fight food insecurity.",
    iconName: "Apple"
  },
  {
    id: "srv-3",
    title: "Medical Camps",
    description: "Free medical examinations, diagnostic tests, and prescription medicines organized in under-served rural communities.",
    iconName: "Stethoscope"
  },
  {
    id: "srv-4",
    title: "Education Support",
    description: "Scholarships, uniforms, books, and IT laboratory funding for deserving students from low-income households.",
    iconName: "GraduationCap"
  },
  {
    id: "srv-5",
    title: "Blood Donation",
    description: "A nationwide network of active donors, facilitating safe blood transfusions for thalassemia patients and emergencies.",
    iconName: "Droplet"
  },
  {
    id: "srv-6",
    title: "Tree Plantation",
    description: "Environmental restoration campaigns, aiming to plant 5 million indigenous trees to combat climate change.",
    iconName: "Trees"
  },
  {
    id: "srv-7",
    title: "Women Empowerment",
    description: "Skills development programs including sewing, vocational classes, and micro-grants to establish home-based startups.",
    iconName: "Sparkles"
  },
  {
    id: "srv-8",
    title: "Youth Development",
    description: "Leadership bootcamps, career guidance seminars, and sports initiatives to channel youth energy into nation-building.",
    iconName: "Briefcase"
  }
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

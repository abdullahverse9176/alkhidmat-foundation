export interface CostBreakdownItem {
  label: string;
  amount: string;
}

export interface ProjectHead {
  name: string;
  role: string;
  avatarUrl: string;
  message?: string;
}

export interface CleanWaterProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  location: string;
  province: "Sindh" | "Punjab" | "KPK" | "Balochistan" | "Kashmir";
  date: string;
  status: "Completed" | "In Progress" | "Maintenance";
  beneficiaries: string;
  projectHead: ProjectHead;
  cooperators: string[];
  costBreakdown: CostBreakdownItem[];
  totalCost: string;
  featuredImage: string;
  gallery: string[];
  techSpecs: {
    label: string;
    value: string;
  }[];
}

export const cleanWaterProjects: CleanWaterProject[] = [
  {
    id: "cwp-1",
    slug: "tharparkar-solar-well",
    title: "Tharparkar Desert Solar Water Well",
    shortDescription: "A deep solar-powered well providing sustainable drinking water to desert communities in rural Sindh.",
    longDescription: "Water scarcity is an everyday battle in the Tharparkar desert, where women and children historically walked up to 4 hours daily to fetch brackish water from unstable open pits. This project drills 250 feet through sandy layers to tap into a clean water aquifer. By utilizing high-capacity solar panels and a submersible pump, water is elevated into a 5,000-liter concrete storage tank. The gravity-fed multi-tap station allows dozens of families to collect fresh water simultaneously, eliminating waterborne illnesses and freeing up hours for children to attend school.",
    location: "Mithi, Tharparkar District",
    province: "Sindh",
    date: "March 2026",
    status: "Completed",
    beneficiaries: "350+ Families (approx. 2,100 people)",
    projectHead: {
      name: "Engr. Nisar Ahmed",
      role: "Senior Director Water Projects",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
      message: "Directing works in Tharparkar taught us that water isn't just a basic need, it is life itself. This solar setup is built to withstand desert heat and serve the community for decades."
    },
    cooperators: [
      "Rahima Welfare Trust (UK)",
      "Dr. Kamran Malik & Family",
      "Sadaqah Jariyah Group Canada",
      "Local Panchayat Council Mithi"
    ],
    costBreakdown: [
      { label: "Rig-Drilling & Boring (250 ft)", amount: "PKR 450,000" },
      { label: "Submersible Pump & Piping", amount: "PKR 170,000" },
      { label: "Solar Array (4 Panels + Inverter)", amount: "PKR 130,000" },
      { label: "Concrete Storage Tank & Civil Works", amount: "PKR 120,000" },
      { label: "Inaugural Plaque & Water Testing", amount: "PKR 30,000" }
    ],
    totalCost: "PKR 900,000",
    featuredImage: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
    ],
    techSpecs: [
      { label: "Drilling Depth", value: "250 Feet" },
      { label: "Power Source", value: "Solar (1.5 kW)" },
      { label: "Storage Capacity", value: "5,000 Liters" },
      { label: "Daily Water Yield", value: "12,000 Liters" }
    ]
  },
  {
    id: "cwp-2",
    slug: "kashmore-hand-pump",
    title: "Kashmore District Community Handpump",
    shortDescription: "A durable heavy-duty handpump serving a flood-affected neighborhood in Sindh with safe drinking water.",
    longDescription: "Following extensive seasonal floods, local water channels in Tangwani were heavily contaminated, leading to a rise in gastrointestinal diseases. Groundwater here is accessible at a shallow depth of 80 to 100 feet. We worked with local technicians to drill a clean bore, installing high-durability galvanized iron pipes and a heavy-duty manual brass suction pump. Built on a raised 4x4 feet concrete platform to prevent mud-seep and contaminated run-off, this simple hand pump provides a reliable, electricity-free water source for families who cannot afford water purification systems.",
    location: "Tangwani, Kashmore District",
    province: "Sindh",
    date: "May 2026",
    status: "Completed",
    beneficiaries: "45+ Families (approx. 270 people)",
    projectHead: {
      name: "Mr. Saeed-ur-Rehman",
      role: "Regional Field Supervisor",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
      message: "Manual hand pumps are the most cost-effective and resilient solutions for rural neighborhoods. They don't require power, are simple to repair, and provide clean water instantly."
    },
    cooperators: [
      "Anjum Family (USA)",
      "Mr. Bilal Siddiqui (Karachi)",
      "Al-Khidmat Citizens Alliance Youth Wing",
      "Kashmore Union Council 4"
    ],
    costBreakdown: [
      { label: "Boring & Soil Excavation (90 ft)", amount: "PKR 60,000" },
      { label: "Galvanized Iron Pipes & Filter", amount: "PKR 40,000" },
      { label: "Heavy Duty Brass Pump Head", amount: "PKR 25,000" },
      { label: "Elevated Concrete Platform & Plaque", amount: "PKR 25,000" }
    ],
    totalCost: "PKR 150,000",
    featuredImage: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=800"
    ],
    techSpecs: [
      { label: "Boring Depth", value: "90 Feet" },
      { label: "Pump Type", value: "Manual Suction (Brass)" },
      { label: "Platform Height", value: "1.5 Feet (Flood Proof)" },
      { label: "Life Expectancy", value: "15+ Years" }
    ]
  },
  {
    id: "cwp-3",
    slug: "chaman-solar-station",
    title: "Chaman Solar-Powered Water Station",
    shortDescription: "Deep rocky drilling with high-capacity solar pumps to provide water to arid communities near Chaman.",
    longDescription: "The terrain around Chaman in Balochistan is notoriously rocky and dry, with groundwater levels dropping below 300 feet. Traditional hand pumps are non-viable. We brought in heavy mechanical rotary rigs to cut through 350 feet of hard stone, securing a high-yield clean water source. Powered by a premium 8-panel solar array with a specialized DC-to-AC solar inverter, the system fills an elevated 10,000-liter steel water reservoir daily. A multi-tap concrete structure with integrated troughs for livestock ensures both families and their animals have regular, clean water access.",
    location: "Saddar, Chaman District",
    province: "Balochistan",
    date: "January 2026",
    status: "Completed",
    beneficiaries: "500+ Families (approx. 3,500 people)",
    projectHead: {
      name: "Engr. Khalid Durrani",
      role: "Quetta Water Works Director",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
      message: "Drilling through Balochistan's rocky terrain was a complex engineering challenge, but seeing the joy on the faces of families makes every effort worth it."
    },
    cooperators: [
      "Balochistan Welfare League",
      "Iqbal & Sons Trading Co.",
      "Sardar Jahangir Khan Achakzai",
      "Al-Khidmat Overseas Chapter Saudi Arabia"
    ],
    costBreakdown: [
      { label: "Heavy Rig Rock-Drilling (350 ft)", amount: "PKR 650,000" },
      { label: "Submersible Pump & Stainless Steel Cable", amount: "PKR 280,000" },
      { label: "Solar Panel Rack & 3kW Inverter", amount: "PKR 240,000" },
      { label: "10K Liters Steel Reservoir & Multi-tap", amount: "PKR 180,000" }
    ],
    totalCost: "PKR 1,350,000",
    featuredImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=800"
    ],
    techSpecs: [
      { label: "Drilling Depth", value: "350 Feet (Rocky)" },
      { label: "Solar Array", value: "3.2 kW (Mono Perc)" },
      { label: "Reservoir Size", value: "10,000 Liters" },
      { label: "Livestock Troughs", value: "Yes (2 Auxiliary)" }
    ]
  },
  {
    id: "cwp-4",
    slug: "layyah-filtration-plant",
    title: "Layyah Community Water Filtration Plant",
    shortDescription: "A modern Reverse Osmosis plant to combat heavy arsenic contamination in groundwater.",
    longDescription: "While groundwater is abundant in Choubara (Layyah), chemical analysis showed dangerous concentrations of arsenic and dissolved solids, causing chronic kidney diseases. We are constructing a community-scale water filtration station equipped with a high-capacity Reverse Osmosis (RO) and Carbon block filter system. Housed in a durable weather-proof brick structure, this facility processes local groundwater and dispenses arsenic-free, mineral-balanced safe drinking water to surrounding neighborhoods and local primary schools.",
    location: "Choubara, Layyah District",
    province: "Punjab",
    date: "July 2026",
    status: "In Progress",
    beneficiaries: "600+ Families (approx. 4,000 people)",
    projectHead: {
      name: "Dr. Muhammad Tahir Chaudhry",
      role: "Alliance Chairman",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
      message: "Water filtration plants are critical in districts like Layyah, where water is plentiful but slow-poisoning due to arsenic. This project is a direct healthcare intervention."
    },
    cooperators: [
      "Al-Khidmat Citizens Alliance UK Branch",
      "Overseas Pakistani Coalition (London)",
      "Haji Rafiq Brothers Cotton Ginnery",
      "Punjab Health Department Liaison"
    ],
    costBreakdown: [
      { label: "Deep Bore & High-Volume Pump", amount: "PKR 250,000" },
      { label: "Reverse Osmosis (RO) Purification Unit", amount: "PKR 480,000" },
      { label: "Brick Plant Housing & Civil Works", amount: "PKR 270,000" },
      { label: "Dual Dispensing Taps & Piping", amount: "PKR 100,000" }
    ],
    totalCost: "PKR 1,100,000",
    featuredImage: "https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=800"
    ],
    techSpecs: [
      { label: "Bore Depth", value: "180 Feet" },
      { label: "Filter Tech", value: "Reverse Osmosis + UV" },
      { label: "Output Rate", value: "1,000 Liters/Hour" },
      { label: "Arsenic Reduction", value: "99.2%" }
    ]
  }
];

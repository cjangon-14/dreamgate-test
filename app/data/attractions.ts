import type { Attraction } from '../types';
import { cardImagePlaceholder } from '~/assets';

export const attractions: Attraction[] = [
  {
    id: "sky-pass",
    name: "Tonyo’s Sky Pass",
    description:
      "Offers Access to the park with projection mapping and interactive elements.",
    image: cardImagePlaceholder,
    gradient: "linear-gradient(to top, #008287 0%, transparent 50%)",
    badgeLabel: "Entrance",
    badgeColor: "bg-navy-dark text-white",
    inclusions: ["Projection Mapping", "Interactive Elements"],
    price: 150.0,
    category: "ride",
    ageRequirement: 8,
    maxHeight: 200,
    featured: true,
  },
  {
    id: "sky-explorers",
    name: "Tonyo's Sky Explorers",
    description:
      "Designed for younger guests, offering the chance to explore two of the gentler rides.",
    image: cardImagePlaceholder,
    gradient: "linear-gradient(to top, #31acf9 0%, transparent 50%)",
    badgeLabel: "Child Combo",
    badgeColor: "bg-sky-main text-white",
    inclusions: ["Choose 2 from:"],
    choices: [
      "Wonder Flight",
      "Mini Air Spinner",
      "Sky Glider",
      "Cloud Bounce",
    ],
    price: 120.0,
    category: "ride",
    ageRequirement: 5,
    featured: true,
  },
  {
    id: "skyward-adventures",
    name: "Skyward Adventures",
    description:
      "Aimed at those seeking a blend of excitement, offering two thrilling yet not extreme experiences.",
    image: cardImagePlaceholder,
    gradient: "linear-gradient(to top, #1E5883 0%, transparent 50%)",
    badgeLabel: "Teen Combo",
    badgeColor: "bg-navy-main text-white",
    inclusions: ["Choose 2 from:"],
    choices: ["Wacky Adventure", "Loop", "BYB Express", "Space Bumpers"],
    price: 170.0,
    category: "ride",
    ageRequirement: 12,
    featured: true,
  },
  {
    id: "limit-thrills",
    name: "Sky's the Limit Thrills",
    description:
      "Offers Access to the park with projection mapping and interactive elements.",
    image: cardImagePlaceholder,
    gradient: "linear-gradient(to top, #EBA200 0%, transparent 50%)",
    badgeLabel: "Adults Combo",
    badgeColor: "bg-accent-orange text-white",
    inclusions: ["Choose 2 from:"],
    choices: ["Sky Voyager", "Spin Racer", "Star Trails Thrills"],
    price: 200.0,
    category: "ride",
    ageRequirement: 18,
    featured: true,
  },
];

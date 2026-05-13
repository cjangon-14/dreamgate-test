import type { Attraction } from "../types";
import { cardImagePlaceholder } from "~/assets";

export const attractions: Attraction[] = [
  {
    id: "portal-pass",
    name: "Entry",
    label: "Dream Gate Portal Pass",
    description:
      "Your key to the realm. Includes immersive digital environments and sensory-responsive art installations.",
    image_path: cardImagePlaceholder,
    selectable_attractions: 0,
    start_date: null,
    end_date: null,
    status: 1,
    free_attractions: [],
    // 1. ENTRY (Portal Pass) - Deep Royal Purple
    // Adjusted to be slightly darker at the base and fade out sooner
    gradient:
      "linear-gradient(to top, rgba(75, 0, 130, 0.85) 0%, rgba(75, 0, 130, 0) 30%)",
    // Theme: Indigo to Medium Purple gradient
    badgeColor: "bg-[linear-gradient(to_right,#4B0082,#9370DB)] text-white",
    inclusions: [""],
    choices: ["Living Projections", "Interactive Thresholds"],
    color: "#4B0082",
    base_amount: 100.0,
    category: "ride",
    featured: true,
  },
  {
    id: "fable-seekers",
    name: "Young Dreamer Combo",
    label: "The Fable Seekers Pass",
    description:
      "Crafted for our youngest adventurers to experience two of our most gentle, magical attractions.",
    image_path: cardImagePlaceholder,
    selectable_attractions: 2,
    start_date: null,
    end_date: null,
    status: 1,
    free_attractions: [],
    // Theme: Soft Lavender
    gradient: "linear-gradient(to top, #9370DB 0%, transparent 50%)",
    badgeColor:
      "bg-[linear-gradient(to_right,#9370DB,#E6E6FA)] text-indigo-900",
    inclusions: ["Choose 2 from:"],
    choices: [
      "Starlight Carousel",
      "Cloud Cradle",
      "Butterfly Glide",
      "Bubble Bounce",
    ],
    color: "#9370DB",
    base_amount: 120.0,
    category: "ride",
    featured: true,
  },
  {
    id: "twilight-voyagers",
    name: "Pathfinder Combo",
    label: "Twilight Voyagers",
    description:
      "Perfect for those seeking spirited adventure. Choose two mid-tier experiences that blend magic with movement.",
    image_path: cardImagePlaceholder,
    selectable_attractions: 2,
    start_date: null,
    end_date: null,
    status: 1,
    free_attractions: [],
    // 2. PATHFINDER COMBO (Twilight Voyagers) - Twilight Navy
    // Adjusted for higher contrast against the white text
    gradient:
      "linear-gradient(to top, rgba(25, 25, 112, 0.9) 0%, rgba(25, 25, 112, 0) 30%)",
    badgeColor: "bg-[linear-gradient(to_right,#191970,#4B0082)] text-white",
    inclusions: ["Choose 2 from:"],
    choices: [
      "Enchanted Maze",
      "The Spiral",
      "Echo Express",
      "Gravity Bumpers",
    ],
    color: "#191970",
    base_amount: 170.0,
    category: "ride",
    featured: true,
  },
  {
    id: "ethereal-peak",
    name: "Master Dreamer Combo",
    label: "Peak Ethereal Thrills",
    description:
      "The ultimate experience for thrill-seekers. Select two of our most intense, high-energy dreamscapes.",
    image_path: cardImagePlaceholder,
    selectable_attractions: 2,
    start_date: null,
    end_date: null,
    status: 1,
    free_attractions: [],
    // Theme: Golden Starlight
    gradient: "linear-gradient(to top, #D4AF37 0%, transparent 50%)",
    badgeColor: "bg-[linear-gradient(to_right,#D4AF37,#FFD700)] text-black",
    inclusions: ["Choose 2 from:"],
    choices: ["Nebula Vortex", "Comet Racer", "Supernova Drop", "Quantum Leap"],
    color: "#D4AF37",
    base_amount: 200.0,
    category: "ride",
    featured: true,
  },
];

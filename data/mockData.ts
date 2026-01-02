import { Project } from '../types';

export const PREBUILT_EXPERIENCES: Project[] = [
  // Food Category
  {
    id: "food-burger-deluxe",
    name: "Burger Deluxe",
    description: "A mouth-watering gourmet burger with realistic textures and lighting.",
    status: "live",
    category: "food",
    isPrebuilt: true,
    views: 3120,
    interactions: 2450,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb", // Placeholder model for food
    thumbnailUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-14T10:00:00Z",
    avgDwellTime: "1m 30s",
    settings: { scale: 5, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "food-olives",
    name: "Gourmet Olives",
    description: "Realistic dish with olives using advanced glTF sheen and iridescence extensions.",
    status: "live",
    category: "food",
    isPrebuilt: true,
    views: 1243,
    interactions: 892,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1596707323533-5c74384cb32d?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-15T10:00:00Z",
    avgDwellTime: "45s",
    settings: { scale: 5, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "food-fridge",
    name: "Commercial Cooler",
    description: "High-detail industrial refrigerator for restaurant and commercial kitchen previews.",
    status: "live",
    category: "food",
    isPrebuilt: true,
    views: 756,
    interactions: 521,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CommercialRefrigerator/glTF-Binary/CommercialRefrigerator.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-17T10:00:00Z",
    avgDwellTime: "2m 10s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },

  // Decoration Category
  {
    id: "decor-leather-sofa",
    name: "Sheen Leather Sofa",
    description: "Luxury wood and leather sofa showcasing advanced material sheen properties.",
    status: "live",
    category: "decoration",
    isPrebuilt: true,
    views: 2134,
    interactions: 1567,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenWoodLeatherSofa/glTF-Binary/SheenWoodLeatherSofa.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-18T10:00:00Z",
    avgDwellTime: "3m 12s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "decor-sheen-chair",
    name: "Velvet Accent Chair",
    description: "Modern accent chair with sophisticated sheen fabric and wooden legs.",
    status: "live",
    category: "decoration",
    isPrebuilt: true,
    views: 1432,
    interactions: 987,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-19T10:00:00Z",
    avgDwellTime: "1m 45s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "decor-stained-glass-lamp",
    name: "Stained Glass Lamp",
    description: "Intricate stained glass lamp featuring complex transmission and lighting properties.",
    status: "live",
    category: "decoration",
    isPrebuilt: true,
    views: 891,
    interactions: 612,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/StainedGlassLamp/glTF-Binary/StainedGlassLamp.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1513506003011-3b03c8b69580?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-20T10:00:00Z",
    avgDwellTime: "2m 00s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },

  // Miscellaneous Category
  {
    id: "misc-luxury-watch",
    name: "Chronograph Watch",
    description: "High-precision chronograph watch with metallic finishes and complex geometry.",
    status: "live",
    category: "custom",
    isPrebuilt: true,
    views: 3421,
    interactions: 2678,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChronographWatch/glTF-Binary/ChronographWatch.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-21T10:00:00Z",
    avgDwellTime: "55s",
    settings: { scale: 10, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "misc-car-concept",
    name: "Concept Car",
    description: "Sleek automotive concept showcasing clear-coat and metallic materials.",
    status: "live",
    category: "custom",
    isPrebuilt: true,
    views: 2567,
    interactions: 1890,
    modelUrl:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-22T10:00:00Z",
    avgDwellTime: "3m 45s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "misc-duck",
    name: "Iconic Yellow Duck",
    description: "The classic glTF sample duck, perfect for testing WebAR scale and placement.",
    status: "live",
    category: "custom",
    isPrebuilt: true,
    views: 1876,
    interactions: 1234,
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-23T10:00:00Z",
    avgDwellTime: "25s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
];

export const getProject = (id: string): Project | null => {
  return PREBUILT_EXPERIENCES.find(p => p.id === id) || null;
}

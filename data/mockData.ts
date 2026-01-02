import { Project } from '../types';

export const TEMPLATES = [
  { 
    label: 'Fresh Avocado', 
    category: 'food', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1523049673856-606ae93a979d?auto=format&fit=crop&q=80&w=200',
    description: 'High-fidelity 3D scan of a fresh avocado, perfect for grocery AR.' 
  },
  { 
    label: 'Gourmet Olives', 
    category: 'food', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1596707323533-5c74384cb32d?auto=format&fit=crop&q=80&w=200',
    description: 'Realistic dish with olives using advanced glTF sheen and iridescence.' 
  },
  { 
    label: 'Velvet Chair', 
    category: 'real-estate', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=200',
    description: 'Modern accent chair with sophisticated sheen fabric.' 
  },
  { 
    label: 'Leather Sofa', 
    category: 'real-estate', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenWoodLeatherSofa/glTF-Binary/SheenWoodLeatherSofa.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=200',
    description: 'Luxury wood and leather sofa for virtual home staging.' 
  },
  { 
    label: 'Antique Camera', 
    category: 'decoration', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200',
    description: 'Vintage camera model for detailed prop visualization.' 
  },
  { 
    label: 'Sports Sneaker', 
    category: 'fashion', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', 
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
    description: 'High-detail sneaker with multiple material variants.' 
  },
  {
    label: 'Concept Car',
    category: 'automotive',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=200',
    description: 'Sleek automotive concept showcasing clear-coat materials.'
  }
];

export const PREBUILT_EXPERIENCES: Project[] = [
  // Food Category
  {
    id: "food-avocado",
    name: "Fresh Avocado",
    description: TEMPLATES[0].description,
    status: "live",
    category: "food",
    isPrebuilt: true,
    views: 4521,
    interactions: 3102,
    modelUrl: TEMPLATES[0].url,
    thumbnailUrl: TEMPLATES[0].thumbnail,
    createdAt: "2024-02-01T10:00:00Z",
    avgDwellTime: "45s",
    settings: { scale: 10, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "food-olives",
    name: "Gourmet Olives",
    description: TEMPLATES[1].description,
    status: "live",
    category: "food",
    isPrebuilt: true,
    views: 1243,
    interactions: 892,
    modelUrl: TEMPLATES[1].url,
    thumbnailUrl: TEMPLATES[1].thumbnail,
    createdAt: "2024-01-15T10:00:00Z",
    avgDwellTime: "1m 12s",
    settings: { scale: 5, autoRotate: true, pinchToZoom: true },
  },

  // Real Estate / Staging
  {
    id: "re-sofa",
    name: "Sheen Leather Sofa",
    description: TEMPLATES[3].description,
    status: "live",
    category: "real-estate",
    isPrebuilt: true,
    views: 2134,
    interactions: 1567,
    modelUrl: TEMPLATES[3].url,
    thumbnailUrl: TEMPLATES[3].thumbnail,
    createdAt: "2024-01-18T10:00:00Z",
    avgDwellTime: "3m 12s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "re-chair",
    name: "Velvet Accent Chair",
    description: TEMPLATES[2].description,
    status: "live",
    category: "real-estate",
    isPrebuilt: true,
    views: 1432,
    interactions: 987,
    modelUrl: TEMPLATES[2].url,
    thumbnailUrl: TEMPLATES[2].thumbnail,
    createdAt: "2024-01-19T10:00:00Z",
    avgDwellTime: "1m 45s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },

  // Decoration
  {
    id: "decor-camera",
    name: "Antique Camera",
    description: TEMPLATES[4].description,
    status: "live",
    category: "decoration",
    isPrebuilt: true,
    views: 891,
    interactions: 612,
    modelUrl: TEMPLATES[4].url,
    thumbnailUrl: TEMPLATES[4].thumbnail,
    createdAt: "2024-01-20T10:00:00Z",
    avgDwellTime: "2m 00s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "decor-lamp",
    name: "Stained Glass Lamp",
    description: "Intricate stained glass lamp featuring transmission properties.",
    status: "live",
    category: "decoration",
    isPrebuilt: true,
    views: 654,
    interactions: 423,
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/StainedGlassLamp/glTF-Binary/StainedGlassLamp.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1513506003011-3b03c8b69580?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-20T10:00:00Z",
    avgDwellTime: "1m 30s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },

  // Fashion / Custom
  {
    id: "fashion-shoe",
    name: "Urban Sneaker",
    description: TEMPLATES[5].description,
    status: "live",
    category: "fashion",
    isPrebuilt: true,
    views: 5678,
    interactions: 4321,
    modelUrl: TEMPLATES[5].url,
    thumbnailUrl: TEMPLATES[5].thumbnail,
    createdAt: "2024-02-05T10:00:00Z",
    avgDwellTime: "2m 15s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "misc-watch",
    name: "Chronograph Watch",
    description: "Precision watch with metallic finishes.",
    status: "live",
    category: "fashion",
    isPrebuilt: true,
    views: 3421,
    interactions: 2678,
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChronographWatch/glTF-Binary/ChronographWatch.glb",
    thumbnailUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-01-21T10:00:00Z",
    avgDwellTime: "55s",
    settings: { scale: 10, autoRotate: true, pinchToZoom: true },
  },
  {
    id: "misc-car",
    name: "Concept Car",
    description: TEMPLATES[6].description,
    status: "live",
    category: "automotive",
    isPrebuilt: true,
    views: 2567,
    interactions: 1890,
    modelUrl: TEMPLATES[6].url,
    thumbnailUrl: TEMPLATES[6].thumbnail,
    createdAt: "2024-01-22T10:00:00Z",
    avgDwellTime: "3m 45s",
    settings: { scale: 1, autoRotate: true, pinchToZoom: true },
  },
];

export const getProject = (id: string): Project | null => {
  return PREBUILT_EXPERIENCES.find(p => p.id === id) || null;
}

export const addProject = (project: Project) => {
  PREBUILT_EXPERIENCES.unshift(project);
}
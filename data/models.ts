export interface ARModel {
  id: string;
  name: string;
  url: string;
  scale: string;
  position: string;
  rotation: string;
}

export const AR_MODELS: ARModel[] = [
  { 
    id: 'avocado',
    name: 'Fresh Avocado', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb',
    scale: '10 10 10',
    position: '0 0 0',
    rotation: '0 0 0'
  },
  { 
    id: 'sneaker',
    name: 'Urban Sneaker', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
    scale: '5 5 5',
    position: '0 0 0',
    rotation: '0 0 0'
  },
  { 
    id: 'chair',
    name: 'Velvet Chair', 
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb',
    scale: '2 2 2',
    position: '0 0 0',
    rotation: '0 0 0'
  },
  {
    id: 'camera',
    name: 'Antique Camera',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
    scale: '1 1 1',
    position: '0 0 0',
    rotation: '0 -90 0'
  }
];
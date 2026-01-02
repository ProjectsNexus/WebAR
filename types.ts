

export interface ProjectSettings {
  scale: number;
  autoRotate: boolean;
  pinchToZoom: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  modelUrl: string;
  views: number;
  interactions?: number;
  avgDwellTime?: string;
  createdAt: string;
  status: 'active' | 'draft' | 'archived' | 'live';
  category?: 'food' | 'decoration' | 'real-estate' | 'fashion' | 'automotive' | 'custom';
  isPrebuilt?: boolean;
  settings?: ProjectSettings;
}

export interface AnalyticsData {
  date: string;
  views: number;
  interactions: number;
}

export interface CampaignIdea {
  title: string;
  strategy: string;
  callToAction: string;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  EDITOR = 'EDITOR',
  AR_PREVIEW = 'AR_PREVIEW',
  LANDING = 'LANDING'
}

// Global JSX Declaration for A-Frame
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-camera': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-marker': any;
      'a-box': any;
      'a-sphere': any;
      'a-cylinder': any;
      'a-plane': any;
      'a-sky': any;
      'a-light': any;
      'a-cursor': any;
      [elemName: string]: any;
    }
  }
}
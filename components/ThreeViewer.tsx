import React, { useEffect, useRef } from 'react';

// Fix for TypeScript errors with A-Frame elements in React 18+
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-entity': any;
      'a-camera': any;
      'a-light': any;
      'a-sky': any;
      'a-marker': any;
      'a-cursor': any;
      'a-box': any;
      'a-sphere': any;
      'a-cylinder': any;
      'a-plane': any;
    }
  }
}

interface ThreeViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({ modelUrl, autoRotate = false }) => {
  const modelRef = useRef<any>(null);

  // Use a unique ID for the asset to prevent caching collisions if multiple viewers existed (though mostly singleton usage here)
  const assetId = `model-asset-${modelUrl.replace(/[^a-z0-9]/gi, '').slice(0, 8)}`;

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      {/* Embedded A-Frame Scene for 3D Preview */}
      <a-scene 
        embedded 
        vr-mode-ui="enabled: false"
        renderer="colorManagement: true; antialias: true; alpha: true;"
        style={{ width: '100%', height: '100%' }}
      >
        <a-assets>
          <a-asset-item id={assetId} src={modelUrl}></a-asset-item>
        </a-assets>

        {/* Camera with Look Controls */}
        <a-entity position="0 1 4">
            <a-camera look-controls="enabled: true" wasd-controls="enabled: false"></a-camera>
        </a-entity>

        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="10 10 5" intensity="1" castShadow="true"></a-light>
        <a-light type="directional" position="-10 5 -5" intensity="0.5"></a-light>

        {/* The Model */}
        <a-entity 
          gltf-model={`#${assetId}`}
          position="0 0 0"
          scale="1 1 1"
          animation={autoRotate ? "property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear" : undefined}
        ></a-entity>
      </a-scene>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/70">
          A-Frame 3D
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { ARModel } from '../data/models';

interface ARViewProps {
  model: ARModel;
}

export const ARView: React.FC<ARViewProps> = ({ model }) => {
  const sceneRef = useRef<any>(null);

  // We key the entity by model ID to force a re-mount/refresh of the GLB when switching
  // This ensures textures and geometry update cleanly without artifacts.
  console.log(model)
  return (
    <div className="absolute inset-0 z-0">
      <a-scene
        ref={sceneRef}
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; colorManagement: true; alpha: true;"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lights - Essential for seeing the 3D model */}
        <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
        <a-light type="directional" position="0 5 0" intensity="1"></a-light>

        <a-marker preset="hiro">
            <a-entity
              key={model.id}
              gltf-model={model.url}
              scale={model.scale}
              position={model.position}
              rotation={model.rotation}
              animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
            ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      
      {/* Helper Overlay */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none z-10">
          <div className="inline-block bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
              <p className="text-white text-xs font-medium">Scan "Hiro" Marker</p>
          </div>
      </div>
    </div>
  );
};
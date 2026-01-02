import React, { useEffect, useRef, useState } from 'react';
import { Maximize, MoveVertical, RotateCw, RefreshCcw, Pause, Play } from 'lucide-react';
import { Button } from './ui/Button';

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
  scale?: number;
  id?: string;
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({ modelUrl, autoRotate = false, scale = 1, id }) => {
  const modelRef = useRef<any>(null);
  
  // State for the "Base" transform (calculated automatically on load)
  const [baseTransform, setBaseTransform] = useState({ 
    scale: 1, 
    position: { x: 0, y: 0, z: 0 } 
  });
  
  // State for "User" overrides (controlled via UI)
  const [userZoom, setUserZoom] = useState(1.0);
  const [userHeight, setUserHeight] = useState(0);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync prop changes if they occur externally
  useEffect(() => {
    setIsRotating(autoRotate);
  }, [autoRotate]);

  useEffect(() => {
    const handleModelLoaded = (evt: any) => {
        const entity = evt.target;
        const object3D = entity.object3D;
        
        if (object3D) {
            // We use a timeout to ensure the bounding box is ready
            setTimeout(() => {
                const box = new (window as any).THREE.Box3().setFromObject(object3D);
                const size = new (window as any).THREE.Vector3();
                const center = new (window as any).THREE.Vector3();
                box.getSize(size);
                box.getCenter(center);

                // Auto-scale to fit nicely in a ~3 unit view
                const maxDim = Math.max(size.x, size.y, size.z);
                // Prevent division by zero
                const targetScale = maxDim > 0 ? (3 / maxDim) * scale : 1;
                
                // Calculate centered position based on the NEW scale
                const centeredX = -center.x * targetScale;
                const centeredY = -center.y * targetScale;
                const centeredZ = -center.z * targetScale;
                
                // Store these base values. We will apply user modifiers during render.
                setBaseTransform({
                    scale: targetScale,
                    position: { x: centeredX, y: centeredY, z: centeredZ }
                });
                setIsLoaded(true);
            }, 100);
        }
    };

    const entity = modelRef.current;
    if (entity) {
        entity.addEventListener('model-loaded', handleModelLoaded);
    }
    
    return () => {
        if (entity) entity.removeEventListener('model-loaded', handleModelLoaded);
    }
  }, [modelUrl, scale]);

  const handleReset = () => {
      setUserZoom(1.0);
      setUserHeight(0);
      setIsRotating(autoRotate);
  };

  // Calculate final transforms
  const finalScale = baseTransform.scale * userZoom;
  const finalPosition = `${baseTransform.position.x} ${baseTransform.position.y + userHeight} ${baseTransform.position.z}`;

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden group">
      {/* Embedded A-Frame Scene for 3D Preview */}
      <a-scene 
        embedded 
        vr-mode-ui="enabled: false"
        renderer="colorManagement: true; antialias: true; alpha: true;"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Camera with Look Controls */}
        <a-entity position="0 0 4">
            <a-camera look-controls="enabled: true" wasd-controls="enabled: false"></a-camera>
        </a-entity>

        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="10 10 5" intensity="1" castShadow="true"></a-light>
        <a-light type="directional" position="-10 5 -5" intensity="0.5"></a-light>

        {/* Rotation Wrapper */}
        <a-entity
            animation={isRotating ? "property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear" : ""}
            rotation={!isRotating ? "0 0 0" : undefined} // Reset rotation when stopped (optional, or let it pause)
        >
            {/* The Model with transforms */}
            <a-entity 
                ref={modelRef}
                gltf-model={modelUrl}
                scale={`${finalScale} ${finalScale} ${finalScale}`}
                position={finalPosition}
            ></a-entity>
        </a-entity>
      </a-scene>

      {/* Floating Controls Overlay */}
      {isLoaded && (
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col gap-3">
                
                {/* Control Row 1: Toggles */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Viewer Controls</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsRotating(!isRotating)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title={isRotating ? "Stop Rotation" : "Start Rotation"}
                        >
                            {isRotating ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button 
                            onClick={handleReset}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Reset View"
                        >
                            <RefreshCcw size={14} />
                        </button>
                    </div>
                </div>

                {/* Control Row 2: Sliders */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Zoom/Scale */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-textMuted">
                            <Maximize size={12} />
                            <span>Scale</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.5" 
                            max="2.5" 
                            step="0.1" 
                            value={userZoom}
                            onChange={(e) => setUserZoom(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                    </div>

                    {/* Height/Y */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-textMuted">
                            <MoveVertical size={12} />
                            <span>Height</span>
                        </div>
                        <input 
                            type="range" 
                            min="-2" 
                            max="2" 
                            step="0.1" 
                            value={userHeight}
                            onChange={(e) => setUserHeight(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* Persistent Badge (Hidden when controls are shown on hover) */}
      <div className="absolute top-4 right-4 pointer-events-none group-hover:opacity-0 transition-opacity">
        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Interactive 3D
        </div>
      </div>
    </div>
  );
};
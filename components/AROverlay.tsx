import React, { useEffect, useState, useRef } from 'react';
import { X, AlertTriangle, Printer, Loader2, RefreshCw, Hand } from 'lucide-react';
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

interface AROverlayProps {
  modelUrl: string;
  onClose: () => void;
  ctaText?: string;
}

type LoadingStage = 'initializing' | 'downloading' | 'processing' | 'ready';

/**
 * AROverlay using A-Frame + AR.js
 * Defaulting to Hiro Marker tracking as it's the most reliable "Hello World" for AR.js
 * without requiring custom pattern generation on the fly.
 */
export const AROverlay: React.FC<AROverlayProps> = ({ modelUrl, onClose, ctaText }) => {
  const [markerFound, setMarkerFound] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('initializing');
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  
  const modelEntityRef = useRef<any>(null);

  // Messages for different loading stages
  const loadingMessages = {
    initializing: { title: 'Initializing AR Session', sub: 'Accessing camera feed...' },
    downloading: { title: 'Downloading Assets', sub: 'Fetching 3D model data...' },
    processing: { title: 'Rendering Scene', sub: 'Applying textures and materials...' },
    ready: { title: 'Ready', sub: '' }
  };

  useEffect(() => {
    // Add event listeners for marker detection
    const handleMarkerFound = () => setMarkerFound(true);
    const handleMarkerLost = () => setMarkerFound(false);
    
    // Handle Model Interaction (Click/Tap)
    const handleModelClick = () => {
      if (loadingStage !== 'ready') return;
      
      console.log("Model Tapped!");
      setIsInteracting(true);
      setInteractionCount(prev => prev + 1);

      // Reset interaction flag after animation completes to allow re-triggering
      setTimeout(() => {
        setIsInteracting(false);
      }, 1000);
    };

    // Handle Model Loading & Normalization
    const handleModelLoaded = (evt: any) => {
      console.log("AR Model Downloaded");
      setLoadingStage('processing');

      // --- Geometry Normalization Logic ---
      // We need to ensure the model sits nicely on the marker regardless of its native scale.
      const entity = evt.target;
      const object3D = entity.object3D;
      
      if (object3D) {
        // We use a small timeout to let Three.js compute the bounding box correctly after parsing
        setTimeout(() => {
            // Calculate Bounding Box
            const box = new (window as any).THREE.Box3().setFromObject(object3D);
            const size = new (window as any).THREE.Vector3();
            const center = new (window as any).THREE.Vector3();
            box.getSize(size);
            box.getCenter(center);

            // 1. Auto-Scale: Fit into a 1.5x1.5x1.5 unit box (AR.js marker is roughly 1 unit)
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetScale = 1.5 / maxDim;
            
            // Apply scale
            entity.setAttribute('scale', `${targetScale} ${targetScale} ${targetScale}`);

            // 2. Center & Sit on Floor
            // We want the object centered on X/Z, but resting on the floor (Y=0)
            const centeredX = -center.x * targetScale;
            const bottomY = -box.min.y * targetScale;
            const centeredZ = -center.z * targetScale;

            entity.setAttribute('position', `${centeredX} ${bottomY} ${centeredZ}`);
            
            console.log(`Auto-scaled: ${targetScale}, Offset: ${centeredX} ${bottomY} ${centeredZ}`);
            
            // Transition to ready
            setLoadingStage('ready');
        }, 500); // Short delay for processing visual
      } else {
        setLoadingStage('ready');
      }
    };

    // Simulate Initialization Phase
    const initTimer = setTimeout(() => {
      setLoadingStage(prev => prev === 'initializing' ? 'downloading' : prev);
    }, 1500);

    // Attach listeners
    const modelEntity = modelEntityRef.current;
    if (modelEntity) {
      modelEntity.addEventListener('model-loaded', handleModelLoaded);
      modelEntity.addEventListener('click', handleModelClick);
    }

    // Save original styles
    const originalBodyBg = document.body.style.backgroundColor;
    const originalRootBg = document.getElementById('root')?.style.backgroundColor;

    // Force transparency on body and root to allow AR video to show through
    document.body.style.backgroundColor = 'transparent';
    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.style.backgroundColor = 'transparent';

    // We need to wait for the DOM to be ready and A-Frame to initialize for global markers
    const timeout = setTimeout(() => {
      const marker = document.querySelector('a-marker');
      if (marker) {
        marker.addEventListener('markerFound', handleMarkerFound);
        marker.addEventListener('markerLost', handleMarkerLost);
      }
    }, 1000);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      clearTimeout(initTimer);
      
      const marker = document.querySelector('a-marker');
      if (marker) {
        marker.removeEventListener('markerFound', handleMarkerFound);
        marker.removeEventListener('markerLost', handleMarkerLost);
      }

      if (modelEntity) {
        modelEntity.removeEventListener('model-loaded', handleModelLoaded);
        modelEntity.removeEventListener('click', handleModelClick);
      }
      
      // Restore styles
      document.body.style.backgroundColor = originalBodyBg;
      if (rootEl) rootEl.style.backgroundColor = originalRootBg || '';
      
      // Cleanup AR.js video and canvas from body
      const arVideo = document.getElementById('arjs-video');
      if (arVideo) arVideo.remove();
      
      // Reset body styles that AR.js might have touched
      document.body.style.overflow = '';
      document.body.style.margin = '';
    };
  }, [loadingStage]);

  return (
    <div className="fixed inset-0 z-50 bg-transparent">
      {/* Loading Overlay */}
      {loadingStage !== 'ready' && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 text-white backdrop-blur-sm transition-opacity duration-300">
          <div className="flex flex-col items-center gap-6 max-w-xs text-center px-6">
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
               <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {loadingMessages[loadingStage].title}
              </h3>
              <p className="text-sm text-primary/80 font-medium">
                {loadingMessages[loadingStage].sub}
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2 mt-2">
              <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${loadingStage !== 'initializing' ? 'bg-primary' : 'bg-white/20'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${['processing', 'ready'].includes(loadingStage) ? 'bg-primary' : 'bg-white/20'}`} />
              <div className="h-1.5 w-8 rounded-full transition-colors duration-300 bg-white/20" />
            </div>
          </div>
        </div>
      )}

      {/* Close Button */}
      <div className="absolute top-4 right-4 z-50">
         <button onClick={onClose} className="p-2 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition-colors">
            <X className="w-6 h-6" />
         </button>
      </div>

      {/* Interaction Toast */}
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isInteracting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-primary/90 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2">
          <Hand className="w-4 h-4" />
          <span className="text-sm font-bold">Interacting!</span>
        </div>
      </div>

      {/* UI Overlay */}
      {loadingStage === 'ready' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 text-center pointer-events-none">
          {!markerFound ? (
             <div className="bg-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-white/10 animate-pulse pointer-events-auto shadow-2xl">
               <div className="flex flex-col items-center gap-2">
                 <Printer className="w-8 h-8 text-primary" />
                 <p className="font-bold">Scan "Hiro" Marker</p>
                 <p className="text-xs text-gray-300">Point your camera at a Hiro marker to view the object.</p>
                 <a 
                   href="https://upload.wikimedia.org/wikipedia/commons/4/48/Hiro_marker_ARjs.png" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-xs text-primary underline mt-1"
                 >
                   Get Marker Here
                 </a>
               </div>
             </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
                {/* Helper Text */}
                <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-full text-xs text-white/80">
                    Tap object to rotate
                </div>
                
                <div className="bg-green-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 shadow-lg shadow-green-900/20">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Tracking Active
                </div>
            </div>
          )}
        </div>
      )}

      {/* AR Scene */}
      {/* 
        arjs parameters: sourceType: webcam; debugUIEnabled: false; 
        cursor="rayOrigin: mouse" enables mouse/touch interaction with 3D objects
        raycaster="objects: .clickable" limits the raycasting to objects with class 'clickable'
      */}
      <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; colorManagement: true;"
        cursor="rayOrigin: mouse"
        raycaster="objects: .clickable"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="0 5 0" intensity="1"></a-light>

        {/* Hiro Marker */}
        <a-marker preset="hiro">
          {/* 
             Model Entity 
             - We attach 'clickable' class for the raycaster
             - Animation switches between slow idle loop and fast interaction spin
          */}
          <a-entity 
            ref={modelEntityRef}
            className="clickable"
            id="ar-model-entity"
            gltf-model={modelUrl}
            position="0 0 0" 
            animation={
                isInteracting 
                ? `property: rotation; to: 0 ${360 * (interactionCount + 1)} 0; dur: 1000; easing: easeInOutQuad`
                : "property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
            }
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};
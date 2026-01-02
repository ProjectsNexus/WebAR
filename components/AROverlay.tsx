import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, Printer } from 'lucide-react';
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

/**
 * AROverlay using A-Frame + AR.js
 * Defaulting to Hiro Marker tracking as it's the most reliable "Hello World" for AR.js
 * without requiring custom pattern generation on the fly.
 */
export const AROverlay: React.FC<AROverlayProps> = ({ modelUrl, onClose, ctaText }) => {
  const [markerFound, setMarkerFound] = useState(false);

  useEffect(() => {
    // Add event listeners for marker detection
    const handleMarkerFound = () => setMarkerFound(true);
    const handleMarkerLost = () => setMarkerFound(false);

    // Save original styles
    const originalBodyBg = document.body.style.backgroundColor;
    const originalRootBg = document.getElementById('root')?.style.backgroundColor;

    // Force transparency on body and root to allow AR video to show through
    document.body.style.backgroundColor = 'transparent';
    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.style.backgroundColor = 'transparent';

    // We need to wait for the DOM to be ready and A-Frame to initialize
    const timeout = setTimeout(() => {
      const marker = document.querySelector('a-marker');
      if (marker) {
        marker.addEventListener('markerFound', handleMarkerFound);
        marker.addEventListener('markerLost', handleMarkerLost);
      }
    }, 1000);

    // Cleanup: Reload page on close? 
    // AR.js modifies the body styles (video tag) and doesn't clean up well when unmounted.
    // In a SPA, it's often safer to reload or forcibly remove the video element.
    return () => {
      clearTimeout(timeout);
      const marker = document.querySelector('a-marker');
      if (marker) {
        marker.removeEventListener('markerFound', handleMarkerFound);
        marker.removeEventListener('markerLost', handleMarkerLost);
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
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-transparent">
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-50">
         <button onClick={onClose} className="p-2 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition-colors">
            <X className="w-6 h-6" />
         </button>
      </div>

      {/* UI Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 text-center pointer-events-none">
        {!markerFound ? (
           <div className="bg-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-white/10 animate-pulse pointer-events-auto">
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
          <div className="bg-green-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium inline-flex items-center gap-2">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
             Tracking Active
          </div>
        )}
      </div>

      {/* AR Scene */}
      {/* arjs parameters: sourceType: webcam; debugUIEnabled: false; */}
      <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; colorManagement: true;"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <a-assets>
            <a-asset-item id="ar-model" src={modelUrl}></a-asset-item>
        </a-assets>

        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="0 5 0" intensity="1"></a-light>

        {/* Hiro Marker */}
        <a-marker preset="hiro">
          <a-entity 
            gltf-model="#ar-model" 
            scale="0.5 0.5 0.5" 
            position="0 0 0" 
            animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};
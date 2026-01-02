import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeViewer } from '../components/ThreeViewer';
import { AROverlay } from '../components/AROverlay';
import { Button } from '../components/ui/Button';
import { Box, Scan, ArrowLeft } from 'lucide-react';
import { Project } from '../types';
import { getProject } from '../data/mockData';

const Experience: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [mode, setMode] = useState<'3d' | 'ar'>('3d');

  useEffect(() => {
    if (id) {
      setProject(getProject(id));
    }
  }, [id]);

  if (!project) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading Experience...</div>;

  return (
    <div className={`h-screen w-full relative overflow-hidden flex flex-col ${mode === 'ar' ? 'bg-transparent' : 'bg-background'}`}>
      {/* Navbar for Mobile Web View - Hide in AR mode or keep visible? Usually keep visible or overlay. */}
      {/* If transparent background, navbar needs to be handled carefully. Let's keep it but ensure z-index is high enough if needed. */}
      <div className="h-16 flex items-center justify-between px-4 z-10 bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
            <Box className="text-primary w-5 h-5" />
          </div>
          <span className="font-bold text-white drop-shadow-md">{project.name}</span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 relative">
        {mode === 'ar' ? (
          <AROverlay 
            modelUrl={project.modelUrl} 
            onClose={() => setMode('3d')} 
          />
        ) : (
          <ThreeViewer modelUrl={project.modelUrl} autoRotate />
        )}
      </div>

      {/* Bottom Controls */}
      {mode === '3d' && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
          <div className="max-w-md mx-auto w-full space-y-4">
             <div className="text-center">
               <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
               <p className="text-gray-300 text-sm mb-6">Experience this product in your own space using WebAR technology.</p>
             </div>
             
             <Button 
               onClick={() => setMode('ar')} 
               className="w-full h-14 text-lg shadow-lg shadow-primary/25"
               leftIcon={<Scan className="w-6 h-6" />}
             >
               View in My Space
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
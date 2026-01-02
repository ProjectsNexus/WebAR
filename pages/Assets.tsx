import React from 'react';
import { Layout } from '../components/Layout';
import { UploadCloud, Filter, MoreHorizontal, Box } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PREBUILT_EXPERIENCES } from '../data/mockData';

const Assets: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-textMain mb-1">Asset Library</h1>
            <p className="text-textMuted">Manage 3D models and materials.</p>
          </div>
          <Button leftIcon={<UploadCloud size={18} />}>Upload Asset</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {PREBUILT_EXPERIENCES.map((asset) => (
             <div key={asset.id} className="bg-surface rounded-xl border border-surfaceHighlight overflow-hidden group hover:border-primary/50 transition-all">
                <div className="aspect-square bg-surfaceHighlight/30 relative overflow-hidden">
                    <img 
                        src={asset.thumbnailUrl} 
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary">Preview</Button>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-mono">
                        GLB
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-textMain truncate pr-2">{asset.name}</h3>
                        <button className="text-textMuted hover:text-textMain">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    <p className="text-xs text-textMuted mb-3">{(Math.random() * 10 + 2).toFixed(1)} MB</p>
                    <div className="flex items-center gap-2 text-xs text-textMuted">
                        <Box size={12} />
                        <span className="capitalize">{asset.category}</span>
                    </div>
                </div>
             </div>
           ))}
           
           {/* Add Dummy Placeholders to fill grid if needed */}
           {[1, 2].map(i => (
               <div key={`placeholder-${i}`} className="border-2 border-dashed border-surfaceHighlight rounded-xl flex flex-col items-center justify-center text-textMuted hover:text-textMain hover:border-primary/30 transition-colors min-h-[250px] cursor-pointer">
                   <UploadCloud size={32} className="mb-2 opacity-50" />
                   <span className="text-sm font-medium">Drop GLB/GLTF here</span>
                   <span className="text-xs opacity-50 mt-1">Max 50MB</span>
               </div>
           ))}
        </div>
      </div>
    </Layout>
  );
};

export default Assets;
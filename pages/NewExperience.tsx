import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { UploadCloud, ArrowLeft, Box, Check, Link as LinkIcon, Sparkles } from 'lucide-react';
import { ThreeViewer } from '../components/ThreeViewer';
import { addProject, TEMPLATES } from '../data/mockData';
import { Project } from '../types';

const NewExperience: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'custom' as any,
    modelUrl: '',
    templateIndex: -1
  });

  const handleTemplateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value);
    setFormData(prev => {
      if (idx === -1) {
        return { ...prev, templateIndex: -1, modelUrl: '' };
      }
      const t = TEMPLATES[idx];
      return {
        ...prev,
        templateIndex: idx,
        name: prev.name || t.label, // Only fill if empty
        description: prev.description || t.description,
        category: t.category,
        modelUrl: t.url
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProject: Project = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      status: 'active',
      category: formData.category,
      isPrebuilt: false,
      views: 0,
      interactions: 0,
      modelUrl: formData.modelUrl || TEMPLATES[0].url,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633419461186-7d40a2e50594?auto=format&fit=crop&q=80&w=800',
      createdAt: new Date().toISOString(),
      settings: { scale: 1, autoRotate: true, pinchToZoom: true }
    };

    addProject(newProject);
    setIsLoading(false);
    navigate(`/project/${newProject.id}`);
  };

  return (
    <Layout>
      <div className="h-full flex flex-col md:flex-row">
        
        {/* Left: Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-10 border-r border-surfaceHighlight bg-surface overflow-y-auto">
          <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-textMuted hover:text-textMain mb-4 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-textMain mb-2">New Experience</h1>
            <p className="text-textMuted">Upload your 3D assets or choose from our Khronos-validated templates.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Template Selector */}
            <div className="p-4 rounded-xl bg-surfaceHighlight/20 border border-surfaceHighlight">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <label className="text-sm font-semibold text-textMain">Start with a Template</label>
              </div>
              <select 
                value={formData.templateIndex}
                onChange={handleTemplateSelect}
                className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-2.5 text-textMain focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value={-1}>-- Select a High-Quality Model --</option>
                {TEMPLATES.map((t, idx) => (
                  <option key={idx} value={idx}>{t.label} ({t.category})</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textMain mb-1.5">Project Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g., Summer Collection Chair"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-2.5 text-textMain focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textMain mb-1.5">Description</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Briefly describe your product..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-2.5 text-textMain focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textMain mb-1.5">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                  className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-2.5 text-textMain focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  <option value="custom">Custom</option>
                  <option value="food">Food & Dining</option>
                  <option value="decoration">Home Decor</option>
                  <option value="real-estate">Real Estate / Staging</option>
                  <option value="fashion">Fashion</option>
                  <option value="automotive">Automotive</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-surfaceHighlight">
               <h3 className="text-sm font-medium text-textMain mb-3">3D Asset Source</h3>
               
               {/* Model URL Input */}
               <div className="mb-4">
                 <input 
                    type="text" 
                    placeholder="Enter .GLB/.GLTF URL..." 
                    value={formData.modelUrl}
                    onChange={e => setFormData({...formData, modelUrl: e.target.value})}
                    className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-2.5 text-xs font-mono text-textMuted focus:ring-2 focus:ring-primary outline-none"
                  />
               </div>

               <div className="grid grid-cols-2 gap-3 mb-4">
                 <button type="button" className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary bg-primary/10 text-primary transition-colors">
                    <UploadCloud size={24} className="mb-2" />
                    <span className="text-sm font-medium">Upload File</span>
                 </button>
                 <button type="button" className="flex flex-col items-center justify-center p-4 rounded-xl border border-surfaceHighlight bg-background text-textMuted hover:border-gray-600 hover:text-textMain transition-colors">
                    <LinkIcon size={24} className="mb-2" />
                    <span className="text-sm font-medium">Import from URL</span>
                 </button>
               </div>
               
               {/* Quick Tips */}
               <div className="mt-4 p-3 bg-surfaceHighlight/30 rounded-lg border border-surfaceHighlight">
                  <div className="flex items-center gap-2 text-xs text-textMuted mb-1">
                    <Check size={12} className="text-green-500" />
                    <span>Use .GLB format for single-file efficiency.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-textMuted">
                    <Check size={12} className="text-green-500" />
                    <span>Supported: Khronos CDN, Unsplash, Sketchfab.</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
               <Link to="/dashboard" className="flex-1">
                 <Button type="button" variant="secondary" className="w-full">Cancel</Button>
               </Link>
               <Button type="submit" className="flex-1" isLoading={isLoading}>Create Experience</Button>
            </div>

          </form>
        </div>

        {/* Right: Preview */}
        <div className="hidden md:block w-1/2 lg:w-3/5 bg-black/40 relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black/0 to-black/0" />
           
           <div className="h-full w-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-4 z-10">
                <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider">Live Preview</h3>
                <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs text-textMain">
                   Interactive 3D
                </div>
              </div>

              <div className="flex-1 rounded-2xl overflow-hidden border border-surfaceHighlight bg-surface relative shadow-2xl">
                {formData.modelUrl ? (
                   <ThreeViewer modelUrl={formData.modelUrl} autoRotate scale={1} />
                ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-textMuted">
                      <Box size={48} className="mb-4 opacity-20" />
                      <p>Select a template or enter a URL to preview</p>
                   </div>
                )}
              </div>
           </div>
        </div>

      </div>
    </Layout>
  );
};

export default NewExperience;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ChevronLeft, Share2, Download, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ThreeViewer } from '../components/ThreeViewer';
import { generateCampaignStrategy } from '../services/gemini';
import { CampaignIdea, Project } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { getProject } from '../data/mockData';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  
  // AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignIdea, setCampaignIdea] = useState<CampaignIdea | null>(null);

  useEffect(() => {
    if (id) {
      setProject(getProject(id));
    }
  }, [id]);

  const handleGenerateAI = async () => {
    if (!project) return;
    setIsGenerating(true);
    const idea = await generateCampaignStrategy(project.name, project.description);
    setCampaignIdea(idea);
    setIsGenerating(false);
  };

  if (!project) return <div className="h-screen flex items-center justify-center text-textMuted">Loading Project...</div>;

  const experienceUrl = `${window.location.origin}/#/ar/${project.id}`;

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-surface border-b border-surfaceHighlight px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-surfaceHighlight rounded-lg text-textMuted hover:text-textMain transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-textMain">{project.name}</h1>
              <div className="flex items-center gap-2 text-xs text-textMuted">
                <span className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                Last edited {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/ar/${project.id}`} target="_blank">
               <Button variant="ghost" leftIcon={<Smartphone size={16}/>}>Test AR</Button>
            </Link>
            <Button leftIcon={<Share2 size={16} />}>Share</Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
          
          {/* Main Preview Area */}
          <div className="flex-1 bg-black/50 p-6 flex flex-col relative min-h-[400px]">
             <div className="flex-1 rounded-2xl overflow-hidden border border-surfaceHighlight bg-surface relative">
                <ThreeViewer modelUrl={project.modelUrl} autoRotate={!campaignIdea} />
             </div>
          </div>

          {/* Sidebar Properties */}
          <div className="w-full lg:w-96 bg-surface border-t lg:border-t-0 lg:border-l border-surfaceHighlight overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-8">
              
              {/* QR Code Section */}
              <div className="bg-surfaceHighlight/30 rounded-xl p-6 border border-surfaceHighlight text-center">
                <h3 className="text-sm font-medium text-textMuted mb-4 uppercase tracking-wider">WebAR Access Point</h3>
                <div className="bg-white p-3 rounded-lg w-fit mx-auto mb-4">
                  <QRCodeSVG value={experienceUrl} size={140} />
                </div>
                <p className="text-xs text-textMuted mb-3 font-mono break-all">{experienceUrl}</p>
                <Button variant="secondary" size="sm" className="w-full" leftIcon={<Download size={14} />}>
                  Download SVG
                </Button>
              </div>

              {/* AI Campaign Generator */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-semibold text-textMain">AI Campaign Strategy</h3>
                   <Sparkles className="w-4 h-4 text-accent" />
                </div>
                
                {!campaignIdea ? (
                  <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-5 border border-indigo-500/20">
                    <p className="text-sm text-textMuted mb-4">Generate a viral marketing strategy for <strong>{project.name}</strong> using Gemini 2.0.</p>
                    <Button 
                      onClick={handleGenerateAI} 
                      isLoading={isGenerating} 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 border-none text-white hover:from-indigo-500 hover:to-purple-500"
                    >
                      Generate Strategy
                    </Button>
                  </div>
                ) : (
                  <div className="bg-surfaceHighlight rounded-xl p-5 space-y-4 border border-surfaceHighlight animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">Title</span>
                      <p className="text-textMain font-medium">{campaignIdea.title}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">Strategy</span>
                      <p className="text-sm text-textMuted leading-relaxed mt-1">{campaignIdea.strategy}</p>
                    </div>
                     <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">Recommended CTA</span>
                      <div className="mt-2 inline-block px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-bold border border-primary/20">
                        {campaignIdea.callToAction}
                      </div>
                    </div>
                    <Button onClick={() => setCampaignIdea(null)} variant="ghost" size="sm" className="w-full">
                      Regenerate
                    </Button>
                  </div>
                )}
              </div>

              {/* Stats Mini */}
              <div>
                <h3 className="font-semibold text-textMain mb-4">Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surfaceHighlight/50 p-3 rounded-lg">
                    <span className="text-xs text-textMuted block">Views</span>
                    <span className="text-lg font-bold text-textMain">{project.views.toLocaleString()}</span>
                  </div>
                  <div className="bg-surfaceHighlight/50 p-3 rounded-lg">
                    <span className="text-xs text-textMuted block">Interactions</span>
                    <span className="text-lg font-bold text-textMain">{project.interactions?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
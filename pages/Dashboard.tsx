import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Plus, Search, MoreVertical, Eye, MousePointer2, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PREBUILT_EXPERIENCES } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'food' | 'decoration' | 'custom'>('all');

  const filteredProjects = PREBUILT_EXPERIENCES.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-textMain mb-1">Dashboard</h1>
            <p className="text-textMuted">Manage your AR experiences and track performance.</p>
          </div>
          <Button leftIcon={<Plus size={18} />}>New Experience</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Views" value="21,672" trend="+12%" />
          <StatCard label="Total Interactions" value="14,203" trend="+8%" />
          <StatCard label="Avg. Dwell Time" value="2m 18s" trend="+5%" />
        </div>

        {/* Projects List */}
        <div className="bg-surface rounded-xl border border-surfaceHighlight overflow-hidden">
          <div className="p-4 border-b border-surfaceHighlight flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto no-scrollbar">
               <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-textMain'}`}
               >
                 All Projects
               </button>
               <button 
                  onClick={() => setFilter('food')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filter === 'food' ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-textMain'}`}
               >
                 Food
               </button>
               <button 
                  onClick={() => setFilter('decoration')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filter === 'decoration' ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-textMain'}`}
               >
                 Decoration
               </button>
               <button 
                  onClick={() => setFilter('custom')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filter === 'custom' ? 'bg-primary/20 text-primary' : 'text-textMuted hover:text-textMain'}`}
               >
                 Custom
               </button>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-background border border-surfaceHighlight rounded-lg pl-9 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-textMain placeholder-gray-600 w-full sm:w-64"
              />
            </div>
          </div>
          
          <div className="divide-y divide-surfaceHighlight">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-4 hover:bg-surfaceHighlight/50 transition-colors flex items-center gap-4 group">
                <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 relative">
                  <img src={project.thumbnailUrl} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link to={`/project/${project.id}`} className="font-medium text-textMain hover:text-primary transition-colors truncate">
                      {project.name}
                    </Link>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border bg-green-500/10 text-green-500 border-green-500/20`}>
                      {project.status}
                    </span>
                    {project.category && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border bg-blue-500/10 text-blue-500 border-blue-500/20">
                            {project.category}
                        </span>
                    )}
                  </div>
                  <p className="text-sm text-textMuted truncate">{project.description}</p>
                </div>

                <div className="flex items-center gap-6 mr-4 text-sm text-textMuted hidden lg:flex">
                  <div className="flex items-center gap-1.5" title="Views">
                    <Eye size={14} />
                    <span>{project.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Interactions">
                    <MousePointer2 size={14} />
                    <span>{project.interactions?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/project/${project.id}`}>
                    <Button variant="secondary" size="sm">Manage</Button>
                  </Link>
                  <button className="p-2 text-textMuted hover:text-textMain rounded hover:bg-surfaceHighlight">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
                <div className="p-8 text-center text-textMuted">
                    No projects found in this category.
                </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
  <div className="bg-surface p-6 rounded-xl border border-surfaceHighlight">
    <p className="text-textMuted text-sm font-medium mb-1">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-bold text-textMain">{value}</h3>
      <span className="text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded">{trend}</span>
    </div>
  </div>
);

export default Dashboard;
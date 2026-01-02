import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Zap, Smartphone, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-textMain">
      {/* Navbar */}
      <nav className="border-b border-surfaceHighlight bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
              <Box className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Lumina</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/ar/demo" className="text-sm text-textMuted hover:text-textMain hidden sm:block">Try Demo</Link>
            <Link to="/dashboard">
              <Button size="sm">Launch Console</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surfaceHighlight border border-white/5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium text-textMuted uppercase tracking-wider">WebAR Technology v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Immersive AR.<br />
            <span className="text-primary">No App Required.</span>
          </h1>
          
          <p className="text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
            Create high-performance WebAR experiences that launch directly from QR codes. 
            Deploy instant product visualizations, marketing campaigns, and interactive 3D content.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                Start Building Free
              </Button>
            </Link>
            <Link to="/ar/demo">
              <Button variant="secondary" size="lg">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface/30 border-y border-surfaceHighlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Lightning Fast"
              description="Optimized for mobile browsers with <2s load times using GLB compression and edge caching."
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6 text-primary" />}
              title="Universal Compatibility"
              description="Works on iOS and Android instantly via Chrome, Safari, or native camera QR scanning."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-accent" />}
              title="Web-Native"
              description="No app store approvals. Just publish your URL or QR code and go live instantly."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-surfaceHighlight bg-background text-center text-textMuted text-sm">
        <p>© 2024 Lumina WebAR. Built for the future of the web.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 rounded-2xl bg-surface border border-surfaceHighlight hover:border-primary/30 transition-colors">
    <div className="w-12 h-12 rounded-lg bg-surfaceHighlight flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-textMain mb-2">{title}</h3>
    <p className="text-textMuted leading-relaxed">{description}</p>
  </div>
);

export default Landing;

import React from 'react';
import { Layout } from '../components/Layout';
import { Save, User, CreditCard, Key, Bell, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-textMain mb-1">Settings</h1>
            <p className="text-textMuted">Manage your workspace preferences.</p>
          </div>
          <Button leftIcon={<Save size={18} />}>Save Changes</Button>
        </div>

        <div className="space-y-8">
            {/* API Keys Section */}
            <section className="bg-surface rounded-xl border border-surfaceHighlight p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent">
                        <Key size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-textMain">API Configuration</h2>
                        <p className="text-sm text-textMuted">Manage your API keys for Gemini AI and Analytics.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-textMain mb-1.5">Gemini API Key</label>
                        <div className="flex gap-2">
                            <input 
                                type="password" 
                                value="AIzaSy...Obsf" 
                                readOnly
                                className="flex-1 bg-background border border-surfaceHighlight rounded-lg px-3 py-2 text-sm text-textMuted font-mono"
                            />
                            <Button variant="secondary">Reveal</Button>
                        </div>
                        <p className="text-xs text-textMuted mt-1.5">Used for generating marketing copy and campaigns.</p>
                    </div>
                </div>
            </section>

             {/* Profile Section */}
             <section className="bg-surface rounded-xl border border-surfaceHighlight p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <User size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-textMain">Profile</h2>
                        <p className="text-sm text-textMuted">Update your personal information.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-textMain mb-1.5">Full Name</label>
                        <input type="text" defaultValue="Demo User" className="w-full bg-background border border-surfaceHighlight rounded-lg px-3 py-2 text-textMain focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-textMain mb-1.5">Email Address</label>
                        <input type="email" defaultValue="demo@lumina.ar" className="w-full bg-background border border-surfaceHighlight rounded-lg px-3 py-2 text-textMain focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                </div>
            </section>

            {/* Billing Section */}
             <section className="bg-surface rounded-xl border border-surfaceHighlight p-6 opacity-75">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-textMain">Plan & Billing</h2>
                        <p className="text-sm text-textMuted">You are currently on the <span className="text-white font-medium">Pro Plan</span>.</p>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-surfaceHighlight/30 p-4 rounded-lg border border-surfaceHighlight">
                    <div>
                        <p className="text-sm font-medium text-textMain">Next Invoice: $29.00</p>
                        <p className="text-xs text-textMuted">Due on August 1, 2024</p>
                    </div>
                    <Button variant="secondary" size="sm">Manage Subscription</Button>
                </div>
            </section>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
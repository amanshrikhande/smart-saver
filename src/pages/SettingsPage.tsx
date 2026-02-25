import { useState } from 'react';
import { User, Bell, Moon, Sun, Shield, Download, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [renewalDaysBefore, setRenewalDaysBefore] = useState(3);
  const [name, setName] = useState('Rahul Gupta');
  const [email, setEmail] = useState('demo@subsave.in');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-primary">
            <span className="text-white text-2xl font-bold">R</span>
          </div>
          <Button variant="outline" size="sm">Change photo</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Monthly Budget (₹)</Label>
            <Input type="number" defaultValue={10000} placeholder="e.g. 10000" />
          </div>
          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Input value="Indian Rupee (₹ INR)" disabled />
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2 shadow-primary">
          {saved ? '✓ Saved!' : <><Save className="w-4 h-4" />Save Changes</>}
        </Button>
      </section>

      {/* Notifications */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email renewal alerts', desc: 'Get notified before subscriptions renew', value: emailAlerts, onChange: setEmailAlerts },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
              <Switch checked={item.value} onCheckedChange={item.onChange} />
            </div>
          ))}
          <div>
            <Label className="text-sm">Alert days before renewal</Label>
            <div className="flex gap-2 mt-2">
              {[1, 3, 5, 7].map(d => (
                <button
                  key={d}
                  onClick={() => setRenewalDaysBefore(d)}
                  className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                    renewalDaysBefore === d ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Sun className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Dark Mode</div>
            <div className="text-xs text-muted-foreground">Switch to dark theme</div>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </section>

      {/* Data */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Data & Privacy</h2>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Download className="w-4 h-4" />Export my data (CSV)
          </Button>
          <p className="text-xs text-muted-foreground">All your data is stored locally in your browser. We never upload or sell your subscription data.</p>
        </div>
        <div className="pt-4 border-t border-border">
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />Delete Account
          </Button>
          <p className="text-xs text-muted-foreground mt-2">This will permanently remove all your subscription data.</p>
        </div>
      </section>
    </div>
  );
}

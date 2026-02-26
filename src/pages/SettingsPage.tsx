import { useState } from 'react';
import { User, Bell, Moon, Sun, Shield, Download, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
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
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <User className="w-5 h-5 text-primary flex-shrink-0" />
          <h2 className="font-semibold">Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-primary">
            <span className="text-white text-xl sm:text-2xl font-bold">R</span>
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
        <Button onClick={handleSave} className="gap-2 shadow-primary w-full sm:w-auto min-h-[44px]">
          {saved ? '✓ Saved!' : <><Save className="w-4 h-4" />Save Changes</>}
        </Button>
      </section>

      {/* Notifications */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Bell className="w-5 h-5 text-primary flex-shrink-0" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">Email renewal alerts</div>
              <div className="text-xs text-muted-foreground">Get notified before subscriptions renew</div>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} className="flex-shrink-0" />
          </div>
          <div>
            <Label className="text-sm">Alert days before renewal</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[1, 3, 5, 7].map(d => (
                <button
                  key={d}
                  onClick={() => setRenewalDaysBefore(d)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-all border min-w-[52px] min-h-[44px]',
                    renewalDaysBefore === d
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
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
          {isDark ? <Moon className="w-5 h-5 text-primary flex-shrink-0" /> : <Sun className="w-5 h-5 text-primary flex-shrink-0" />}
          <h2 className="font-semibold">Appearance</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Dark Mode</div>
            <div className="text-xs text-muted-foreground">Switch to dark theme — persists after reload</div>
          </div>
          <Switch checked={isDark} onCheckedChange={toggleTheme} className="flex-shrink-0" />
        </div>
      </section>

      {/* Data */}
      <section className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Shield className="w-5 h-5 text-primary flex-shrink-0" />
          <h2 className="font-semibold">Data & Privacy</h2>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="gap-2 w-full sm:w-auto min-h-[44px]">
            <Download className="w-4 h-4" />Export my data (CSV)
          </Button>
          <p className="text-xs text-muted-foreground">All your data is stored locally in your browser. We never upload or sell your subscription data.</p>
        </div>
        <div className="pt-4 border-t border-border">
          <Button variant="destructive" size="sm" className="gap-2 min-h-[44px]">
            <Trash2 className="w-4 h-4" />Delete Account
          </Button>
          <p className="text-xs text-muted-foreground mt-2">This will permanently remove all your subscription data.</p>
        </div>
      </section>
    </div>
  );
}

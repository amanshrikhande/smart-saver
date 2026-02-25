import { Mail, MessageCircle, Twitter, Github, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold">SubSave</span>
        </Link>
        <Link to="/dashboard"><Button size="sm">Go to App</Button></Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="stat-card">
            <h2 className="font-semibold text-lg mb-6">Send a Message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input placeholder="Rahul" />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input placeholder="Gupta" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-1.5">
                <Label>Message</Label>
                <Textarea rows={5} placeholder="Tell us more..." />
              </div>
              <Button className="w-full shadow-primary">Send Message</Button>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="stat-card">
              <h2 className="font-semibold mb-5">Contact Information</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@subsave.in' },
                  { icon: Twitter, label: 'Twitter', value: '@SubSaveIN' },
                  { icon: MapPin, label: 'Location', value: 'Bengaluru, India 🇮🇳' },
                  { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stat-card">
              <h2 className="font-semibold mb-3">FAQ</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Is my data safe?', 'All data is stored locally in your browser. Nothing leaves your device.'],
                  ['Is there a free plan?', 'Yes! Track up to 5 subscriptions for free, forever.'],
                  ['Can I export my data?', 'Yes, export as CSV from Settings > Data & Privacy.'],
                ].map(([q, a]) => (
                  <div key={q} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="font-medium mb-1">{q}</div>
                    <div className="text-muted-foreground">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

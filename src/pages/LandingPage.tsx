import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bell, Calendar, CheckCircle, CreditCard, Lock, Shield, Star, TrendingDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatINR } from '@/data/subscriptions';
import type { LucideIcon } from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Spending Insights',
    desc: 'Visual breakdowns of where your ₹ go each month across OTT, SaaS, Cloud, and more.',
    color: 'text-primary',
    bg: 'bg-accent',
  },
  {
    icon: Bell,
    title: 'Smart Renewal Alerts',
    desc: "Never miss a renewal. Get alerted before you're charged so you can decide to keep or cancel.",
    color: 'text-warning',
    bg: 'bg-warning-light',
  },
  {
    icon: TrendingDown,
    title: 'Savings Simulation',
    desc: 'See in real-time how adding or removing a subscription affects your monthly and yearly budget.',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    icon: Calendar,
    title: 'Renewal Calendar',
    desc: 'A visual calendar showing every upcoming billing date color-coded by status and category.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    desc: 'All data stored locally. We never sell or share your subscription information with anyone.',
    color: 'text-success',
    bg: 'bg-success-light',
  },
  {
    icon: Zap,
    title: 'AI Optimization (Soon)',
    desc: 'Intelligent recommendations to eliminate redundant subscriptions and lower your monthly bill.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

const STEPS = [
  { step: '01', title: 'Add Subscriptions', desc: 'Enter your services, costs, and billing cycles in seconds.' },
  { step: '02', title: 'Track Renewals', desc: 'Calendar view keeps all renewal dates visible and organized.' },
  { step: '03', title: 'Optimize Spending', desc: 'Identify waste, simulate changes, and save money every month.' },
];

const PRICING = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    features: ['Up to 5 subscriptions', 'Basic dashboard', 'Renewal alerts', 'Monthly summary'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 99,
    period: 'month',
    features: ['Unlimited subscriptions', 'Advanced analytics', 'Savings simulation', 'Export reports', 'Priority support'],
    cta: 'Start Pro – ₹99/mo',
    highlight: true,
  },
  {
    name: 'Business',
    price: 299,
    period: 'month',
    features: ['Everything in Pro', 'Team workspace', 'Shared dashboards', 'API access', 'Custom categories'],
    cta: 'Get Business',
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: 'Arjun Sharma', role: 'Startup Founder, Bengaluru', text: 'Saved ₹2,400/month by discovering I had 3 overlapping OTT subscriptions. Worth every rupee.', rating: 5 },
  { name: 'Priya Mehta', role: 'Freelance Designer, Mumbai', text: 'The renewal calendar is a lifesaver. No more surprise charges at month end.', rating: 5 },
  { name: 'Rohit Verma', role: 'Software Engineer, Hyderabad', text: 'Finally a subscription tracker built for India. INR support and UPI tracking is chef\'s kiss.', rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center shadow-primary">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">SubSave</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <Link to="/founder" className="hover:text-foreground transition-colors">Founder</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/login">
              <Button variant="outline" size="sm" className="font-medium hidden sm:inline-flex">Log in</Button>
            </Link>
            <Link to="/login" className="sm:hidden">
              <Button variant="ghost" size="sm" className="font-medium text-foreground">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="font-medium shadow-primary">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-subtle pointer-events-none" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            India's smartest subscription tracker
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Track. Optimize.{' '}
            <span className="text-primary">Save on</span>{' '}
            Subscriptions.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            See exactly where your ₹ go every month. Manage all your OTT, SaaS, Cloud and utility subscriptions in one beautiful dashboard — built for India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-primary">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8">
                View Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '10,000+', label: 'Active Users' },
              { value: '₹2.4 Cr+', label: 'Saved by users' },
              { value: '50,000+', label: 'Subs Tracked' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="rounded-3xl border border-border shadow-elevated bg-card overflow-hidden">
            {/* Window bar */}
            <div className="h-10 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <div className="flex-1 flex justify-center">
                <div className="w-48 h-5 rounded-full bg-border" />
              </div>
            </div>
            {/* Mock content */}
            <div className="p-6 bg-secondary/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Monthly Spend', value: '₹7,483', color: 'bg-primary/10 text-primary' },
                  { label: 'Yearly Projection', value: '₹89,796', color: 'bg-warning/10 text-warning' },
                  { label: 'Active Subs', value: '12', color: 'bg-success/10 text-success' },
                  { label: 'Upcoming (7d)', value: '3', color: 'bg-blue-500/10 text-blue-500' },
                ].map(card => (
                  <div key={card.label} className="stat-card">
                    <div className={`text-xs font-medium mb-1 ${card.color.split(' ')[1]}`}>{card.label}</div>
                    <div className="text-2xl font-bold text-foreground">{card.value}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Netflix 🎬', 'AWS ☁️', 'Spotify 🎵', 'Notion 📝', 'GitHub Copilot 🤖', 'Figma 🎨'].map(name => (
                  <div key={name} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Everything you need to manage subscriptions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">One platform for all your recurring payments — organized, visual, and optimized for saving money.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="stat-card hover:shadow-elevated transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Up and running in 2 minutes</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to full subscription clarity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.step} className="text-center relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-border" />
                )}
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-primary">
                  <span className="text-white font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Trusted by thousands of Indians</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="stat-card">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-foreground">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Simple, honest pricing in ₹ INR</h2>
            <p className="text-muted-foreground text-lg">No hidden charges. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map(p => (
              <div key={p.name} className={`rounded-2xl p-8 border ${p.highlight ? 'gradient-hero text-white border-transparent shadow-primary' : 'bg-card border-border shadow-card'}`}>
                <div className={`text-sm font-semibold mb-1 ${p.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>{p.name}</div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold">{p.price === 0 ? 'Free' : formatINR(p.price)}</span>
                  {p.price > 0 && <span className={`text-sm mb-1 ${p.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>/{p.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${p.highlight ? 'text-white' : 'text-success'}`} />
                      <span className={p.highlight ? 'text-white/90' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button
                    className={`w-full ${p.highlight ? 'bg-white text-primary hover:bg-white/90' : ''}`}
                    variant={p.highlight ? 'secondary' : 'default'}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Lock, text: 'Data stored locally on your device' },
              { icon: Shield, text: 'Zero data selling, ever' },
              { icon: CreditCard, text: 'No credit card required to start' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Stop overpaying for subscriptions today</h2>
          <p className="text-muted-foreground text-lg mb-8">Join 10,000+ Indians who've already taken control of their recurring expenses.</p>
          <Link to="/register">
            <Button size="lg" className="gap-2 text-base px-10 shadow-primary">
              Get Started Free – It's 100% Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="font-bold">SubSave</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">India's most intelligent subscription management platform.</p>
            </div>
            {[
              { heading: 'Product', links: [['Features', '#features'], ['Pricing', '#pricing'], ['How it Works', '#how-it-works']] },
              { heading: 'Company', links: [['Founder', '/founder'], ['Contact', '/contact'], ['Services', '/services']] },
              { heading: 'Legal', links: [['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy']] },
            ].map(col => (
              <div key={col.heading}>
                <div className="font-semibold text-sm mb-4">{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>© 2026 SubSave. Made with ❤️ in India.</span>
            <span>All prices in Indian Rupees (₹ INR)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

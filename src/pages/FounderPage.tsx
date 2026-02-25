import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold">SubSave</span>
        </Link>
        <Link to="/dashboard"><Button size="sm">Go to App</Button></Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-primary">
            <span className="text-white text-4xl font-bold">A</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Aarav Mehta</h1>
          <p className="text-xl text-primary font-medium mb-2">Founder & CEO, SubSave</p>
          <p className="text-muted-foreground">Bengaluru, India 🇮🇳</p>
        </div>

        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <div className="stat-card">
            <h2 className="font-bold text-foreground text-xl mb-4">The Origin Story</h2>
            <p>
              In 2024, I was paying for 14 different subscriptions without realizing it. Netflix, Hotstar, Spotify,
              three different SaaS tools, two cloud providers, and a bunch of others I'd forgotten about.
              My bank statement looked like a graveyard of impulse signups.
            </p>
            <p className="mt-3">
              I searched for a subscription tracker that worked for India — one that understood INR, UPI,
              and the mix of OTT + SaaS + Cloud that Indian power users deal with daily. Nothing fit.
              So I built SubSave.
            </p>
          </div>

          <div className="stat-card">
            <h2 className="font-bold text-foreground text-xl mb-4">Our Mission</h2>
            <p>
              SubSave's mission is simple: <strong>help Indians spend smarter on digital subscriptions</strong>.
              The average urban Indian now spends ₹3,000–₹8,000/month on recurring digital services.
              That's ₹36,000–₹96,000 per year. Most of it goes untracked.
            </p>
            <p className="mt-3">
              We're building the operating system for your digital wallet — starting with subscriptions,
              and expanding to all recurring expenses.
            </p>
          </div>

          <div className="stat-card">
            <h2 className="font-bold text-foreground text-xl mb-4">My Background</h2>
            <div className="space-y-3">
              {[
                ['2020–2022', 'Software Engineer at Razorpay, building payments infrastructure'],
                ['2022–2023', 'Product Manager at a B2B SaaS startup, managing growth metrics'],
                ['2023–2024', 'Independent consultant for fintech startups across India'],
                ['2024–present', 'Founder of SubSave'],
              ].map(([year, role]) => (
                <div key={year} className="flex gap-4">
                  <span className="text-xs font-mono text-primary bg-accent px-2 py-1 rounded h-fit flex-shrink-0">{year}</span>
                  <span className="text-sm">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">Want to chat? I respond to every message personally.</p>
          <Link to="/contact">
            <Button className="gap-2 shadow-primary">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

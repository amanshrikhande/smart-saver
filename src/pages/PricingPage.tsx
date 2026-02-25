import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { formatINR } from '@/data/subscriptions';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    features: ['Up to 5 subscriptions', 'Basic dashboard', 'Renewal alerts', 'Monthly summary', 'Local storage only'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    monthly: 99,
    yearly: 799,
    features: ['Unlimited subscriptions', 'Advanced analytics', 'Savings simulation', 'Export CSV reports', 'Priority email support', 'Cloud sync (coming soon)'],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Business',
    monthly: 299,
    yearly: 2499,
    features: ['Everything in Pro', 'Team workspace (5 seats)', 'Shared dashboards', 'API access', 'Custom categories', 'Dedicated support'],
    cta: 'Get Business',
    highlight: false,
  },
];

const COUPONS: Record<string, number> = {
  'SAVE20': 20,
  'INDIA50': 50,
  'FIRST10': 10,
};

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const applyCoupon = () => {
    const pct = COUPONS[coupon.toUpperCase()];
    if (pct) {
      setDiscount(pct);
      setCouponMsg(`🎉 ${pct}% discount applied!`);
    } else {
      setDiscount(0);
      setCouponMsg('Invalid coupon code.');
    }
  };

  const getPrice = (plan: typeof PLANS[0]) => {
    const base = billing === 'monthly' ? plan.monthly : plan.yearly / 12;
    return Math.round(base * (1 - discount / 100));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold">SubSave</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link to="/register"><Button size="sm" className="shadow-primary">Get Started</Button></Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Simple, honest pricing in ₹ INR</h1>
          <p className="text-muted-foreground text-lg mb-8">No hidden fees. Cancel anytime. Prices in Indian Rupees.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 bg-secondary rounded-xl p-1">
            {(['monthly', 'yearly'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize', billing === b ? 'bg-card shadow-card text-foreground' : 'text-muted-foreground')}
              >
                {b}
                {b === 'yearly' && <span className="ml-2 text-xs text-success font-semibold">Save 33%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Coupon */}
        <div className="flex gap-2 max-w-sm mx-auto mb-10">
          <Input placeholder="Coupon code (try SAVE20)" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <Button variant="outline" onClick={applyCoupon}>Apply</Button>
        </div>
        {couponMsg && (
          <p className={cn('text-center text-sm mb-8 font-medium', discount > 0 ? 'text-success' : 'text-destructive')}>
            {couponMsg}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const price = getPrice(plan);
            return (
              <div key={plan.name} className={cn('rounded-2xl p-8 border transition-all duration-200', plan.highlight ? 'gradient-hero text-white border-transparent shadow-primary scale-[1.02]' : 'bg-card border-border shadow-card hover:shadow-elevated')}>
                <div className={cn('text-sm font-semibold mb-1', plan.highlight ? 'text-white/80' : 'text-muted-foreground')}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-6">
                  {price === 0 ? (
                    <span className="text-4xl font-extrabold">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold">{formatINR(price)}</span>
                      <span className={cn('text-sm mb-1', plan.highlight ? 'text-white/70' : 'text-muted-foreground')}>/mo</span>
                    </>
                  )}
                </div>
                {billing === 'yearly' && plan.yearly > 0 && (
                  <div className={cn('text-xs mb-4', plan.highlight ? 'text-white/70' : 'text-muted-foreground')}>
                    Billed {formatINR(Math.round(plan.yearly * (1 - discount / 100)))} yearly
                  </div>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check className={cn('w-4 h-4 flex-shrink-0', plan.highlight ? 'text-white' : 'text-success')} />
                      <span className={plan.highlight ? 'text-white/90' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className={cn('w-full', plan.highlight ? 'bg-white text-primary hover:bg-white/90' : '')} variant={plan.highlight ? 'secondary' : 'default'}>
                    {plan.highlight && <Zap className="w-4 h-4 mr-1" />}
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          All prices in Indian Rupees (₹ INR) · Includes 18% GST · 7-day refund guarantee
        </div>
      </div>
    </div>
  );
}

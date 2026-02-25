import { useState } from 'react';
import { X, TrendingUp, AlertTriangle, Plus } from 'lucide-react';
import { Subscription, Category, BillingCycle, formatINR, calculateTotalMonthly, CATEGORY_COLORS } from '@/data/subscriptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = ['OTT', 'Music', 'SaaS', 'Cloud', 'Learning', 'Gaming', 'Utilities', 'News', 'Fitness'];
const BILLING_CYCLES: BillingCycle[] = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
const PAYMENT_METHODS = ['UPI (GPay)', 'UPI (PhonePe)', 'UPI (Paytm)', 'HDFC Credit Card', 'ICICI Credit Card', 'SBI Credit Card', 'SBI Debit Card', 'Net Banking'];

const EMOJIS: Record<Category, string> = {
  OTT: '🎬', Music: '🎵', SaaS: '💻', Cloud: '☁️',
  Learning: '🎓', Gaming: '🎮', Utilities: '⚡', News: '📰', Fitness: '💪',
};

interface Props {
  onClose: () => void;
  onAdd: (sub: Subscription) => void;
  existingSubs: Subscription[];
}

export default function AddSubscriptionModal({ onClose, onAdd, existingSubs }: Props) {
  const [form, setForm] = useState({
    name: '',
    category: '' as Category,
    monthlyCost: '',
    billingCycle: 'Monthly' as BillingCycle,
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI (GPay)',
    notes: '',
  });
  const [step, setStep] = useState<'form' | 'simulate'>('form');

  const currentMonthly = calculateTotalMonthly(existingSubs.filter(s => s.status !== 'Cancelled'));
  const newCost = Number(form.monthlyCost) || 0;
  const effectiveCost = form.billingCycle === 'Monthly' ? newCost
    : form.billingCycle === 'Quarterly' ? newCost / 3
    : form.billingCycle === 'Half-Yearly' ? newCost / 6
    : newCost / 12;
  const newMonthly = currentMonthly + effectiveCost;
  const monthlyIncrease = effectiveCost;
  const yearlyIncrease = monthlyIncrease * 12;
  const isHighSpend = monthlyIncrease > 1000;
  const formFilled = form.name && form.category && form.monthlyCost;

  const handleSubmit = () => {
    const nextRenewal = new Date();
    if (form.billingCycle === 'Monthly') nextRenewal.setMonth(nextRenewal.getMonth() + 1);
    else if (form.billingCycle === 'Quarterly') nextRenewal.setMonth(nextRenewal.getMonth() + 3);
    else if (form.billingCycle === 'Half-Yearly') nextRenewal.setMonth(nextRenewal.getMonth() + 6);
    else nextRenewal.setFullYear(nextRenewal.getFullYear() + 1);

    const newSub: Subscription = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      monthlyCost: Number(form.monthlyCost),
      billingCycle: form.billingCycle,
      nextRenewal: nextRenewal.toISOString().split('T')[0],
      startDate: form.startDate,
      status: 'Active',
      color: CATEGORY_COLORS[form.category] || '#10B981',
      emoji: EMOJIS[form.category] || '📱',
      description: `${form.category} subscription`,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
    };
    onAdd(newSub);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 overflow-y-auto">
      <div className="bg-card rounded-3xl border border-border shadow-elevated w-full max-w-lg animate-scale-in my-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-bold">Add Subscription</h2>
            <p className="text-sm text-muted-foreground">{step === 'form' ? 'Enter subscription details' : 'Review impact on your budget'}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 'form' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Service Name</Label>
                  <Input placeholder="e.g. Netflix, AWS" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm({ ...form, category: v as Category })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => (
                        <SelectItem key={c} value={c}>{EMOJIS[c]} {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Cost (₹)</Label>
                  <Input type="number" placeholder="e.g. 649" value={form.monthlyCost}
                    onChange={e => setForm({ ...form, monthlyCost: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Billing Cycle</Label>
                  <Select value={form.billingCycle} onValueChange={v => setForm({ ...form, billingCycle: v as BillingCycle })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BILLING_CYCLES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input type="date" value={form.startDate}
                    onChange={e => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Payment Method</Label>
                  <Select value={form.paymentMethod} onValueChange={v => setForm({ ...form, paymentMethod: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                <Button
                  onClick={() => setStep('simulate')}
                  disabled={!formFilled}
                  className="flex-1 gap-2 shadow-primary"
                >
                  <TrendingUp className="w-4 h-4" />
                  Simulate Impact
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Simulation view */}
              <div className={cn('rounded-2xl p-5 border', isHighSpend ? 'bg-warning-light border-warning/30' : 'bg-accent border-primary/20')}>
                <div className={cn('text-sm font-semibold mb-4', isHighSpend ? 'text-warning' : 'text-primary')}>
                  {isHighSpend ? '⚠️ High spend alert' : '📊 Budget impact preview'}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Monthly spend before</div>
                    <div className="text-lg font-bold inr">{formatINR(currentMonthly)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Monthly spend after</div>
                    <div className={cn('text-lg font-bold inr', isHighSpend ? 'text-warning' : 'text-primary')}>
                      {formatINR(newMonthly)}
                    </div>
                  </div>
                </div>
                <div className={cn('mt-4 pt-4 border-t', isHighSpend ? 'border-warning/30' : 'border-primary/20')}>
                  <div className="text-sm font-medium mb-1">
                    Your monthly spend increases by{' '}
                    <span className={cn('font-bold', isHighSpend ? 'text-warning' : 'text-primary')}>
                      {formatINR(monthlyIncrease)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    This affects your yearly budget by <strong>{formatINR(yearlyIncrease)}</strong>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-secondary/40 rounded-2xl p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{form.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing</span>
                  <span className="font-medium">{formatINR(Number(form.monthlyCost))} / {form.billingCycle}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('form')} className="flex-1">← Adjust</Button>
                <Button onClick={handleSubmit} className="flex-1 gap-2 shadow-primary">
                  <Plus className="w-4 h-4" /> Confirm & Add
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

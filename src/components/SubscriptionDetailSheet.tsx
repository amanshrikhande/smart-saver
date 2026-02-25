import { X, ExternalLink, Calendar, CreditCard, TrendingUp, Tag, Trash2 } from 'lucide-react';
import { Subscription, formatINR } from '@/data/subscriptions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  sub: Subscription;
  onClose: () => void;
  onCancel: (sub: Subscription) => void;
}

export default function SubscriptionDetailSheet({ sub, onClose, onCancel }: Props) {
  const monthsActive = Math.max(1, Math.round(
    (new Date().getTime() - new Date(sub.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  ));
  const totalSpent = sub.monthlyCost * monthsActive;

  const history = Array.from({ length: Math.min(monthsActive, 6) }, (_, i) => {
    const d = new Date(sub.startDate);
    d.setMonth(d.getMonth() + monthsActive - 1 - i);
    return {
      date: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      amount: sub.monthlyCost,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-4 bg-black/40"
      onClick={onClose}>
      <div
        className="bg-card w-full sm:w-96 h-[85vh] sm:h-full sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl border border-border shadow-elevated overflow-y-auto animate-slide-in-right scrollbar-thin"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: sub.color + '20' }}>
              {sub.emoji}
            </div>
            <div>
              <h2 className="font-bold text-lg">{sub.name}</h2>
              <p className="text-sm text-muted-foreground">{sub.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status badge */}
          <span className={sub.status === 'Active' ? 'badge-status-active' : 'badge-status-warning'}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {sub.status}
          </span>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Monthly Cost', value: formatINR(sub.monthlyCost), icon: CreditCard, color: 'text-primary', bg: 'bg-accent' },
              { label: 'Total Spent', value: formatINR(totalSpent), icon: TrendingUp, color: 'text-warning', bg: 'bg-warning-light' },
              { label: 'Active Since', value: new Date(sub.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }), icon: Calendar, color: 'text-success', bg: 'bg-success-light' },
              { label: 'Next Renewal', value: new Date(sub.nextRenewal).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
            ].map(stat => (
              <div key={stat.label} className="bg-secondary/40 rounded-2xl p-4">
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center mb-2', stat.bg)}>
                  <stat.icon className={cn('w-4 h-4', stat.color)} />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="font-semibold text-sm inr">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Details</h3>
            {[
              { label: 'Billing Cycle', value: sub.billingCycle },
              { label: 'Payment Method', value: sub.paymentMethod },
              { label: 'Description', value: sub.description },
            ].map(d => (
              <div key={d.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium max-w-[60%] text-right">{d.value}</span>
              </div>
            ))}
          </div>

          {/* Payment history */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Recent Payments</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">{h.date}</span>
                  </div>
                  <span className="text-sm font-semibold inr">{formatINR(h.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {sub.website && (
              <a href={`https://${sub.website}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </Button>
              </a>
            )}
            <Button
              variant="destructive"
              onClick={() => { onCancel(sub); onClose(); }}
              className="flex-1 gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Cancel Sub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { initialSubscriptions, formatINR } from '@/data/subscriptions';

export default function PaymentsPage() {
  const subs = initialSubscriptions.filter(s => s.status !== 'Cancelled');
  
  // Generate mock payment history
  const payments = subs.flatMap(sub => {
    const months = Math.min(Math.round(
      (new Date().getTime() - new Date(sub.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
    ), 6);
    return Array.from({ length: months }, (_, i) => {
      const d = new Date(sub.startDate);
      d.setMonth(d.getMonth() + i);
      return {
        id: `${sub.id}-${i}`,
        service: sub.name,
        emoji: sub.emoji,
        amount: sub.monthlyCost,
        date: d.toISOString().split('T')[0],
        method: sub.paymentMethod,
        status: 'Paid',
        category: sub.category,
      };
    });
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 30);

  const totalPaid = payments.reduce((a, p) => a + p.amount, 0);

  // Group by method
  const byMethod = Object.entries(
    payments.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground mt-1">Complete payment history</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="text-xs text-muted-foreground mb-1">Total Paid (shown)</div>
          <div className="text-2xl font-bold inr">{formatINR(totalPaid)}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-muted-foreground mb-1">Transactions</div>
          <div className="text-2xl font-bold">{payments.length}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-muted-foreground mb-1">Top payment method</div>
          <div className="text-base font-bold truncate">{byMethod[0]?.[0] || 'N/A'}</div>
        </div>
      </div>

      {/* Payment method distribution */}
      <div className="stat-card">
        <h2 className="font-semibold mb-4">Payment Method Distribution</h2>
        <div className="space-y-3">
          {byMethod.map(([method, amount]) => {
            const pct = (amount / totalPaid) * 100;
            return (
              <div key={method}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{method}</span>
                  <span className="font-semibold inr">{formatINR(amount)}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction history */}
      <div className="stat-card p-0 overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Transaction History</h2>
        </div>
        <div className="divide-y divide-border">
          {payments.map(p => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors">
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{p.service}</div>
                <div className="text-xs text-muted-foreground">{p.method}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold inr">{formatINR(p.amount)}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                </div>
              </div>
              <span className="badge-status-active">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

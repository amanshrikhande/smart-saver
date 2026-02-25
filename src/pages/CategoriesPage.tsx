import { useState } from 'react';
import { initialSubscriptions, formatINR, CATEGORY_COLORS, calculateTotalMonthly } from '@/data/subscriptions';
import type { Category } from '@/data/subscriptions';

export default function CategoriesPage() {
  const [subs] = useState(initialSubscriptions.filter(s => s.status !== 'Cancelled'));

  const categories = Object.entries(
    subs.reduce((acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    }, {} as Record<string, typeof subs>)
  ).sort((a, b) => b[1].reduce((s, x) => s + x.monthlyCost, 0) - a[1].reduce((s, x) => s + x.monthlyCost, 0));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground mt-1">Subscriptions grouped by type</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map(([cat, catSubs]) => {
          const total = catSubs.reduce((s, x) => s + x.monthlyCost, 0);
          const color = CATEGORY_COLORS[cat as Category] || '#6B7280';
          return (
            <div key={cat} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '20' }}>
                    <span className="text-lg">{catSubs[0]?.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{cat}</h3>
                    <p className="text-xs text-muted-foreground">{catSubs.length} subscription{catSubs.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold inr">{formatINR(total)}</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
              </div>
              <div className="space-y-2">
                {catSubs.map(s => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{s.emoji}</span>
                      <span className="text-sm">{s.name}</span>
                    </div>
                    <span className="text-sm font-semibold inr">{formatINR(s.monthlyCost)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

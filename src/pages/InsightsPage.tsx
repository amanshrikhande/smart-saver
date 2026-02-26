import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend
} from 'recharts';
import { initialSubscriptions, formatINR, CATEGORY_COLORS, mockMonthlySpend, calculateTotalMonthly } from '@/data/subscriptions';
import type { Category } from '@/data/subscriptions';

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const total = payload[0].payload._total || 1;
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-sm shadow-elevated">
      <div className="font-semibold mb-1">{d.name}</div>
      <div className="text-muted-foreground">{formatINR(d.value)}</div>
      <div className="text-xs text-muted-foreground">{((d.value / total) * 100).toFixed(1)}%</div>
    </div>
  );
};

export default function InsightsPage() {
  const [subs] = useState(initialSubscriptions.filter(s => s.status !== 'Cancelled'));

  const byCategory = Object.entries(
    subs.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + s.monthlyCost;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = calculateTotalMonthly(subs);
  const byCategoryWithTotal = byCategory.map(d => ({ ...d, _total: total }));

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.08) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Insights & Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">Visual breakdown of your subscription spending</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Monthly Total', value: formatINR(total), sub: 'Current month' },
          { label: 'Yearly Projection', value: formatINR(total * 12), sub: 'At current rate' },
          { label: 'Avg per sub', value: formatINR(total / subs.length), sub: `${subs.length} subs` },
          { label: 'Top category', value: byCategory[0]?.name || 'N/A', sub: formatINR(byCategory[0]?.value || 0) + '/mo' },
        ].map(stat => (
          <div key={stat.label} className="stat-card p-4">
            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-lg sm:text-xl font-bold inr truncate">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Spending trend + Pie — stacked on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Line chart */}
        <div className="stat-card">
          <h2 className="font-semibold mb-1">Monthly Expenditure Trend</h2>
          <p className="text-sm text-muted-foreground mb-4">Last 7 months</p>
          <div className="w-full" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMonthlySpend} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={45} />
                <Tooltip
                  formatter={(v: number) => [formatINR(v), 'Spend']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart — full width with legend below on mobile */}
        <div className="stat-card">
          <h2 className="font-semibold mb-1">Spending by Category</h2>
          <p className="text-sm text-muted-foreground mb-4">Tap to see details</p>
          {/* Mobile: stacked, Desktop: side by side */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-[55%]" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byCategoryWithTotal}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {byCategoryWithTotal.map((entry) => (
                      <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] || '#6B7280'} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full space-y-2">
              {byCategory.map(cat => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: CATEGORY_COLORS[cat.name as Category] || '#6B7280' }} />
                  <span className="flex-1 text-xs text-muted-foreground truncate">{cat.name}</span>
                  <span className="font-semibold text-xs inr flex-shrink-0">{formatINR(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="stat-card">
        <h2 className="font-semibold mb-1">Category Breakdown</h2>
        <p className="text-sm text-muted-foreground mb-4">Monthly spend per category</p>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCategory} barSize={28} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={45} />
              <Tooltip
                formatter={(v: number) => [formatINR(v), 'Monthly Spend']}
                contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {byCategory.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] || '#6B7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subscription table */}
      <div className="stat-card p-0 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border">
          <h2 className="font-semibold">All Subscriptions by Cost</h2>
        </div>
        <div className="divide-y divide-border">
          {[...subs].sort((a, b) => b.monthlyCost - a.monthlyCost).map(sub => {
            const pct = (sub.monthlyCost / total) * 100;
            return (
              <div key={sub.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-secondary/30 transition-colors">
                <span className="text-xl flex-shrink-0">{sub.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-sm font-medium truncate">{sub.name}</span>
                    <span className="text-sm font-bold inr flex-shrink-0">{formatINR(sub.monthlyCost)}/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: CATEGORY_COLORS[sub.category] }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{pct.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import { initialSubscriptions, formatINR, CATEGORY_COLORS, mockMonthlySpend, calculateTotalMonthly } from '@/data/subscriptions';
import type { Category } from '@/data/subscriptions';

const RADIAN = Math.PI / 180;

export default function InsightsPage() {
  const [subs] = useState(initialSubscriptions.filter(s => s.status !== 'Cancelled'));

  // Category breakdown
  const byCategory = Object.entries(
    subs.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + s.monthlyCost;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = calculateTotalMonthly(subs);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    if (percent < 0.07) return null;
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
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights & Analytics</h1>
        <p className="text-muted-foreground mt-1">Visual breakdown of your subscription spending</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Total', value: formatINR(total), sub: 'Current month' },
          { label: 'Yearly Projection', value: formatINR(total * 12), sub: 'At current rate' },
          { label: 'Avg per subscription', value: formatINR(total / subs.length), sub: `Across ${subs.length} subs` },
          { label: 'Highest category', value: byCategory[0]?.name || 'N/A', sub: formatINR(byCategory[0]?.value || 0) + '/mo' },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-xl font-bold inr">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Spending trend + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line chart */}
        <div className="stat-card">
          <h2 className="font-semibold mb-1">Monthly Expenditure Trend</h2>
          <p className="text-sm text-muted-foreground mb-6">Last 7 months</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mockMonthlySpend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number) => [formatINR(v), 'Spend']}
                contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
              />
              <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="stat-card">
          <h2 className="font-semibold mb-1">Spending by Category</h2>
          <p className="text-sm text-muted-foreground mb-4">Hover to see details</p>
          <div className="flex gap-4 items-center">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={byCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {byCategory.map((entry, i) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] || '#6B7280'} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, name: string) => [formatINR(v), name]}
                  contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {byCategory.map(cat => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: CATEGORY_COLORS[cat.name as Category] || '#6B7280' }} />
                  <span className="flex-1 text-xs text-muted-foreground">{cat.name}</span>
                  <span className="font-semibold text-xs inr">{formatINR(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart – category breakdown */}
      <div className="stat-card">
        <h2 className="font-semibold mb-1">Category Breakdown</h2>
        <p className="text-sm text-muted-foreground mb-6">Monthly spend per category</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byCategory} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => [formatINR(v), 'Monthly Spend']}
              contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {byCategory.map((entry, i) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] || '#6B7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subscription table */}
      <div className="stat-card p-0 overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">All Subscriptions by Cost</h2>
        </div>
        <div className="divide-y divide-border">
          {[...subs].sort((a, b) => b.monthlyCost - a.monthlyCost).map(sub => {
            const pct = (sub.monthlyCost / total) * 100;
            return (
              <div key={sub.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors">
                <span className="text-xl">{sub.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{sub.name}</span>
                    <span className="text-sm font-bold inr">{formatINR(sub.monthlyCost)}/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: CATEGORY_COLORS[sub.category] }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">{pct.toFixed(1)}%</span>
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

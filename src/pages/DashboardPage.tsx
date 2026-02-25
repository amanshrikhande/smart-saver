import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, CreditCard, Calendar, AlertTriangle, ChevronRight, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import {
  initialSubscriptions, formatINR, calculateTotalMonthly,
  getUpcomingRenewals, mockMonthlySpend, CATEGORY_COLORS
} from '@/data/subscriptions';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [subs] = useState(initialSubscriptions);
  const monthly = calculateTotalMonthly(subs);
  const yearly = monthly * 12;
  const upcoming = getUpcomingRenewals(subs, 7);
  const activeSubs = subs.filter(s => s.status !== 'Cancelled');

  const cards = [
    {
      label: 'Monthly Spend',
      value: formatINR(monthly),
      sub: 'Current month',
      icon: CreditCard,
      color: 'text-primary',
      bg: 'bg-accent',
      trend: '+₹283 vs last month',
      up: true,
    },
    {
      label: 'Yearly Projection',
      value: formatINR(yearly),
      sub: 'At current rate',
      icon: TrendingUp,
      color: 'text-warning',
      bg: 'bg-warning-light',
      trend: 'Projected 2026',
      up: null,
    },
    {
      label: 'Active Subscriptions',
      value: String(activeSubs.length),
      sub: `${subs.filter(s => s.status === 'Expiring Soon').length} expiring soon`,
      icon: CreditCard,
      color: 'text-success',
      bg: 'bg-success-light',
      trend: null,
      up: null,
    },
    {
      label: 'Upcoming Renewals',
      value: String(upcoming.length),
      sub: 'In next 7 days',
      icon: Calendar,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950',
      trend: upcoming.length > 0 ? `Next: ${new Date(upcoming[0]?.nextRenewal).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'None upcoming',
      up: null,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Rahul 👋</h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link to="/subscriptions">
          <button className="hidden md:flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            View all subscriptions <ArrowUpRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(card => (
          <div key={card.label} className="stat-card animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', card.bg)}>
                <card.icon className={cn('w-5 h-5', card.color)} />
              </div>
              {card.up !== null && (
                <span className={cn('text-xs font-medium flex items-center gap-1', card.up ? 'text-destructive' : 'text-success')}>
                  {card.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.trend}
                </span>
              )}
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1 inr">{card.value}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
            {card.trend && card.up === null && (
              <div className="text-xs text-muted-foreground mt-1">{card.trend}</div>
            )}
          </div>
        ))}
      </div>

      {/* Charts + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending trend */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold">Monthly Spending Trend</h2>
              <p className="text-sm text-muted-foreground">Last 7 months in ₹</p>
            </div>
            <span className="badge-status-active">Live data</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
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

        {/* Upcoming Renewals */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Upcoming Renewals</h2>
            <span className="text-xs text-muted-foreground">Next 7 days</span>
          </div>
          {upcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Calendar className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">No renewals this week</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(sub => (
                <Link key={sub.id} to="/subscriptions">
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: sub.color + '20' }}>
                      {sub.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{sub.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(sub.nextRenewal).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <div className="text-sm font-semibold inr">{formatINR(sub.monthlyCost)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* All upcoming */}
          {subs.filter(s => {
            const d = new Date(s.nextRenewal);
            const limit = new Date(); limit.setDate(limit.getDate() + 30);
            return d >= new Date() && d <= limit && s.status !== 'Cancelled';
          }).length > upcoming.length && (
            <div className="mt-4 pt-4 border-t border-border">
              <Link to="/calendar" className="flex items-center justify-center gap-2 text-sm text-primary font-medium hover:underline">
                View full calendar <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Expiring alerts */}
      {subs.filter(s => s.status === 'Expiring Soon').length > 0 && (
        <div className="rounded-2xl border border-warning/30 bg-warning-light p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-warning mb-1">Subscriptions expiring soon</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {subs.filter(s => s.status === 'Expiring Soon').map(s => (
                  <span key={s.id} className="badge-status-warning">{s.emoji} {s.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick subscription overview */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold">All Subscriptions</h2>
          <Link to="/subscriptions" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Manage <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeSubs.slice(0, 6).map(sub => (
            <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: sub.color + '18' }}>
                {sub.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{sub.name}</div>
                <div className="text-xs text-muted-foreground">{sub.category}</div>
              </div>
              <div>
                <div className="text-sm font-semibold inr text-right">{formatINR(sub.monthlyCost)}</div>
                <div className="text-xs text-muted-foreground text-right">/mo</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

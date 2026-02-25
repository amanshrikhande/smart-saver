import { useState } from 'react';
import { Plus, Search, Grid3X3, List, Calendar as CalIcon, X, Trash2, Edit2, ExternalLink, TrendingUp } from 'lucide-react';
import { initialSubscriptions, formatINR, Subscription, CATEGORY_COLORS } from '@/data/subscriptions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddSubscriptionModal from '@/components/AddSubscriptionModal';
import CancelConfirmModal from '@/components/CancelConfirmModal';
import SubscriptionDetailSheet from '@/components/SubscriptionDetailSheet';

type ViewMode = 'grid' | 'list';

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>(initialSubscriptions);
  const [view, setView] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Subscription | null>(null);
  const [detailTarget, setDetailTarget] = useState<Subscription | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(subs.map(s => s.category)))];

  const filtered = subs.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchSearch && matchCat && s.status !== 'Cancelled';
  });

  const handleAdd = (sub: Subscription) => {
    setSubs(prev => [...prev, sub]);
    setShowAdd(false);
  };

  const handleCancel = (sub: Subscription) => {
    setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'Cancelled' } : s));
    setCancelTarget(null);
  };

  const totalMonthly = filtered.reduce((acc, s) => acc + s.monthlyCost, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Subscriptions</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} active · {formatINR(totalMonthly)}/mo total</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2 shadow-primary flex-shrink-0">
          <Plus className="w-4 h-4" />
          Add Subscription
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                categoryFilter === cat
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-card ml-auto">
          <button
            onClick={() => setView('grid')}
            className={cn('p-1.5 rounded-md transition-all', view === 'grid' ? 'bg-secondary shadow-card' : 'text-muted-foreground hover:text-foreground')}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn('p-1.5 rounded-md transition-all', view === 'list' ? 'bg-secondary shadow-card' : 'text-muted-foreground hover:text-foreground')}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(sub => (
            <SubCard
              key={sub.id}
              sub={sub}
              onDetail={setDetailTarget}
              onCancel={setCancelTarget}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-muted-foreground">
              <CalIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No subscriptions found</p>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="stat-card p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cost</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Next Renewal</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, i) => (
                <tr
                  key={sub.id}
                  className={cn('hover:bg-secondary/30 transition-colors cursor-pointer', i !== filtered.length - 1 && 'border-b border-border')}
                  onClick={() => setDetailTarget(sub)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: sub.color + '20' }}>
                        {sub.emoji}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{sub.name}</div>
                        <div className="text-xs text-muted-foreground">{sub.billingCycle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{sub.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold inr">{formatINR(sub.monthlyCost)}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {new Date(sub.nextRenewal).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={sub.status === 'Active' ? 'badge-status-active' : 'badge-status-warning'}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={e => { e.stopPropagation(); setCancelTarget(sub); }}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showAdd && <AddSubscriptionModal onClose={() => setShowAdd(false)} onAdd={handleAdd} existingSubs={subs} />}
      {cancelTarget && <CancelConfirmModal sub={cancelTarget} onClose={() => setCancelTarget(null)} onConfirm={handleCancel} />}
      {detailTarget && <SubscriptionDetailSheet sub={detailTarget} onClose={() => setDetailTarget(null)} onCancel={setCancelTarget} />}
    </div>
  );
}

function SubCard({ sub, onDetail, onCancel }: { sub: Subscription; onDetail: (s: Subscription) => void; onCancel: (s: Subscription) => void }) {
  const monthsActive = Math.max(1, Math.round((new Date().getTime() - new Date(sub.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)));
  const totalSpent = sub.monthlyCost * monthsActive;

  return (
    <div
      className="stat-card cursor-pointer hover:shadow-elevated group"
      onClick={() => onDetail(sub)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: sub.color + '20' }}>
          {sub.emoji}
        </div>
        <span className={sub.status === 'Active' ? 'badge-status-active' : 'badge-status-warning'}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {sub.status}
        </span>
      </div>

      <h3 className="font-semibold text-base mb-1">{sub.name}</h3>
      <p className="text-xs text-muted-foreground mb-3">{sub.category} · {sub.billingCycle}</p>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-2xl font-bold inr">{formatINR(sub.monthlyCost)}</div>
          <div className="text-xs text-muted-foreground">/month</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Next renewal</div>
          <div className="text-sm font-medium">
            {new Date(sub.nextRenewal).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Total spent: <span className="font-semibold text-foreground">{formatINR(totalSpent)}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onCancel(sub); }}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all text-xs flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </div>
  );
}

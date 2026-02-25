import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { initialSubscriptions, formatINR, Subscription } from '@/data/subscriptions';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarPage() {
  const [subs] = useState(initialSubscriptions);
  const today = new Date();
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const firstDay = new Date(current.year, current.month, 1).getDay();

  const getSubsForDay = (day: number): Subscription[] => {
    return subs.filter(s => {
      if (s.status === 'Cancelled') return false;
      const renewal = new Date(s.nextRenewal);
      return renewal.getDate() === day &&
        renewal.getMonth() === current.month &&
        renewal.getFullYear() === current.year;
    });
  };

  const getDayColor = (day: number): string => {
    const daySubs = getSubsForDay(day);
    if (daySubs.length === 0) return '';
    if (daySubs.some(s => s.status === 'Expiring Soon')) return 'bg-warning/20 border-warning/40 text-warning';
    return 'bg-primary/10 border-primary/30 text-primary';
  };

  const isToday = (day: number) =>
    day === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();

  const selectedSubs = selectedDay ? getSubsForDay(selectedDay) : [];
  const monthTotal = subs.filter(s => {
    if (s.status === 'Cancelled') return false;
    const renewal = new Date(s.nextRenewal);
    return renewal.getMonth() === current.month && renewal.getFullYear() === current.year;
  }).reduce((acc, s) => acc + s.monthlyCost, 0);

  const monthBillings = subs.filter(s => {
    if (s.status === 'Cancelled') return false;
    const renewal = new Date(s.nextRenewal);
    return renewal.getMonth() === current.month && renewal.getFullYear() === current.year;
  }).length;

  const prevMonth = () => {
    if (current.month === 0) setCurrent({ month: 11, year: current.year - 1 });
    else setCurrent({ month: current.month - 1, year: current.year });
  };
  const nextMonth = () => {
    if (current.month === 11) setCurrent({ month: 0, year: current.year + 1 });
    else setCurrent({ month: current.month + 1, year: current.year });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Renewal Calendar</h1>
        <p className="text-muted-foreground mt-1">Track all your upcoming billing dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 stat-card">
          {/* Nav */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{MONTHS[current.month]} {current.year}</h2>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}
                className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-secondary transition-colors text-muted-foreground"
              >
                Today
              </button>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const daySubs = getSubsForDay(day);
              const dayColor = getDayColor(day);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                  className={cn(
                    'relative aspect-square flex flex-col items-center justify-start pt-1 rounded-xl text-sm font-medium transition-all border',
                    isToday(day) ? 'bg-primary text-primary-foreground border-primary shadow-primary' :
                      daySubs.length > 0 ? cn('border cursor-pointer hover:opacity-80', dayColor) :
                        'border-transparent hover:bg-secondary text-foreground',
                    selectedDay === day && !isToday(day) && 'ring-2 ring-primary ring-offset-1'
                  )}
                >
                  <span className="text-xs leading-none">{day}</span>
                  {daySubs.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                      {daySubs.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[10px]">{s.emoji}</span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40" />Active billing
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-warning/20 border border-warning/40" />Expiring soon
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary" />Today
            </div>
          </div>
        </div>

        {/* Sidebar panel */}
        <div className="space-y-5">
          {/* Month summary */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Month Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total spending</span>
                <span className="font-bold inr">{formatINR(monthTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Billing events</span>
                <span className="font-bold">{monthBillings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Daily avg</span>
                <span className="font-bold inr">{formatINR(monthTotal / 30)}</span>
              </div>
            </div>
          </div>

          {/* Selected day info */}
          {selectedDay && (
            <div className="stat-card animate-scale-in">
              <h3 className="font-semibold mb-3">
                {MONTHS[current.month].slice(0, 3)} {selectedDay} Renewals
              </h3>
              {selectedSubs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No renewals on this day</p>
              ) : (
                <div className="space-y-3">
                  {selectedSubs.map(sub => (
                    <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40">
                      <span className="text-xl">{sub.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{sub.name}</div>
                        <div className="text-xs text-muted-foreground">{sub.category}</div>
                      </div>
                      <span className="text-sm font-semibold inr">{formatINR(sub.monthlyCost)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border flex justify-between text-sm">
                    <span className="text-muted-foreground">Day total</span>
                    <span className="font-bold inr">{formatINR(selectedSubs.reduce((a, s) => a + s.monthlyCost, 0))}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upcoming this month */}
          <div className="stat-card">
            <h3 className="font-semibold mb-3">This Month's Bills</h3>
            <div className="space-y-2">
              {subs
                .filter(s => {
                  if (s.status === 'Cancelled') return false;
                  const d = new Date(s.nextRenewal);
                  return d.getMonth() === current.month && d.getFullYear() === current.year;
                })
                .sort((a, b) => new Date(a.nextRenewal).getDate() - new Date(b.nextRenewal).getDate())
                .map(sub => (
                  <div key={sub.id} className="flex items-center gap-2.5 py-2 border-b border-border/50 last:border-0">
                    <span className="text-base">{sub.emoji}</span>
                    <span className="text-sm flex-1 truncate">{sub.name}</span>
                    <span className="text-xs text-muted-foreground mr-1">
                      {new Date(sub.nextRenewal).getDate()}th
                    </span>
                    <span className="text-sm font-semibold inr">{formatINR(sub.monthlyCost)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

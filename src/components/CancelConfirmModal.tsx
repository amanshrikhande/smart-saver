import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Subscription, formatINR, calculateTotalMonthly, initialSubscriptions } from '@/data/subscriptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  sub: Subscription;
  onClose: () => void;
  onConfirm: (sub: Subscription) => void;
}

export default function CancelConfirmModal({ sub, onClose, onConfirm }: Props) {
  const [input, setInput] = useState('');
  const isMatch = input.trim() === sub.name;

  const currentMonthly = calculateTotalMonthly(initialSubscriptions);
  const savings = sub.monthlyCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-card rounded-3xl border border-border shadow-elevated w-full max-w-md animate-scale-in">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">Cancel {sub.name}?</h2>
              <p className="text-sm text-muted-foreground mt-1">This action cannot be undone from this view.</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Impact preview */}
          <div className="bg-success-light rounded-2xl p-4 mb-6">
            <div className="text-sm font-semibold text-success mb-2">💰 Savings after cancellation</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Monthly savings</div>
                <div className="text-xl font-bold text-success">{formatINR(savings)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Yearly savings</div>
                <div className="text-xl font-bold text-success">{formatINR(savings * 12)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Label htmlFor="confirm-name" className="text-sm">
              Type <strong>{sub.name}</strong> to confirm cancellation
            </Label>
            <Input
              id="confirm-name"
              placeholder={`Type "${sub.name}" to confirm`}
              value={input}
              onChange={e => setInput(e.target.value)}
              className={isMatch ? 'border-success focus-visible:ring-success' : ''}
            />
            {input && !isMatch && (
              <p className="text-xs text-destructive">Name doesn't match. Type exactly: {sub.name}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">Keep Subscription</Button>
            <Button
              variant="destructive"
              onClick={() => onConfirm(sub)}
              disabled={!isMatch}
              className="flex-1"
            >
              Cancel {sub.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

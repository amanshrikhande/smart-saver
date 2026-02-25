export type Category = 'OTT' | 'Music' | 'SaaS' | 'Cloud' | 'Learning' | 'Gaming' | 'Utilities' | 'News' | 'Fitness';
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly';
export type SubscriptionStatus = 'Active' | 'Expiring Soon' | 'Paused' | 'Cancelled';

export interface Subscription {
  id: string;
  name: string;
  category: Category;
  monthlyCost: number;
  billingCycle: BillingCycle;
  nextRenewal: string; // ISO date
  startDate: string;   // ISO date
  status: SubscriptionStatus;
  color: string;
  emoji: string;
  description: string;
  paymentMethod: string;
  website?: string;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedDate?: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  OTT: '#EF4444',
  Music: '#8B5CF6',
  SaaS: '#3B82F6',
  Cloud: '#F59E0B',
  Learning: '#10B981',
  Gaming: '#EC4899',
  Utilities: '#6B7280',
  News: '#14B8A6',
  Fitness: '#F97316',
};

const today = new Date();
const nextMonth = (daysFromNow: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};
const monthsAgo = (months: number) => {
  const d = new Date(today);
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split('T')[0];
};

export const initialSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'OTT',
    monthlyCost: 649,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(5),
    startDate: monthsAgo(14),
    status: 'Active',
    color: '#EF4444',
    emoji: '🎬',
    description: '4K Ultra HD streaming plan',
    paymentMethod: 'HDFC Credit Card',
    website: 'netflix.com',
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Music',
    monthlyCost: 119,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(12),
    startDate: monthsAgo(22),
    status: 'Active',
    color: '#1DB954',
    emoji: '🎵',
    description: 'Premium individual plan',
    paymentMethod: 'UPI (GPay)',
    website: 'spotify.com',
  },
  {
    id: '3',
    name: 'Hotstar',
    category: 'OTT',
    monthlyCost: 299,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(3),
    startDate: monthsAgo(8),
    status: 'Expiring Soon',
    color: '#1E90FF',
    emoji: '⭐',
    description: 'Disney+ Hotstar Super plan',
    paymentMethod: 'Paytm',
    website: 'hotstar.com',
  },
  {
    id: '4',
    name: 'AWS',
    category: 'Cloud',
    monthlyCost: 3200,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(18),
    startDate: monthsAgo(36),
    status: 'Active',
    color: '#FF9900',
    emoji: '☁️',
    description: 'EC2 + S3 + RDS usage plan',
    paymentMethod: 'ICICI Credit Card',
    website: 'aws.amazon.com',
  },
  {
    id: '5',
    name: 'Notion',
    category: 'SaaS',
    monthlyCost: 400,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(22),
    startDate: monthsAgo(10),
    status: 'Active',
    color: '#000000',
    emoji: '📝',
    description: 'Plus plan for personal workspace',
    paymentMethod: 'SBI Debit Card',
    website: 'notion.so',
  },
  {
    id: '6',
    name: 'YouTube Premium',
    category: 'OTT',
    monthlyCost: 189,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(8),
    startDate: monthsAgo(18),
    status: 'Active',
    color: '#FF0000',
    emoji: '▶️',
    description: 'Ad-free videos + YouTube Music',
    paymentMethod: 'UPI (PhonePe)',
    website: 'youtube.com',
  },
  {
    id: '7',
    name: 'Udemy',
    category: 'Learning',
    monthlyCost: 499,
    billingCycle: 'Yearly',
    nextRenewal: nextMonth(180),
    startDate: monthsAgo(6),
    status: 'Active',
    color: '#EC5252',
    emoji: '🎓',
    description: 'Personal plan – unlimited courses',
    paymentMethod: 'HDFC Credit Card',
    website: 'udemy.com',
  },
  {
    id: '8',
    name: 'Figma',
    category: 'SaaS',
    monthlyCost: 1200,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(14),
    startDate: monthsAgo(20),
    status: 'Active',
    color: '#F24E1E',
    emoji: '🎨',
    description: 'Professional plan (solo)',
    paymentMethod: 'ICICI Credit Card',
    website: 'figma.com',
  },
  {
    id: '9',
    name: 'Apple Music',
    category: 'Music',
    monthlyCost: 99,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(27),
    startDate: monthsAgo(5),
    status: 'Active',
    color: '#FA233B',
    emoji: '🍎',
    description: 'Individual subscription',
    paymentMethod: 'Apple Pay / HDFC',
    website: 'music.apple.com',
  },
  {
    id: '10',
    name: 'GitHub Copilot',
    category: 'SaaS',
    monthlyCost: 830,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(2),
    startDate: monthsAgo(7),
    status: 'Expiring Soon',
    color: '#24292F',
    emoji: '🤖',
    description: 'AI pair programming assistant',
    paymentMethod: 'SBI Credit Card',
    website: 'github.com',
  },
  {
    id: '11',
    name: 'Sony LIV',
    category: 'OTT',
    monthlyCost: 199,
    billingCycle: 'Yearly',
    nextRenewal: nextMonth(120),
    startDate: monthsAgo(4),
    status: 'Active',
    color: '#003399',
    emoji: '🎭',
    description: 'Sports + Premium entertainment',
    paymentMethod: 'Paytm',
    website: 'sonyliv.com',
  },
  {
    id: '12',
    name: 'Canva Pro',
    category: 'SaaS',
    monthlyCost: 499,
    billingCycle: 'Monthly',
    nextRenewal: nextMonth(19),
    startDate: monthsAgo(9),
    status: 'Active',
    color: '#00C4CC',
    emoji: '✏️',
    description: 'Pro design tools & templates',
    paymentMethod: 'UPI (GPay)',
    website: 'canva.com',
  },
];

export const mockMonthlySpend = [
  { month: 'Aug', amount: 6200 },
  { month: 'Sep', amount: 6800 },
  { month: 'Oct', amount: 7100 },
  { month: 'Nov', amount: 6500 },
  { month: 'Dec', amount: 7800 },
  { month: 'Jan', amount: 7200 },
  { month: 'Feb', amount: 7583 },
];

export const BADGES: Badge[] = [
  { id: '1', name: 'First Saver', description: 'Cancelled your first subscription', emoji: '🌱', earned: true, earnedDate: '2025-10-15' },
  { id: '2', name: 'OTT Optimizer', description: 'Manage 3+ OTT subscriptions', emoji: '🎬', earned: true, earnedDate: '2025-11-20' },
  { id: '3', name: 'Budget Guardian', description: 'Stayed under monthly budget for 3 months', emoji: '🛡️', earned: true, earnedDate: '2026-01-01' },
  { id: '4', name: 'Sub Tracker', description: 'Tracked 10+ subscriptions', emoji: '📊', earned: false },
  { id: '5', name: 'Annual Planner', description: 'Switch any subscription to yearly billing', emoji: '📅', earned: false },
  { id: '6', name: 'Smart Spender', description: 'Save ₹1000+ in a single month', emoji: '💰', earned: false },
];

export function calculateTotalMonthly(subs: Subscription[]): number {
  return subs
    .filter(s => s.status !== 'Cancelled')
    .reduce((acc, s) => {
      if (s.billingCycle === 'Monthly') return acc + s.monthlyCost;
      if (s.billingCycle === 'Quarterly') return acc + s.monthlyCost / 3;
      if (s.billingCycle === 'Half-Yearly') return acc + s.monthlyCost / 6;
      if (s.billingCycle === 'Yearly') return acc + s.monthlyCost / 12;
      return acc + s.monthlyCost;
    }, 0);
}

export function getUpcomingRenewals(subs: Subscription[], days = 7): Subscription[] {
  const now = new Date();
  const limit = new Date();
  limit.setDate(limit.getDate() + days);
  return subs.filter(s => {
    const renewal = new Date(s.nextRenewal);
    return renewal >= now && renewal <= limit && s.status !== 'Cancelled';
  });
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

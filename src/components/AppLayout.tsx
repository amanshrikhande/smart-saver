import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, Calendar, BarChart3, Tag,
  Settings, HelpCircle, LogOut, Menu, X, Bell, ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Subscriptions', icon: CreditCard, path: '/subscriptions' },
  { label: 'Calendar', icon: Calendar, path: '/calendar' },
  { label: 'Insights', icon: BarChart3, path: '/insights' },
  { label: 'Categories', icon: Tag, path: '/categories' },
  { label: 'Payments', icon: CreditCard, path: '/payments' },
];

const BOTTOM_ITEMS = [
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Help & Contact', icon: HelpCircle, path: '/contact' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center shadow-primary flex-shrink-0">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        {sidebarOpen && <span className="font-bold text-lg tracking-tight">SubSave</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          {sidebarOpen && 'Menu'}
        </div>
        {NAV_ITEMS.map(item => (
          <Link key={item.path} to={item.path} onClick={() => setMobileSidebarOpen(false)}>
            <div className={cn(
              'nav-item',
              isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive'
            )}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </div>
          </Link>
        ))}

        <div className="pt-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            {sidebarOpen && 'Support'}
          </div>
          {BOTTOM_ITEMS.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setMobileSidebarOpen(false)}>
              <div className={cn('nav-item', isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive')}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Upgrade banner */}
      {sidebarOpen && (
        <div className="mx-3 mb-4 p-4 rounded-2xl bg-accent border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Unlock unlimited subscriptions & advanced insights.</p>
          <Link to="/pricing">
            <Button size="sm" className="w-full text-xs shadow-primary">Go Pro – ₹99/mo</Button>
          </Link>
        </div>
      )}

      {/* User + logout */}
      <div className="border-t border-border p-3">
        <div className={cn('flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary cursor-pointer', !sidebarOpen && 'justify-center')}>
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          {sidebarOpen && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Rahul Gupta</div>
                <div className="text-xs text-muted-foreground truncate">demo@subsave.in</div>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-secondary/30 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col flex-shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-300',
        sidebarOpen ? 'w-60' : 'w-[72px]'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="relative w-64 bg-sidebar border-r border-sidebar-border flex flex-col animate-slide-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-background border-b border-border flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth < 768) setMobileSidebarOpen(true);
              else setSidebarOpen(!sidebarOpen);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-white text-[10px] flex items-center justify-center">3</span>
          </button>

          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold">R</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

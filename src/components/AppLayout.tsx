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

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center shadow-primary flex-shrink-0">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        {(sidebarOpen || mobile) && <span className="font-bold text-lg tracking-tight">SubSave</span>}
        {mobile && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="ml-auto text-muted-foreground hover:text-foreground p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          {(sidebarOpen || mobile) && 'Menu'}
        </div>
        {NAV_ITEMS.map(item => (
          <Link key={item.path} to={item.path} onClick={() => setMobileSidebarOpen(false)}>
            <div className={cn(
              'nav-item min-h-[44px]',
              isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive'
            )}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(sidebarOpen || mobile) && <span>{item.label}</span>}
              {(sidebarOpen || mobile) && isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </div>
          </Link>
        ))}

        <div className="pt-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            {(sidebarOpen || mobile) && 'Support'}
          </div>
          {BOTTOM_ITEMS.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setMobileSidebarOpen(false)}>
              <div className={cn('nav-item min-h-[44px]', isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive')}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {(sidebarOpen || mobile) && <span>{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Upgrade banner */}
      {(sidebarOpen || mobile) && (
        <div className="mx-3 mb-4 p-4 rounded-2xl bg-accent border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Unlock unlimited subscriptions & advanced insights.</p>
          <Link to="/pricing" onClick={() => setMobileSidebarOpen(false)}>
            <Button size="sm" className="w-full text-xs shadow-primary">Go Pro – ₹99/mo</Button>
          </Link>
        </div>
      )}

      {/* User + logout */}
      <div className="border-t border-border p-3">
        <div className={cn('flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary cursor-pointer', !sidebarOpen && !mobile && 'justify-center')}>
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          {(sidebarOpen || mobile) && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Rahul Gupta</div>
                <div className="text-xs text-muted-foreground truncate">demo@subsave.in</div>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="text-muted-foreground hover:text-destructive transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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
          <aside className="relative w-72 max-w-[85vw] bg-sidebar border-r border-sidebar-border flex flex-col">
            <SidebarContent mobile />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-14 sm:h-16 bg-background border-b border-border flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth < 768) setMobileSidebarOpen(true);
              else setSidebarOpen(!sidebarOpen);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <button className="relative text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-destructive rounded-full text-white text-[10px] flex items-center justify-center">3</span>
          </button>

          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold">R</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

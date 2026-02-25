import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-primary">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight">SubSave</span>
          </Link>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-elevated p-8 animate-scale-in">
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">Start managing subscriptions for free</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Rahul Gupta" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="pl-10 pr-10" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <Button type="submit" className="w-full gap-2 shadow-primary" disabled={loading}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

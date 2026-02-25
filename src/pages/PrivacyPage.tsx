import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold">SubSave</span>
        </Link>
        <Link to="/login"><Button size="sm">Sign In</Button></Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: 25 February 2026</p>

        <div className="mb-10 p-5 rounded-2xl bg-success-light border border-success/20">
          <div className="font-semibold text-success mb-1">🔒 Privacy-first commitment</div>
          <p className="text-sm text-muted-foreground">SubSave is designed to be privacy-first. Your subscription data never leaves your device on the free plan.</p>
        </div>

        {[
          ['What We Collect', 'On the free plan: SubSave stores all data locally in your browser (localStorage). We do not collect or transmit subscription information.\n\nOn the Pro plan: Account information (name, email) is stored on our servers to enable sync features. Subscription data sync is encrypted end-to-end.'],
          ['How We Use Your Information', 'Account information is used solely to authenticate you and deliver the Pro plan features. We never sell, share, or monetize your personal information or subscription data.'],
          ['Cookies', 'We use essential cookies only: session management and authentication. We do not use tracking or advertising cookies.'],
          ['Third-Party Services', 'SubSave uses Razorpay for payment processing (Pro plans). Razorpay processes payments per their own privacy policy. We never share your subscription data with payment processors.'],
          ['Data Retention', 'Free plan: Data exists only in your browser and is deleted when you clear browser data. Pro plan: We retain account data for 30 days after account deletion.'],
          ['Your Rights', 'You have the right to: access your data, export your data (Settings > Export), delete your data (Settings > Delete Account), and opt-out of any marketing communications.'],
          ['Security', 'Pro plan data is encrypted in transit (TLS) and at rest (AES-256). We conduct regular security audits.'],
          ['Contact', 'For privacy concerns, email us at privacy@subsave.in. We respond within 48 hours.'],
        ].map(([heading, body]) => (
          <div key={heading} className="mb-8">
            <h2 className="text-xl font-bold mb-3">{heading}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{body}</p>
          </div>
        ))}
      </article>
    </div>
  );
}

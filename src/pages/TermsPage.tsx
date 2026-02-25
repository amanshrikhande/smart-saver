import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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

      <article className="max-w-3xl mx-auto px-6 py-14 prose prose-sm">
        <h1 className="text-4xl font-bold mb-2 tracking-tight not-prose">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-10 not-prose">Last updated: 25 February 2026</p>

        {[
          ['1. Acceptance of Terms', 'By using SubSave ("the Service"), you agree to these Terms. If you disagree, please do not use SubSave.'],
          ['2. Description of Service', 'SubSave is a personal subscription tracking and management tool. We help users track, analyze, and optimize their recurring digital subscriptions. SubSave is not a financial advisory service.'],
          ['3. User Data', 'All subscription data you enter is stored locally in your browser. SubSave does not transmit your personal subscription data to external servers unless you explicitly enable sync features (Pro plan).'],
          ['4. Account Responsibility', 'You are responsible for maintaining the confidentiality of your account credentials. You agree not to share access to your SubSave account with others.'],
          ['5. Acceptable Use', 'You agree not to: (a) use the service for any illegal purpose; (b) attempt to reverse-engineer SubSave; (c) create automated scripts that interact with SubSave.'],
          ['6. Subscription & Billing', 'Paid plans are billed in Indian Rupees (₹ INR). Subscriptions auto-renew unless cancelled before the renewal date. Refunds are available within 7 days of purchase.'],
          ['7. Privacy', 'Your privacy is governed by our Privacy Policy, which is incorporated into these Terms.'],
          ['8. Limitation of Liability', 'SubSave is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of SubSave.'],
          ['9. Changes to Terms', 'We may update these Terms at any time. Continued use of SubSave after changes constitutes acceptance of the new Terms.'],
          ['10. Contact', 'For questions about these Terms, contact us at legal@subsave.in.'],
        ].map(([heading, body]) => (
          <div key={heading} className="mb-8">
            <h2 className="text-lg font-bold mb-2">{heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </article>
    </div>
  );
}

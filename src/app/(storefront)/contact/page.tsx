import { createClient } from '../../../utils/supabase/server';
import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={{ background: '#0a0a0a', minHeight: '80vh', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="wrap" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '48px', marginBottom: '16px', textAlign: 'center', color: 'var(--cream)' }}>Contact Support</h1>
        <p style={{ color: 'var(--cream-2)', textAlign: 'center', marginBottom: '48px', opacity: 0.8 }}>
          Have a question about your order, our ingredients, or just want to say hi? Send us a message and our team will get back to you shortly.
        </p>

        <ContactForm defaultEmail={user?.email} />
      </div>
    </div>
  );
}

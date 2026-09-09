import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const resolvedParams = await searchParams;

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/admin/login?message=Could not authenticate user');
    }

    return redirect('/admin');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-brand">
          <h2>NUTREXIA</h2>
          <p>Admin Portal</p>
        </div>
        
        <form className="login-form" action={signIn}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" required placeholder="admin@nutrexia.in" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="••••••••" />
          </div>

          <button type="submit" className="login-btn">Sign In to Dashboard</button>
          
          {resolvedParams?.message && (
            <p className="login-error">{resolvedParams.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

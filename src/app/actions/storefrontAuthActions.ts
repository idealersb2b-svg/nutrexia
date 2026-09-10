'use server';

import { createClient } from '../../utils/supabase/server';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    try {
      // Check if user already exists in Prisma to prevent unique constraint error on multiple signups
      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email: email,
            passwordHash: 'managed-by-supabase',
            role: 'CUSTOMER',
            profile: {
              create: {
                firstName: firstName,
                lastName: lastName || '',
              }
            }
          }
        });
      }
    } catch (e) {
      console.error('Failed to create prisma user:', e);
      // We don't fail the signup if this errors out, but it might cause issues later
    }
  }

  return { success: true };
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/account');
  revalidatePath('/');
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

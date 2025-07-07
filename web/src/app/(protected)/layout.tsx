'use client';
import { db } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = db.useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}

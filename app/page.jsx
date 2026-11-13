'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    // If already on login or doctors/patients, do nothing
    if (pathname === '/login' || pathname.startsWith('/doctors') || pathname.startsWith('/patients')) return;
    // Redirect to login if not authenticated
    const redirect = pathname !== '/login' ? '/login' : undefined;
    if (redirect) window.location.href = redirect;
  }, [pathname]);

  return <div className="min-h-screen flex items-center justify-center p-4">Loading…</div>;
}
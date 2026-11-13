'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import { cn } from '@/lib/utils';
import { FormInput } from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-8">
      <div className="w-full max-w-md space-y-5 bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900">Log in</h2>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>

        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <a href="/register" className="text-teal-600 hover:text-teal-500 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
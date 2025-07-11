'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const router = useRouter();

  async function handleSendCode(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await db.auth.sendMagicCode({ email });
      setStep('code');
      setStatus('idle');
    } catch (err) {
      setStatus('error');
    }
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await db.auth.signInWithMagicCode({ email, code });
      router.push('/');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {step === 'email' ? (
        <form onSubmit={handleSendCode}>
          <label>
            Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <button type="submit" disabled={status === 'loading'}>Send Code</button>
        </form>
      ) : (
        <form onSubmit={handleSignIn}>
          <label>
            Code: <input value={code} onChange={(e) => setCode(e.target.value)} required />
          </label>
          <button type="submit" disabled={status === 'loading'}>Register</button>
        </form>
      )}
      {status === 'error' && <p>Something went wrong.</p>}
    </div>
  );
}

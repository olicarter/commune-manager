'use client';
import { useState, FormEvent } from 'react';
import { NEXT_PUBLIC_API_URL } from '@/config/env';

export default function NewCommunityPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/communities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setName('');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div>
      <h1>Create Community</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{' '}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit" disabled={status === 'loading'}>
          Create
        </button>
      </form>
      {status === 'success' && <p>Community created!</p>}
      {status === 'error' && <p>Failed to create community.</p>}
    </div>
  );
}

'use client';
import { useState, FormEvent } from 'react';
import { db, id, lookup } from '@/lib/db';

export default function InviteMemberPage() {
  const { data, isLoading, error } = db.useQuery({ communities: {} });
  const [email, setEmail] = useState('');
  const [community, setCommunity] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading communities.</p>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await db.transact(
        db.tx.members[id()]
          .link({ $user: lookup('email', email) })
          .link({ communities: community })
      );
      setStatus('success');
      setEmail('');
      setCommunity('');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div>
      <h1>Invite Member</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Community:{' '}
          <select value={community} onChange={(e) => setCommunity(e.target.value)} required>
            <option value="" disabled>
              Select...
            </option>
            {data.communities.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" disabled={status === 'loading'}>
          Invite
        </button>
      </form>
      {status === 'success' && <p>Invitation sent!</p>}
      {status === 'error' && <p>Failed to send invitation.</p>}
    </div>
  );
}

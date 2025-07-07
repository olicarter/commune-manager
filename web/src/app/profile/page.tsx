'use client';
import { useEffect, useState, FormEvent } from 'react';
import { db, id } from '@/lib/db';

export default function ProfilePage() {
  const { user, isLoading: authLoading } = db.useAuth();
  const query = user
    ? {
        profiles: {
          $: { where: { '$user.id': user.id } },
          avatar: {},
        },
      }
    : null;
  const { data, isLoading, error } = db.useQuery(query);

  const profile = data?.profiles?.[0];

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setDisplayName(profile.displayName ?? '');
    }
  }, [profile]);

  if (authLoading || isLoading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in.</p>;
  if (error) return <p>Error loading profile.</p>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (profile) {
      await db.transact(db.tx.profiles[profile.id].update({ name, displayName }));
    } else {
      const newId = id();
      await db.transact(
        db.tx.profiles[newId]
          .update({ name, displayName })
          .link({ '$user': user.id })
      );
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setAvatarUploading(true);
    try {
      const path = `${user.id}/avatar`;
      const { data } = await db.storage.uploadFile(path, file);
      await db.transact(db.tx.profiles[profile.id].link({ avatar: data.id }));
    } finally {
      setAvatarUploading(false);
    }
  }

  return (
    <div>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Display Name:{' '}
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <h2>Avatar</h2>
        {profile?.avatar ? (
          <img src={profile.avatar.url} alt="avatar" width={120} />
        ) : (
          <p>No avatar uploaded.</p>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {avatarUploading && <p>Uploading...</p>}
      </div>
    </div>
  );
}

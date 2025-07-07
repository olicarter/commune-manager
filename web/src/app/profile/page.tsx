'use client';
import { useState, useEffect, FormEvent } from 'react';
import { db, id } from '@/lib/db';

export default function ProfilePage() {
  const {
    user,
    isLoading: authLoading,
    error: authError,
  } = db.useAuth();

  const { data, isLoading, error } = db.useQuery(
    user
      ? {
          profiles: {
            $: { where: { '$user.id': user.id } },
            avatar: {},
          },
        }
      : null,
  );

  const profile = data?.profiles?.[0];

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setDisplayName(profile.displayName ?? '');
    }
  }, [profile]);

  if (authLoading || isLoading) return <p>Loading...</p>;
  if (authError || error) return <p>Error loading profile.</p>;
  if (!user) return <p>Please log in.</p>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let profileId = profile?.id as string | undefined;
    const txs: any[] = [];

    if (!profileId) {
      profileId = id();
      txs.push(db.tx.profiles[profileId].update({ name, displayName }));
      txs.push(db.tx.$users[user.id].link({ profile: profileId }));
    } else {
      txs.push(db.tx.profiles[profileId].merge({ name, displayName }));
    }

    if (avatarFile) {
      const path = `${user.id}/avatar-${Date.now()}`;
      const { data: fileData } = await db.storage.uploadFile(path, avatarFile);
      txs.push(db.tx.$files[fileData.id].link({ profile: profileId }));
    }

    await db.transact(txs);
    setAvatarFile(null);
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Display Name:{' '}
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
        </div>
        {profile?.avatar && (
          <div>
            <img src={profile.avatar.url} alt="avatar" width={100} />
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

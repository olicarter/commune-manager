'use client';
import { db } from '@/lib/db';

export default function CommunitiesPage() {
  const { data, isLoading, error } = db.useQuery({ communities: {} });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading communities.</p>;

  return (
    <div>
      <h1>Communities</h1>
      <ul>
        {data.communities.map((c: any) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <Link href="/communities/new">Create Community</Link>
    </div>
  );
}

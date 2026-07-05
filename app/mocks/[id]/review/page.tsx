import { MockReviewClient } from '@/components/MockReviewClient';
import { getMock } from '@/data/mocks';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mock = getMock(id);
  if (!mock) notFound();

  return (
    <main className="section">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black">Review: {mock.title}</h1>
        <div className="mt-8">
          <MockReviewClient mock={mock} />
        </div>
      </div>
    </main>
  );
}

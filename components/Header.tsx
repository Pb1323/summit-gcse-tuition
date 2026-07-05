import Link from 'next/link';

const links = ['gcse', 'mocks', 'diagnostic', 'sprints', 'free-resources', 'tuition', 'pricing'];

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
        <Link href="/" className="text-2xl font-black text-navy">Grade<span className="text-royal">Sprint</span></Link>
        <nav className="hidden gap-5 text-sm font-semibold md:flex">
          {links.map((link) => <Link key={link} href={`/${link}`} className="hover:text-royal">{link.replace('-', ' ')}</Link>)}
        </nav>
        <Link href="/diagnostic" className="btn btn-primary py-2">Start diagnostic</Link>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-xs font-bold md:hidden">
        {links.map((link) => <Link key={link} href={`/${link}`} className="rounded-full bg-white px-3 py-2 shadow-sm">{link.replace('-', ' ')}</Link>)}
      </nav>
    </header>
  );
}

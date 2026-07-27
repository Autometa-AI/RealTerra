import Link from 'next/link';
import { CMS_PAGES } from '../../../lib/cms-schema';

export default function AdminOverview() {
  return (
    <div>
      <h1 className="admin-h1">Overview</h1>
      <p className="admin-sub">
        Pick a page to edit. Saves are instant — the live site reflects them on the next page load.
      </p>
      <div className="admin-grid">
        {CMS_PAGES.map((p) => (
          <Link key={p.key} href={`/admin/${p.key}`} className="admin-card">
            <div className="admin-card-title">{p.label}</div>
            <div className="admin-card-desc">{p.description}</div>
            <div className="admin-card-meta">Edit</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

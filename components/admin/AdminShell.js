'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CMS_PAGES } from '../../lib/cms-schema';

export default function AdminShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          RealTerra CMS
          <span>Content Dashboard</span>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className={`admin-nav-link${pathname === '/admin' ? ' active' : ''}`}>
            Overview
          </Link>
          {CMS_PAGES.map((p) => {
            const href = `/admin/${p.key}`;
            return (
              <Link key={p.key} href={href} className={`admin-nav-link${pathname === href ? ' active' : ''}`}>
                {p.label}
              </Link>
            );
          })}
          <div className="admin-nav-sep" />
          <p className="admin-nav-heading">Enquiries</p>
          <Link
            href="/admin/contact-submissions"
            className={`admin-nav-link${pathname === '/admin/contact-submissions' ? ' active' : ''}`}
          >
            Contact Page Fillups
          </Link>
          <Link
            href="/admin/project-enquiries"
            className={`admin-nav-link${pathname === '/admin/project-enquiries' ? ' active' : ''}`}
          >
            Project Enquiries
          </Link>
          <Link
            href="/admin/newsletter"
            className={`admin-nav-link${pathname === '/admin/newsletter' ? ' active' : ''}`}
          >
            Newsletter Subscribed
          </Link>
        </nav>
        <div className="admin-sidebar-foot">
          Signed in as <strong>{user.name}</strong>
          <div>
            <button type="button" className="admin-logout-btn" onClick={logout}>Sign out</button>
          </div>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Property search in the home hero.
 *
 * It does not filter anything itself — it hands the query to /projects,
 * which already owns the search over the catalogue. Two search boxes with
 * two implementations would drift apart the first time the matching rules
 * changed; this way there is one.
 */
export default function HeroSearch({ placeholder, buttonLabel }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/projects?q=${encodeURIComponent(q)}#project-search` : '/projects');
  }

  return (
    <form className="hero-search" onSubmit={onSubmit} role="search">
      <span className="hero-search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search by project, developer or area'}
        aria-label="Search projects"
      />
      <button type="submit" className="hero-search-btn">{buttonLabel || 'Search'}</button>
    </form>
  );
}

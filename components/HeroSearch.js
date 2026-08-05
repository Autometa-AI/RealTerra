'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Media from './Media';
import { uniqueSlugs } from '../lib/slug';

/**
 * Property search in the home hero.
 *
 * It shows what it has. Typing opens the developments that match, each
 * linking straight to its own page — the catalogue is a few dozen entries,
 * so there is nothing to fetch and the answer appears as fast as the letters
 * do. Submitting still hands off to /projects, which owns the full filtered
 * grid: this is a shortcut to a development you can already name, not a
 * second implementation of the search.
 *
 * The matching rule is the one /projects uses — every word typed has to
 * appear somewhere in the entry — so a query can never list results here and
 * then land on an empty grid.
 */
const MAX_SUGGESTIONS = 5;

export default function HeroSearch({ placeholder, buttonLabel, projects }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);

  const items = useMemo(() => projects || [], [projects]);
  // Computed over the full list, so a link never changes as the visible set
  // narrows.
  const slugs = useMemo(() => uniqueSlugs(items, 'name'), [items]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/);
    return items
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => {
        const haystack = [p.name, p.developer, p.location, p.description, p.badge]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return terms.every((term) => haystack.includes(term));
      });
  }, [items, query]);

  const shown = matches.slice(0, MAX_SUGGESTIONS);
  const listOpen = open && query.trim().length > 0;

  // Any press outside closes the list. Pointerdown rather than click, so it
  // has closed before a tap elsewhere on the hero lands.
  useEffect(() => {
    if (!listOpen) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [listOpen]);

  function goToResults() {
    const q = query.trim();
    router.push(q ? `/projects?q=${encodeURIComponent(q)}#project-search` : '/projects');
  }

  function onSubmit(e) {
    e.preventDefault();
    // Enter on a highlighted suggestion opens that development; Enter on the
    // typed text runs the search. Both are what the highlight implies.
    const picked = shown[highlight];
    setOpen(false);
    if (picked) router.push(`/projects/${slugs[picked.i]}`);
    else goToResults();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false);
      setHighlight(-1);
      return;
    }
    if (!listOpen || shown.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % shown.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? shown.length - 1 : h - 1));
    }
  }

  return (
    <div className="hero-search-wrap" ref={rootRef}>
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
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder || 'Search by project, developer or area'}
          aria-label="Search projects"
          role="combobox"
          aria-expanded={listOpen}
          aria-controls="hero-search-results"
          aria-autocomplete="list"
          aria-activedescendant={highlight >= 0 ? `hero-search-opt-${highlight}` : undefined}
          autoComplete="off"
        />
        <button type="submit" className="hero-search-btn">{buttonLabel || 'Search'}</button>
      </form>

      {listOpen && (
        <div className="hero-search-results" id="hero-search-results" role="listbox">
          {shown.length === 0 ? (
            <p className="hero-search-empty">
              No developments match that. <Link href="/projects">Browse all projects</Link>
            </p>
          ) : (
            <>
              {shown.map(({ p, i }, n) => (
                <Link
                  key={slugs[i]}
                  href={`/projects/${slugs[i]}`}
                  id={`hero-search-opt-${n}`}
                  role="option"
                  aria-selected={n === highlight}
                  className={`hero-search-result${n === highlight ? ' on' : ''}`}
                  onMouseEnter={() => setHighlight(n)}
                  onClick={() => setOpen(false)}
                >
                  <span className="hero-search-result-img">
                    <Media src={p.image} alt="" fill sizes="72px" />
                  </span>
                  <span className="hero-search-result-body">
                    <span className="hero-search-result-dev">{p.developer}</span>
                    <span className="hero-search-result-name">{p.name}</span>
                    <span className="hero-search-result-meta">
                      {[p.location, p.from && `From ${p.from}`].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </Link>
              ))}
              {/* Offered even when nothing is truncated: it is also the route
                  to the filters. */}
              <button
                type="button"
                className="hero-search-all"
                onClick={() => { setOpen(false); goToResults(); }}
              >
                {matches.length > shown.length
                  ? `See all ${matches.length} matches`
                  : 'Open in the full project list'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

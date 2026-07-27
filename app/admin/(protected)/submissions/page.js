import { getSupabase } from '../../../../lib/supabase';

function fmt(d) {
  return new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

export default async function Submissions() {
  const supabase = getSupabase();

  const [{ data: enquiries, error: e1 }, { data: subscribers, error: e2 }] = await Promise.all([
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }).limit(200),
  ]);

  return (
    <div>
      <h1 className="admin-h1">Submissions</h1>
      <p className="admin-sub">Contact enquiries and newsletter signups from the live site.</p>

      <div className="a-section">
        <div className="a-section-title">
          Contact enquiries
          <span>{enquiries?.length || 0} shown, most recent first</span>
        </div>
        {e1 && <p className="a-error">{e1.message}</p>}
        {!e1 && enquiries?.length === 0 && <p className="admin-sub" style={{ marginBottom: 0 }}>No enquiries yet.</p>}
        {enquiries?.map((row) => (
          <div className="a-repeat-item" key={row.id}>
            <div className="a-repeat-label">{fmt(row.created_at)}</div>
            <p style={{ margin: '0 0 0.4rem', fontWeight: 600 }}>{row.first_name} {row.last_name} — {row.email}</p>
            <p className="a-help" style={{ marginBottom: '0.4rem' }}>
              {[row.phone, row.interest, row.budget].filter(Boolean).join(' · ') || '—'}
            </p>
            {row.message && <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>{row.message}</p>}
          </div>
        ))}
      </div>

      <div className="a-section">
        <div className="a-section-title">
          Newsletter subscribers
          <span>{subscribers?.length || 0} shown, most recent first</span>
        </div>
        {e2 && <p className="a-error">{e2.message}</p>}
        {!e2 && subscribers?.length === 0 && <p className="admin-sub" style={{ marginBottom: 0 }}>No subscribers yet.</p>}
        {subscribers?.map((row) => (
          <div className="a-repeat-item" key={row.id}>
            <span style={{ fontWeight: 600 }}>{row.email}</span>
            <span className="a-help" style={{ marginLeft: '0.6rem' }}>{fmt(row.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

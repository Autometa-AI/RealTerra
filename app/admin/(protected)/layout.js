import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from '../../../lib/auth';
import '../admin.css';
import AdminShell from '../../../components/admin/AdminShell';

export default async function ProtectedAdminLayout({ children }) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) redirect('/admin/login');

  return (
    <div className="admin">
      <AdminShell user={session}>{children}</AdminShell>
    </div>
  );
}

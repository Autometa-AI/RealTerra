import { notFound } from 'next/navigation';
import { CMS_PAGES, CMS_SCHEMA } from '../../../../lib/cms-schema';
import { getContentFresh } from '../../../../lib/content';
import PageEditor from '../../../../components/admin/PageEditor';

export default async function AdminPageEditor({ params }) {
  const { page } = await params;
  const meta = CMS_PAGES.find((p) => p.key === page);
  if (!meta) notFound();

  const content = await getContentFresh(page);
  const groups = CMS_SCHEMA[page];

  return (
    <PageEditor pageKey={page} pageLabel={meta.label} groups={groups} initialContent={content} />
  );
}

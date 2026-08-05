import Faq from './Faq';
import Reviews from './Reviews';
import { getContent } from '../lib/content';

/**
 * The FAQ and Google-review blocks, in the second half of every page.
 *
 * Both read from the Home content rather than being duplicated per page:
 * they are the same questions and the same reviews everywhere, and copying
 * the fields onto six CMS pages would mean editing an answer six times and
 * finding out later that two of them were missed.
 */
export default async function SharedSections() {
  const home = await getContent('home');
  return (
    <>
      <Faq content={home.faq} />
      <Reviews content={home.reviews} />
    </>
  );
}

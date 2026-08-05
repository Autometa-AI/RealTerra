import SocialIcon from './SocialIcon';
import { whatsappUrl, askUsLabel } from '../lib/site';

/**
 * Floating WhatsApp button, desktop only.
 *
 * Below 900px the mobile dock already carries the same action pinned to the
 * bottom of the screen, and two floating WhatsApp buttons on one phone
 * viewport is one too many — CSS hides this one there.
 *
 * The bounce runs continuously rather than on hover: the point is to catch
 * the eye of someone who has not yet decided to look at it. It stops under
 * `prefers-reduced-motion`, which is exactly the setting that exists to stop
 * a permanently animating element.
 */
export default function WhatsAppFab({ site }) {
  const href = whatsappUrl(site);
  const label = askUsLabel(site);

  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} on WhatsApp`}
    >
      <span className="wa-fab-icon"><SocialIcon platform="WhatsApp" size={26} /></span>
      <span className="wa-fab-label">{label}</span>
    </a>
  );
}

// Small derivations shared by the components that read site-wide content.

const DEFAULT_PHONE = '971555084911';

/** Builds the wa.me deep link, carrying the CMS-authored opening message. */
export function whatsappUrl(site) {
  const phone = (site?.askUs?.phone || DEFAULT_PHONE).replace(/[^0-9]/g, '');
  const message = site?.askUs?.message?.trim();
  return message
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;
}

export function askUsLabel(site) {
  return site?.askUs?.label || 'Ask Us Question';
}

export function visibleSocials(site) {
  return (site?.social || []).filter((s) => s?.visible !== false && s?.url && s?.platform);
}

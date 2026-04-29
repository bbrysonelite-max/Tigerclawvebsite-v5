import { SOCIAL_LINK_LABELS, SOCIAL_LINKS, type SocialPlatform } from "@/config/socials";

function isRealUrl(url: string) {
  const trimmed = url.trim();
  const upper = trimmed.toUpperCase();
  const isPlaceholder =
    upper === "#" ||
    upper.startsWith("REPLACE_") ||
    upper.startsWith("[REPLACE") ||
    upper.startsWith("PLACEHOLDER") ||
    upper.startsWith("TODO");

  return trimmed.length > 0 && !isPlaceholder && /^https?:\/\//i.test(trimmed);
}

const activeLinks = (Object.entries(SOCIAL_LINKS) as Array<[SocialPlatform, string]>).filter(([, url]) => isRealUrl(url));

export default function FooterSocialLinks() {
  if (activeLinks.length === 0) return null;

  return (
    <div className="mt-5">
      <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        Watch demos and updates
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {activeLinks.map(([platform, url]) => {
          const link = SOCIAL_LINK_LABELS[platform];
          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

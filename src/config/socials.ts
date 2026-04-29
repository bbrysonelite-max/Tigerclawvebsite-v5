export const SOCIAL_LINKS = {
  instagram: "",
  tiktok: "",
  youtube: "",
  linkedin: "",
  x: "",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;

export const SOCIAL_LINK_LABELS: Record<SocialPlatform, { label: string; ariaLabel: string }> = {
  instagram: {
    label: "Instagram",
    ariaLabel: "Watch Tiger Claw demos and updates on Instagram",
  },
  tiktok: {
    label: "TikTok",
    ariaLabel: "Watch Tiger Claw demos and updates on TikTok",
  },
  youtube: {
    label: "YouTube",
    ariaLabel: "Watch Tiger Claw demos and updates on YouTube",
  },
  linkedin: {
    label: "LinkedIn",
    ariaLabel: "Follow Tiger Claw on LinkedIn",
  },
  x: {
    label: "X",
    ariaLabel: "Follow Tiger Claw on X",
  },
};

export interface CardDTO {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  coverImage: string;
  avatarImage: string;
  color: string;
  links: LinkDTO[];
  useNativeIcons: boolean;
}
export interface LinkDTO {
  id: string;
  title: string;
  subtitle: string;
  type: CardLink;
}

export type CardLink = SocialLink | CommunicationLink;
export type SocialLink =
  | "instagram"
  | "twitter"
  | "tiktok"
  | "linkedin"
  | "facebook";

export type CommunicationLink =
  | "email"
  | "phone"
  | "whatsapp"
  | "discord"
  | "telegram";

export const socialLinks = [
  "instagram",
  "twitter",
  "tiktok",
  "linkedin",
  "facebook",
];
export const communicationLinks = [
  "email",
  "phone",
  "whatsapp",
  "discord",
  "telegram",
];
export const allLinks = [...socialLinks, ...communicationLinks];
export const linksNoURL = ["phone", "email", "whatsapp"];
export const mobileLinks = ["phone", "whatsapp"];
export const phoneNumberLinks = ["phone", "whatsapp"];

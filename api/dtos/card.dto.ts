export interface ICreateCardDTO {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  coverImage: string;
  avatarImage: string;
  color: string;
  links: LinkDefinition[];
}
export interface ICardDTO extends ICreateCardDTO {}

export interface LinkDefinition {
  title: string;
  subtitle: string;
  type: CardLink;
}

export type CardLink = SocialLink | CommunicationLink;
export type SocialLink =
  | "instagram"
  | "twitter"
  | "snapchat"
  | "linkedin"
  | "facebook";
export type CommunicationLink =
  | "email"
  | "phone"
  | "whatsapp"
  | "skype"
  | "discord";

export const socialLinks = [
  "instagram",
  "twitter",
  "snapchat",
  "linkedin",
  "facebook",
];
export const communicationLinks = [
  "email",
  "phone",
  "whatsapp",
  "skype",
  "discord",
];
export const allLinks = [...socialLinks, ...communicationLinks];

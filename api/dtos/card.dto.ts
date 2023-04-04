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
  type: LinkType;
}

export enum LinkType {
  Facebook = "facebook",
  Twitter = "twitter",
  Instagram = "instagram",
  LinkedIn = "linkedin",
  YouTube = "youtube",
  Email = "email",
  
}

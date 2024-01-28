import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Link } from '../schema/link/link.schema';
import { Transform } from 'class-transformer';

export type LinkType = CommunicationLink | SocialLink;

type SocialLink = 'instagram' | 'twitter' | 'tiktok' | 'linkedin' | 'facebook';

type CommunicationLink =
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'discord'
  | 'telegram';

const socialLinks = ['instagram', 'twitter', 'tiktok', 'linkedin', 'facebook'];
const communicationLinks = [
  'email',
  'phone',
  'whatsapp',
  'discord',
  'telegram',
];
export const allowedCardLinks = [...socialLinks, ...communicationLinks];

export class LinkDTO implements Link {
  @IsString()
  @IsNotEmpty()
  @Transform((arg) => {
    if (!arg.value.startsWith('+') && arg.obj.type === 'phone') {
      return `+${arg.value}`;
    }
    return arg.value;
  })
  title: string;
  @IsString()
  @IsOptional()
  subtitle: string;
  @IsIn(allowedCardLinks)
  @IsNotEmpty()
  type: LinkType;
}

import { plainToClass, Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { LinkDTO } from './link.dto';

export class CardDTO {
  @IsString()
  @IsOptional()
  slug: string;
  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsString()
  @IsOptional()
  avatarImage: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsOptional()
  @Type(() => LinkDTO)
  @Transform((arg) => {
    const links = JSON.parse(arg.value);
    const linkObjects = plainToClass(LinkDTO, links);
    return linkObjects;
  })
  @ValidateNested({ each: true })
  links: LinkDTO[];

  @IsOptional()
  @Transform((arg) => {
    return arg.value === 'true';
  })
  useNativeIcons = false;
}
export class CreateCardDTO extends CardDTO {
  constructor() {
    super();
    this.useNativeIcons = false;
  }
}

export class UpdateCardDTO extends CardDTO {
  constructor() {
    super();
    this.useNativeIcons = false;
  }
  @IsString()
  @IsNotEmpty()
  createdBy: ObjectId;

  @IsString()
  @IsNotEmpty()
  id: ObjectId;
}

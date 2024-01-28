import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { createSchemaWithMethods } from '../../../common/mongo/schema.factory';
import { SchemaRules } from '../../../common/mongo/schema.rules';
import { Link, LinkSchema } from './link/link.schema';
import { SchemaRule } from '../../../common/types';

export type CardDocument = Card & Document;

const slugRules: SchemaRule = {
  type: String,
  required: true,
};

@Schema()
export class Card extends mongoose.Document {
  @Prop(slugRules)
  slug: string;
  @Prop(SchemaRules.defaultedStringNotRequired('Work'))
  label?: string;
  @Prop(SchemaRules.stringNotRequired)
  firstName: string;
  @Prop(SchemaRules.stringNotRequired)
  lastName?: string;
  @Prop(SchemaRules.stringNotRequired)
  jobTitle?: string;
  @Prop(SchemaRules.stringNotRequired)
  company?: string;
  @Prop(SchemaRules.stringNotRequired)
  coverImage?: string;
  @Prop(SchemaRules.stringNotRequired)
  avatarImage?: string;
  @Prop(SchemaRules.hexColorRules)
  color: string;
  @Prop({ type: [LinkSchema], required: false, default: [] })
  links?: Link[];
  @Prop(SchemaRules.boolNotRequired)
  useNativeIcons: boolean;
  // I decided to make parent referencing because the user could potentially have
  // huge array of cards which could reach to the document size limit.
  @Prop(SchemaRules.parentRefRules('User', 'Card'))
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const CardSchema = createSchemaWithMethods(Card, {
  timestamps: true,
});

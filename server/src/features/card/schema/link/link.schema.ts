import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaRules } from '../../../../common/mongo/schema.rules';
import { createSchemaWithMethods } from '../../../../common/mongo/schema.factory';
import { LinkType, allowedCardLinks } from '../../dto/link.dto';
import { SchemaRule } from '../../../../common/types';
import { isValidPhoneLink } from '../../../../common/validation';

const isValidLinkType: SchemaRule = {
  type: String,
  enum: allowedCardLinks,
  required: [
    true,
    `The Link type must be one of the following: ${allowedCardLinks.join()}`,
  ],
};
const isValidLinkTitle: SchemaRule = {
  type: String,
  required: true,
  validate: {
    message: 'Invalid link title.',
    validator: function (this: Link, val: string) {
      if (this.type === 'phone') {
        return isValidPhoneLink(val);
      }
      return true;
    },
  },
};
// Card subdocument schema for links.
@Schema()
export class Link {
  @Prop(isValidLinkTitle)
  title: string;
  @Prop(SchemaRules.stringNotRequired)
  subtitle: string;
  @Prop(isValidLinkType)
  type: LinkType;
}

export const LinkSchema = createSchemaWithMethods(Link);

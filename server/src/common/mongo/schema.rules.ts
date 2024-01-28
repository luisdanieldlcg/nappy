import mongoose from 'mongoose';
import { SchemaRule } from '../types';

export class SchemaRules {
  // set undefined value if empty
  public static undefinedIfEmpty = (val?: string) => {
    if (!val) return undefined;
    if (val === 'null') return undefined;
    return val;
  };

  public static stringNotRequired: SchemaRule = {
    type: String,
    required: false,
    default: undefined,
    set: SchemaRules.undefinedIfEmpty,
  };

  public static defaultedStringNotRequired = (defaultValue: string) => {
    return {
      type: String,
      required: false,
      default: defaultValue,
    };
  };

  public static stringRequired = (fieldName: string): SchemaRule => {
    return {
      type: String,
      required: [true, `'${fieldName}' is missing.`],
    };
  };
  public static uniqueStringRequired = (fieldName: string): SchemaRule => {
    return {
      type: String,
      required: [true, `'${fieldName}' is missing.`],
      unique: true,
    };
  };
  public static boolNotRequired: SchemaRule = {
    type: Boolean,
    required: false,
    default: false,
  };

  public static hexColorRules: SchemaRule = {
    type: String,
    required: false,
    default: '#B0BEC5',
    // Adds # sign to the color if it's missing
    validate: {
      message: 'Invalid hex color code.',
      // This regular expression defines a pattern for matching a hex color code
      // in the format of #RRGGBB or #RGB, where R, G, and B represent red, green, and blue color components respectively.
      validator: (val: string) =>
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val),
    },
  };

  public static parentRefRules = (
    parentName: string,
    childName: string,
  ): SchemaRule => {
    return {
      type: mongoose.Schema.Types.ObjectId,
      ref: parentName,
      required: [true, `${childName} must belong to a ${parentName}.`],
    };
  };
}

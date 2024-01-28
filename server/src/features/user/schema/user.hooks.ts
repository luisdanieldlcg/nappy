import { databaseConstants, passwordHashRounds } from 'src/common/constants';
import { makeHash } from 'src/common/helpers/bcrypt';
import { Card } from '../../card/schema/card.schema';
import { UserDocument, UserSchema } from '.';

async function handlePasswordHash(this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await makeHash(this.password, passwordHashRounds);
    this.passwordConfirm = undefined;
  } catch (error) {
    console.log(error);
  }
  return next();
}

export const userHooksFactory = () => {
  const schema = UserSchema;

  // Virtual Populate
  schema.virtual(databaseConstants.user.virtualFields.cardsPath, {
    ref: Card.name,
    // Card field that stores the user id
    foreignField: 'user',
    // Field local to this model that stores the user id
    localField: '_id',
  });

  schema.pre('save', handlePasswordHash);

  return schema;
};

import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { removeImage } from '../../../common/helpers/image-upload';
import { Card, CardDocument, CardSchema } from './card.schema';
import slugify from 'slugify';
const IMAGE_URL_PREFIX = 'http://localhost:3001/images/';

function populateFindQueries(this: Card, next: () => void) {
  // this.populate({
  //   path: 'user',
  //   select: 'email',
  // });
  next();
}

// This function will add the url prefix to the image field
function addImageUrlPrefixToAll(
  docs: CardDocument | CardDocument[],
  next: () => void,
) {
  if (!docs) return next();
  if (Array.isArray(docs)) {
    // First we need to check if the docs is an array or a single document
    // And then we need to check if the document has an avatarImage or coverImage
    // If it does, we need to add the prefix to the image name
    // If the docs is an array, we need to loop through the array and add the prefix to the image name
    docs.forEach(addImageUrlPrefix);
  } else {
    // If the docs is a single document, we need to add the prefix to the image name
    addImageUrlPrefix(docs);
  }
  return next();
}

function addImageUrlPrefix(doc: CardDocument) {
  if (doc.avatarImage) {
    // check if it doesnt have the prefix already.
    // If it does, we dont need to add it again
    if (!doc.avatarImage.startsWith('http')) {
      doc.avatarImage = IMAGE_URL_PREFIX + doc.avatarImage;
    }
  }
  if (doc.coverImage) {
    // same here
    if (!doc.coverImage.startsWith('http')) {
      doc.coverImage = IMAGE_URL_PREFIX + doc.coverImage;
    }
  }
}

export function deleteCardImages(doc: Card, next: () => void) {
  if (doc.avatarImage) {
    const avatarPath = doc.avatarImage.split('/images/')[1];
    removeImage(avatarPath);
  }
  if (doc.coverImage) {
    const coverPath = doc.coverImage.split('/images/')[1];
    removeImage(coverPath);
  }
  if (next) {
    next();
  }
}

function handleSlug(this: Card, next: CallbackWithoutResultAndOptionalError) {
  if (!this.slug) {
    const fullName = `${this.firstName} ${this.lastName}`;
    this.slug = slugify(fullName, {
      lower: true,
      replacement: '-',
      strict: true,
    });
  } else {
    this.slug = slugify(this.slug, {
      lower: true,
      replacement: '-',
      strict: true,
    });
  }
  next();
}
export const cardsHooksFactory = () => {
  const schema = CardSchema;
  schema.pre(/^find/, populateFindQueries);
  schema.pre('validate', handleSlug);
  schema.post(/^find/, addImageUrlPrefixToAll);
  schema.post('save', addImageUrlPrefix);
  schema.post('findOneAndDelete', deleteCardImages);
  return schema;
};

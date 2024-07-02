import { contactTypeList } from '../constants/contactTypyList.js';

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = contactTypeList.includes(contactType);
  if (isContactType) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (!['true', 'false'].includes(isFavourite)) return;

  return Boolean(isFavourite);
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};

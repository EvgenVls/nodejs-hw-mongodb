import { ContactsCollection } from '../db/models/contacs.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = (payload) => {
  const contact = ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rowResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rowResult || !rowResult.value) return null;

  return { contact: rowResult.value };
};

export const deleteContact = (contactId) => {
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

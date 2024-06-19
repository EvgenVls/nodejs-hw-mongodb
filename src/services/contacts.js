import { ContactsCollection } from '../db/models/contacs.js';

export const getAllContacts = () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

export const getContactById = (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};

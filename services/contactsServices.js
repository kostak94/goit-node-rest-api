import Contact from "../model/Contact.js";

export function listContacts() {
  return Contact.find();
}

export function getOneContact(filter) {
  return Contact.findOne(filter);
}

export function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

export function addContact({ name, email, phone }) {
  return Contact.create({ name, email, phone });
}

export function updateContactById(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}

export function updateFavoriteStatus(filter, data) {
  return Contact.findByIdAndUpdate(filter, data);
}

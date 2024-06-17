import HttpError from "../helpers/HttpError.js";
import getFilterWithIdOwner from "../helpers/getFilterWithIdOwner.js";
import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const filter = {
      owner,
    };
    const data = await contactsServices.listContacts(filter);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const filter = getFilterWithIdOwner(req);
    const data = await contactsServices.getOneContact(filter);
    if (!data) {
      throw HttpError(404, `Contact with id = ${id} not found`);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const filter = getFilterWithIdOwner(req);
    const data = await contactsServices.removeContact(filter);
    if (!data) {
      throw HttpError(404, `Contact with id = ${id} not found`);
    }
    res.json({
      message: "contact was deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const data = await contactsServices.addContact({ ...req.body, owner });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const filter = getFilterWithIdOwner(req);

    const data = await contactsServices.updateContactById(filter, req.body);
    if (!data) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const filter = getFilterWithIdOwner(req);

    const data = await contactsServices.updateFavoriteStatus(filter, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

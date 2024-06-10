import HttpError from "../helpers/HttpError.js";
import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const data = await contactsServices.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactsServices.getOneContact({ _id: id });
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
    const { id } = req.params;
    const data = await contactsServices.removeContact({ _id: id });
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
    const data = await contactsServices.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactsServices.updateContactById(
      { _id: id },
      req.body
    );
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
    const { id } = req.params;
    const data = await contactsServices.updateFavoriteStatus(
      { _id: id },
      req.body
    );
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

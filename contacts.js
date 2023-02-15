const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const requiredContact = contacts.find(({ id }) => id === contactId);
    if (!requiredContact) {
      throw new Error(`No contact with ${contactId} ID`);
    }
    console.table(requiredContact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filterContacts = contacts.filter(({ id }) => id !== contactId);

    if (filterContacts.length === contacts.length) {
      throw new Error(`No contact with ${contactId} ID`);
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    const updatedFile = await fs.readFile(contactsPath);
    const updatedContacts = JSON.parse(updatedFile);
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContactsList = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    const updatedFile = await fs.readFile(contactsPath);
    const updatedContacts = JSON.parse(updatedFile);
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

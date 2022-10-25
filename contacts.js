const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

function listContacts() {
  const result = fs.readFileSync(contactsPath, "utf-8");
  return result;
}

function getContactById(contactId) {
  const arr = JSON.parse(listContacts());
  arr.map((el) => {
    if (JSON.parse(el.id) === contactId) {
      console.log(el);
      return el;
    }
  });
}

function removeContact(contactId) {
  const arr = JSON.parse(listContacts());
  const newArr = arr.filter((el) => JSON.parse(el.id) !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(newArr));
}

function addContact(name, email, phone) {
  const arr = JSON.parse(listContacts());
  arr.push({
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  });
  fs.writeFileSync(contactsPath, JSON.stringify(arr));
}

addContact("Thomas Lucas", "nec@Nulla.com", "(555) 555-3222");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

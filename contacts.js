const { table } = require("console");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function contscts() {
  const response = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(response);
  return result;
}

async function listContacts() {
  try {
    const response = await contscts();
    console.table(response);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const arr = await contscts();
    arr.forEach((el, i) => {
      if (el.id === contactId) {
        console.table(el);
        return;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const arr = await contscts();
    const newArr = arr.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newArr));
  } catch (error) {
    console.error(error.message);
  }
}

// removeContact("5");

async function addContact(name, email, phone) {
  try {
    const arr = await contscts();
    arr.push({
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    });
    fs.writeFile(contactsPath, JSON.stringify(arr));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

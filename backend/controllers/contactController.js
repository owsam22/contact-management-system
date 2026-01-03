import Contact from "../models/Contact.js";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          name: !name ? "Name is required" : undefined,
          email: !email ? "Email is required" : undefined,
          phone: !phone ? "Phone is required" : undefined
        }
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Validation error",
        errors: { email: "Email format is invalid" }
      });
    }

    const contact = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      message: message ? String(message).trim() : ""
    });

    return res.status(201).json(contact);
  } catch (err) {
    console.error("createContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted", id });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

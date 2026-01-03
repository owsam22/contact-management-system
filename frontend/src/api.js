const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getContacts = async () => {
  const res = await fetch(`${API_BASE}/api/contacts`);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
};

export const createContact = async (payload) => {
  const res = await fetch(`${API_BASE}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || "Failed to create contact");
    error.details = data;
    throw error;
  }

  return data;
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
    method: "DELETE"
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete contact");
  }

  return data;
};

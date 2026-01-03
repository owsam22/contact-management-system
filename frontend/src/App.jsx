import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { deleteContact, getContacts } from "./api";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAll = async () => {
    try {
      setListError("");
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setListError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreated = (created) => {
    setContacts((prev) => [created, ...prev]);
  };

  const handleDelete = async (id) => {
    // Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    const prev = contacts;
    setContacts((cur) => cur.filter((c) => c._id !== id));
    try {
      await deleteContact(id);
    } catch (err) {
      setContacts(prev);
      alert(err.message || "Delete failed");
    }
  };

  // Filter logic
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Manager</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Manage your professional network
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-1">
            <ContactForm onCreated={handleCreated} />
          </div>

          {/* Right: List */}
          <div className="lg:col-span-2">
            <ContactList
              contacts={filteredContacts}
              loading={loading}
              error={listError}
              onDelete={handleDelete}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6 border-t mt-8">
        Built with React + Express + MongoDB
      </footer>
    </div>
  );
}

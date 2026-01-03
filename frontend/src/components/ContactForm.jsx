import { useEffect, useMemo, useState } from "react";
import { createContact } from "../api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ onCreated }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const e = {};

    if (!values.name.trim()) e.name = "Name is required";

    if (!values.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(values.email.trim())) {
      e.email = "Please enter a valid email address";
    }

    if (!values.phone.trim()) e.phone = "Phone is required";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(""), 2500);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const handleChange = (e) => {
    setServerError("");
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const markAllTouched = () => {
    setTouched({ name: true, email: true, phone: true, message: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    markAllTouched();
    if (!isValid) return;

    try {
      setSubmitting(true);

      const created = await createContact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim()
      });

      onCreated(created);

      setValues({ name: "", email: "", phone: "", message: "" });
      setTouched({ name: false, email: false, phone: false, message: false });
      setSuccessMsg("Contact submitted successfully!");
    } catch (err) {
      setServerError(err?.details?.message || err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const showErr = (field) => touched[field] && errors[field];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>

      {successMsg ? (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3">
          {successMsg}
        </div>
      ) : null}

      {serverError ? (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3">
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 ${
              showErr("name") ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your name"
          />
          {showErr("name") ? (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 ${
              showErr("email") ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="me@example.com"
          />
          {showErr("email") ? (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 ${
              showErr("phone") ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="e.g. 9876543210 "
          />
          {showErr("phone") ? (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Optional message..."
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className={`w-full rounded-lg px-4 py-2 font-medium text-white transition ${
            !isValid || submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

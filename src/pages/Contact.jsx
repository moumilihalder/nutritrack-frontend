import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Have questions or feedback? Reach out to us at:
        <br />
        <strong>support@nutritrack.com</strong>
      </p>

      <Link
        to="/"
        className="mt-4 bg-green-100 text-green-700 px-5 py-2 rounded-lg hover:bg-green-200 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default Contact;

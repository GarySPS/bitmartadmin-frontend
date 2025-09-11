// src/components/AdminPasswordSettings.jsx
import React, { useState } from "react";
import axios from "axios";
import { ADMIN_API_BASE } from "../config";

export default function AdminPasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        `${ADMIN_API_BASE}/api/admin/change-password`,
        { currentPassword, newPassword }, // Now sends the current password
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Change Admin Password</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1e293b] border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1e293b] border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#1e293b] border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>

        {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md text-center">{error}</div>}
        {message && <div className="text-green-300 bg-green-900/50 p-3 rounded-md text-center">{message}</div>}

        <button
          type="submit"
          className="w-full h-11 rounded-xl font-extrabold text-lg tracking-wide text-slate-900 bg-yellow-400 hover:bg-yellow-300 transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
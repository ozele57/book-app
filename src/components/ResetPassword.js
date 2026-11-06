
import React, { useState } from "react";
import { apiRequest } from "../api";

export default function ResetPassword({ onReset, onBack }) {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await apiRequest("/api/auth/reset-password", {
        token,
        password,
      });

      alert(result.message || "Password reset successfully!");

      onReset();
    } catch (error) {
      alert(error.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="screen">
      <form
        className="reset-form reset-short"
        onSubmit={handleReset}
      >
        <h1>Reset password?</h1>

        <p>Enter your new password</p>

        <input
          className="plain"
          type="text"
          placeholder="Enter your reset token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <input
          className="plain"
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Reset password"}
        </button>

        <button
          type="button"
          className="text-button"
          onClick={onBack}
        >
          Back to login
        </button>
      </form>
    </section>
  );
}

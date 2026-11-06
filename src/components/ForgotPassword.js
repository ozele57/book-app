
import React from "react";

export default function ForgotPassword({
  email,
  setEmail,
  onSend,
  onBack,
}) {
  return (
    <section className="screen">
      

      <form
        className="reset-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <h1>Forgot password?</h1>

        <p>
          Enter your email address to reset your password
        </p>

        <input
          className="plain"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="primary" type="submit">
          Send link
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

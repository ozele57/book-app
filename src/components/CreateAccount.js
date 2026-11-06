
import React, { useState } from "react";
import { Mail, ShieldCheck, ChevronDown, Apple } from "lucide-react";
import { apiRequest } from "../api";

export default function CreateAccount({ onForgot, onContinue }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isRegister) {
        const result = await apiRequest("/api/auth/register", {
          name,
          email,
          password,
        });

        alert(result.message || "Account created successfully!");
        setIsRegister(false);
      } else {
        const result = await apiRequest("/api/auth/login", {
          email,
          password,
        });

        if (result.data?.accessToken) {
          localStorage.setItem("accessToken", result.data.accessToken);
        }

        if (result.data?.refreshToken) {
          localStorage.setItem("refreshToken", result.data.refreshToken);
        }

        onContinue();
      }
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="screen">
      <form className="create" onSubmit={handleSubmit}>
        <h1>{isRegister ? "Create your account" : "Create your account"}</h1>

        {isRegister && (
          <label className="field">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        )}

        <label className="field">
          <img
  src="/assets/Vector.svg"
  alt="Email"
  className="input-icon"
/>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <img
  src="/assets/Vector (1).svg"
  alt="Password"
  className="input-icon"
/>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="eye"
            onClick={() => setShow(!show)}
          >
            <img
  src="/assets/divine.svg"
  alt="Email"
  className="input-icon"
/>
          </button>
        </label>

        {!isRegister && (
          <button
            type="button"
            className="forgot"
            onClick={onForgot}
          >
            Forget password?
          </button>
        )}

        <button className="primary" type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isRegister
              ? "Create account"
              : "Continue"}
        </button>

        <p className="helper">
          {isRegister
            ? "Already have an account?"
            : "Don’t have an account yet?"}
        </p>

        <button
          type="button"
          className="white"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Log in" : "Create an account"}
        </button>

        {!isRegister && (
          <>
            <button
              type="button"
              className="white social"
              onClick={() =>
                alert("Apple sign-in is not connected to the API yet.")
              }
            >
              <Apple size={16} fill="currentColor" />
              Sign in with Apple
            </button>

            <button
              type="button"
              className="white social"
              onClick={() =>
                alert("Google sign-in is not connected to the API yet.")
              }
            >
              <b className="google">G</b>
              Sign in with Google
            </button>
          </>
        )}
      </form>
    </section>
  );
}
 
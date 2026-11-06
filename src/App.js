
import React, { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import BookHome from "./components/BookHome";
import ApiTest from "./components/ApiTest";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [email, setEmail] = useState("");

  return (
    <main>
      {/* API connection status */}
      <ApiTest />

      {screen === "login" && (
        <CreateAccount
          onForgot={() => setScreen("forgot")}
          onContinue={() => setScreen("home")}
        />
      )}

      {screen === "forgot" && (
        <ForgotPassword
          email={email}
          setEmail={setEmail}
          onSend={() => setScreen("reset")}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "reset" && (
        <ResetPassword
          email={email}
          setEmail={setEmail}
          onReset={() => setScreen("login")}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "home" && (
        <BookHome onLogout={() => setScreen("login")} />
      )}
    </main>
  );
}

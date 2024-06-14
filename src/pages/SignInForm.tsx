import React, { useState, ChangeEvent, FormEvent } from "react";

function SignInForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLogin(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5184/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Token:", data.token);
      console.log("Refresh Token:", data.refreshToken);
    } else {
      console.error("Login failed. Response status:", response.status);
    }
  };

  return (
    <section className="form-container">
      <picture className="hero__image-container">
        <img
          className="hero__image"
          src="src/assets/signinsignupimage.svg"
          alt=""
        />
      </picture>
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="login"
            placeholder="Login"
            maxLength={255}
            value={login}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={255}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="btn btn--accent btn--form" type="submit">
          Sign in
        </button>
        <p className="muted">Copyright &copy; 2024</p>
        <p className="signup-message">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </section>
  );
}

export default SignInForm;

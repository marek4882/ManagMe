function SignUpForm() {
  return (
    <section className="form-container">
      <picture className="hero__image-container">
        <img
          className="hero__image"
          src="src/assets/signinsignupimage.svg"
          alt=""
        />
      </picture>
      <form className="form-signin" action="" method="post">
        <h1>Sign Up</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            maxLength={255}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="surname"
            placeholder="Surname"
            maxLength={255}
            required
          />
        </div>
        <div className="form-group">
          <select className="form-control" name="role" id="role">
            <option value="Admin">Admin</option>
            <option value="Devops">Devops</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div className="form-group">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="btn btn--accent btn--form" type="submit">
          Sign up
        </button>
        <p className="muted">Copyright &copy; 2024</p>
        <p className="signup-message">
          Do you have an account? <a href="/login">Sign In</a>
        </p>
      </form>
    </section>
  );
}

export default SignUpForm;

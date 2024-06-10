
function SignInForm() {
  return (
    <section className="form-container">
        <picture className="hero__image-container">
            <img className="hero__image" src="src/assets/signinsignupimage.svg" alt="" />
        </picture>
      <form className="form-signin" action="" method="post">
        <h1>Please sign in</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email address"
            minLength={5}
            maxLength={255}
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            maxLength={255}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="btn btn--accent btn--form" type="submit">Sign in</button>
        <p className="muted">Copyright &copy; 2024</p>
      <p className="signup-message">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      </form>
    </section>
  );
}

export default SignInForm;

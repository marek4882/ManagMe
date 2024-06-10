import Button from "../components/Button";
import heroImage from "../assets/hero-image.svg"; 

function HomePage() {
  return (
    <>
      <section className="block hero">
        <div className="container grid grid--1x2">
          <header className="block__header hero__content">
            <h1 className="block__heading">Welcome To ManageMe</h1>
            <p className="hero__tagline">
              Your one-stop task, project and team management tool! With
              ManageMe, you can easily plan, track and coordinate all your tasks
              and projects in one place.
            </p>
            <p className="hero__tagline">
              Start your journey with ManageMe today and see how easy it is to
              manage your projects and tasks!
            </p>
            <Button></Button>
          </header>
          <picture className="hero__image-container">
            <img
              className="hero__image"
              src={heroImage}
              alt="Hero illustration"
            />
          </picture>
        </div>
      </section>
    </>
  );
}

export default HomePage;

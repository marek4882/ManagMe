import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import ProjectForm from "./pages/ProjectForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/project" element={<ProjectForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

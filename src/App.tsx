import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import ProjectForm from "./pages/ProjectForm";
import StoryForm from "./pages/StoryForm";
import TaskForm from "./pages/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/project" element={<ProjectForm />} />
        <Route path="/project/:projectId/story" element={<StoryForm />} />
        <Route path="/story/:storyId/task" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

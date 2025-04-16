import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Transition from "./components/Transition";
import Navbar from "./components/Navbar";
import ProjectPage from "./components/ProjectPage";
import NotFound from "./components/projects/NotFound";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="mask"></div>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={location.key} location={location}>
          <Route
            path="/projects"
            element={
              <>
                <Projects />
                <Transition />
              </>
            }
          ></Route>
          <Route
            path="/projects/:id"
            element={
              <>
                <ProjectPage />
                <Transition />
              </>
            }
          ></Route>
          <Route
            element={
              <>
                <Home /> <Transition />
              </>
            }
            path="/"
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

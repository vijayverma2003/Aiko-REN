import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import NotFound from "./components/common/NotFound";
import ProjectPage from "./components/projects/ProjectPage";
import Projects from "./components/projects/Projects";
import Transition from "./components/common/Transition";

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
                <Home />
                <Transition />
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

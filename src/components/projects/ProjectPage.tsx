import gsap from "gsap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import projects from "../../assets/data/projects.json";
import NotFound from "../common/NotFound";

const ProjectPage = () => {
  const params = useParams();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "auto";

    gsap.fromTo(
      "#project-page",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (!params.id || !parseInt(params.id)) return <NotFound />;

  const [project] = useState(projects[parseInt(params.id) - 1]);
  if (!project) return <NotFound />;

  return (
    <section id="project-page" className="my-24 px-8 container mx-auto">
      <div className="flex flex-col justify-center mx-auto">
        <h1 className="text-6xl my-8 font-bold">{project.title}</h1>
        <p className="text-2xl">{project.description}</p>
        <div className="flex gap-4 mt-6 mb-12 flex-wrap">
          {project.genre.map((genre) => (
            <span
              key={genre}
              className=" py-2 px-4 bg-gray-800 text-white rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        {project.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-3xl mt-8 mb-6 font-bold">{section.heading}</h2>
            <p className="text-2xl max-lg:text-black">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectPage;

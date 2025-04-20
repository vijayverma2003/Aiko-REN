import gsap, { Power3 } from "gsap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

import projects from "../../assets/data/projects.json";
import fragment from "../../assets/shaders/plane/fragment";
import vertex from "../../assets/shaders/plane/vertex";

function createMeshes(group: THREE.Group) {
  const textureLoader = new THREE.TextureLoader();
  const geometry = new THREE.PlaneGeometry(1.5, 1.5, 150, 150);
  const meshes: THREE.Mesh[] = [];
  const materials: THREE.ShaderMaterial[] = [];

  for (let i = 0; i < projects.length; i++) {
    const texture = textureLoader.load(`/project-images/${i + 1}.webp`);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTexture: { value: texture },
        uWheel: { value: 0 },
        uTime: { value: 0 },
        uDist: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -(i * 1.75);
    gsap.fromTo(
      mesh.position,
      { y: -5 },
      { y: -(i * 1.75), duration: 2, ease: "power3.out" }
    );

    meshes.push(mesh);
    materials.push(material);
    group.add(mesh);
  }

  return { meshes, materials };
}

const Projects = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById("three-canvas");

    gsap.fromTo(
      "#project-content",
      { y: 50, opacity: 0 },
      { opacity: 1.0, y: 0, ease: Power3.easeOut, duration: 2 }
    );

    if (!canvas) return;

    // Create Scene, Camera and Render Meshes

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1
    );
    camera.position.z = 2;

    const group = new THREE.Group();
    const { meshes, materials } = createMeshes(group);
    group.rotation.set(0, -Math.PI * 0.0, -0.04);
    group.position.x = 1;
    scene.add(group);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0.0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let speed = 0;
    let position = 0;
    let currentPosition = 0;
    let newAnimation: gsap.core.Tween;
    let startedAt = 0;
    let startY: number | null = null;
    let animationFrameId: number;

    const clock = new THREE.Clock();

    function animate() {
      position += speed;
      speed *= 0.8;

      const roundedPosition = Math.max(
        Math.min(meshes.length - 1, Math.round(position)),
        0
      );

      const diff = roundedPosition - position;

      position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.85) * 0.045;

      const elapsedTime = clock.getElapsedTime();

      camera.position.y = -position * 1.75;
      group.position.y = Math.sin(elapsedTime) * 0.1;

      meshes.forEach((mesh, index) => {
        let dist = Math.abs(position - index);

        materials[index].uniforms.uDist.value = dist;

        dist = -Math.pow(dist, 2);
        mesh.scale.set(1 + dist * 0.15, 1, 1);

        const indicator = document.querySelector(
          `#progress-indicator-${index}`
        ) as HTMLSpanElement;

        if (indicator)
          indicator.style.transform = `scale(${Math.max(0.4, 1 + dist * 0.3)})`;
      });

      materials.forEach((material) => {
        material.uniforms.uWheel.value = speed;
        material.uniforms.uTime.value = elapsedTime;
      });

      renderer.render(scene, camera);

      if (currentPosition !== roundedPosition) {
        setIndicatorIndex(roundedPosition);
        if (startedAt - Date.now() < 1000) newAnimation?.kill();

        let position = currentPosition;
        const animation = gsap.fromTo(
          "#project-content",
          { opacity: 1.0, y: 0 },
          {
            opacity: 0,
            y: position < roundedPosition ? -50 : 50,
            duration: 0.5,
            delay: 0.2,
            ease: Power3.easeOut,
            onComplete: () => {
              setProjectIndex(roundedPosition);
              gsap.fromTo(
                "#project-content",
                { opacity: 0, y: position < roundedPosition ? 50 : -50 },
                {
                  opacity: 1.0,
                  y: 0,
                  ease: Power3.easeOut,
                  duration: 0.5,
                }
              );
            },
          }
        );

        newAnimation = animation;
        startedAt = Date.now();
      }

      currentPosition = roundedPosition;
      animationFrameId = window.requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("wheel", function (e) {
      const speedChange = e.deltaY * 0.0009;
      const sign = Math.sign(speedChange);
      speed += Math.pow(Math.abs(speedChange), 0.95) * sign;
    });

    window.addEventListener("touchstart", function (e) {
      startY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", function (e) {
      if (startY === null) return;

      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;

      const speedChange = deltaY * 0.001;
      const sign = Math.sign(speedChange);
      speed += Math.pow(Math.abs(speedChange), 0.95) * sign;

      startY = currentY;
    });

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      renderer.dispose();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="h-screen w-full flex max-lg:flex-col max-lg:justify-start max-lg:my-24 items-center px-8 container mx-auto">
      <canvas
        id="three-canvas"
        className="h-screen w-full fixed top-0 left-0 -z-10 max-lg:hidden"
      ></canvas>

      <div className="progress-bar flex flex-col items-center justify-center gap-2 fixed right-24 max-lg:flex-row max-lg:relative max-lg:right-0 max-lg:mb-8">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div
              id={`progress-indicator-${index}`}
              key={index}
              className={`w-4 h-4 rounded-full bg-gray-400 transition-all duration-100 ease-in-out ${
                indicatorIndex === index ? "!bg-gray-600" : ""
              }`}
            ></div>
          ))}
      </div>
      <div
        id="project-content"
        className="flex flex-col gap-4 items-start z-10 max-lg:container max-lg:mx-auto max-lg:justify-center max-lg:items-center max-lg:max-w-lg"
      >
        <img
          src={`/project-images/${projects[projectIndex].id}.webp`}
          className="max-w-xs w-full min-lg:hidden"
        />
        <h1
          id="project-heading"
          className="text-8xl font-bold max-w-xl  max-lg:text-2xl max-lg:text-center"
        >
          {projects[projectIndex].title}
        </h1>
        <p
          id="project-description"
          className="text-2xl font-medium max-w-lg max-lg:text-center max-lg:text-sm max-lg:text-black"
        >
          {projects[projectIndex].description}
        </p>
        <Link
          to={`/projects/${projects[projectIndex].id}`}
          id="project-button"
          className="btn font-bold"
        >
          Read More
        </Link>
        <p className="animate-pulse min-lg:hidden m-0">Scroll down</p>
      </div>
    </div>
  );
};

export default Projects;

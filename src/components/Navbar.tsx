import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-full container m-auto flex justify-between items-center px-4 py-2 z-[100]">
      <div>
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          AIKO
        </Link>
      </div>
      <div className="flex gap-8">
        <Link to="/projects" className="btn">
          WORK
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

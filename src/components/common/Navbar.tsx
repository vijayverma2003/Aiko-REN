import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const regex = /^\/projects\/[^/]+$/;

  return (
    <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-full container m-auto flex justify-between items-center px-8 py-2 z-[100]">
      <div>
        {location.pathname !== "/" && (
          <Link
            id="home-link"
            to="/"
            className="text-2xl font-bold cursor-pointer"
          >
            <img src="/logo.webp" alt="Aiko ren" className="w-16 h-16" />
          </Link>
        )}
      </div>
      <div>
        {regex.test(location.pathname) && (
          <button
            onClick={goBack}
            className="text-2xl font-bold cursor-pointer"
          >
            Back
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

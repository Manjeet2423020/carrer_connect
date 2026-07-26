import { NavLink, Link } from "react-router-dom";
import { FiBookmark, FiBell, FiMapPin, FiSettings } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import SalarySlider from "../SalarySlider/SalarySlider";

const Navbar = ({ searchVal, onSearchChange, salaryVal, onSalaryChange }) => {
  // Navigation links helper
  const navLinks = [
    { name: "Find Job", path: "/find-job" },
    { name: "Messages", path: "/messages" },
    { name: "Hiring", path: "/hiring" },
    { name: "Community", path: "/community" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className="w-full bg-[#151515] h-[90px] rounded-[28px] px-8 flex items-center justify-between text-white shadow-xl select-none">
      {/* Left Section: Logo & Nav Links */}
      <div className="flex items-center space-x-8">
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-xl font-bold tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-[#56A8FF] flex items-center justify-center text-black font-extrabold text-sm">
            L
          </span>
          <span className="text-white">
            Lucky<span className="text-[#56A8FF]">Job</span>
          </span>
        </NavLink>

        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#56A8FF]"
                    : "text-[#8C8C8C] hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex flex-1 justify-center max-w-sm lg:max-w-md mx-4">
        <Link to="/search" className="w-full">
          <SearchBar value={searchVal} onChange={onSearchChange} />
        </Link>
      </div>

      {/* Right Section: Location, Salary, Actions & Avatar */}
      <div className="flex items-center space-x-6">
        {/* Location Display */}
        <div className="hidden lg:flex items-center space-x-2 text-[#8C8C8C]">
          <FiMapPin className="text-lg text-[#56A8FF]" />
          <span className="text-sm font-medium text-white">New York, NY</span>
        </div>

        {/* Salary Range Filter */}
        <div className="hidden sm:block border-l border-neutral-800 pl-6 pr-2">
          <SalarySlider value={salaryVal} onChange={onSalaryChange} />
        </div>

        {/* Buttons and Avatar Container */}
        <div className="flex items-center space-x-3 border-l border-neutral-800 pl-6">
          <NavLink
            to="/saved-jobs"
            title="Bookmarks"
            className={({ isActive }) =>
              `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative cursor-pointer ${
                isActive
                  ? "bg-[#56A8FF] text-black"
                  : "bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828]"
              }`
            }
          >
            <FiBookmark className="text-lg" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#56A8FF] rounded-full"></span>
          </NavLink>

          <NavLink
            to="/settings"
            title="Settings"
            className={({ isActive }) =>
              `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#56A8FF] text-black"
                  : "bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828]"
              }`
            }
          >
            <FiSettings className="text-lg" />
          </NavLink>

          <NavLink
            to="/notifications"
            title="Notifications"
            className={({ isActive }) =>
              `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative cursor-pointer ${
                isActive
                  ? "bg-[#56A8FF] text-black"
                  : "bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828]"
              }`
            }
          >
            <FiBell className="text-lg" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#151515] rounded-full"></span>
          </NavLink>

          {/* User Avatar */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `w-11 h-11 rounded-full overflow-hidden border bg-neutral-800 cursor-pointer transition-colors duration-200 ml-1 ${
                isActive ? "border-[#56A8FF]" : "border-neutral-700 hover:border-[#56A8FF]"
              }`
            }
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

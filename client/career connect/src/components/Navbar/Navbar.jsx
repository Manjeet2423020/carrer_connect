import { NavLink, Link } from "react-router-dom";
import { FiBookmark, FiBell, FiMapPin, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserThunk } from "../../redux/authSlice";
import SearchBar from "../SearchBar/SearchBar";
import SalarySlider from "../SalarySlider/SalarySlider";

const Navbar = ({ searchVal, onSearchChange, salaryVal, onSalaryChange }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

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
            C
          </span>
          <span className="text-white">
            Career<span className="text-[#56A8FF]">Connect</span>
          </span>
        </NavLink>

        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${isActive
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
        <Link to="/find-job" className="w-full">
          <SearchBar value={searchVal} onChange={onSearchChange} />
        </Link>
      </div>

      {/* Right Section: Location, Actions & User Controls */}
      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-2 text-[#8C8C8C]">
          <FiMapPin className="text-lg text-[#56A8FF]" />
          <span className="text-sm font-medium text-white">India</span>
        </div>

        {/* Dynamic Auth Section */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-4 border-l border-neutral-800 pl-6">
            <NavLink
              to="/saved-jobs"
              title="Bookmarks"
              className="w-10 h-10 rounded-full bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828] flex items-center justify-center transition-all"
            >
              <FiBookmark className="text-lg" />
            </NavLink>

            {/* Logged in User Profile Info */}
            <Link to="/profile" className="flex items-center space-x-3 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 hover:border-[#56A8FF] transition">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
              </div>
              <span className="text-sm font-medium text-gray-200 pr-1">{user?.name?.split(' ')[0]}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <FiLogOut className="text-lg" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3 border-l border-neutral-800 pl-6">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium bg-[#56A8FF] text-black font-semibold rounded-lg hover:bg-blue-400 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

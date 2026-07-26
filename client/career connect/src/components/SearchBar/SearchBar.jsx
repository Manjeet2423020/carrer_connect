import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <FiSearch className="text-brand-muted text-lg" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Start typing your job search request"
        className="w-full bg-[#202020] text-white placeholder-brand-muted text-sm pl-12 pr-6 py-3.5 rounded-full outline-none border border-transparent focus:border-brand-blue/30 focus:bg-[#252525] transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;

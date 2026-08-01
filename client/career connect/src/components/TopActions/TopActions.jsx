import { FiChevronDown, FiSliders } from "react-icons/fi";

const TopActions = ({
  sortBy = "Last Updated",

  onToggleSidebar,
}) => {
  return (
    <div className="flex items-center justify-between w-full select-none py-2">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#202020] tracking-tight">
        Popular Jobs
      </h1>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-full border border-neutral-100 shadow-sm cursor-pointer hover:border-neutral-200 transition-colors duration-150">
          <span className="text-xs text-[#8C8C8C] font-medium">Sort by:</span>
          <span className="text-xs text-[#202020] font-semibold flex items-center gap-1">
            {sortBy}
            <FiChevronDown className="text-neutral-500 text-sm mt-0.5" />
          </span>
        </div>

        {/* Filter Toggle Button (Visible on mobile/tablet to toggle sidebar visibility) */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-[#202020] hover:text-[#56A8FF] shadow-sm hover:border-neutral-200 active:scale-95 transition-all duration-150 cursor-pointer"
          title="Toggle Filters"
        >
          <FiSliders className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default TopActions;

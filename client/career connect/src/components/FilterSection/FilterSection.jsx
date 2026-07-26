const FilterSection = ({ title, options, selectedValues = [], onChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-base font-bold text-[#202020] tracking-tight">
        {title}
      </h3>
      <div className="flex flex-col space-y-3">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          return (
            <label
              key={option.value}
              className="flex items-center gap-3.5 cursor-pointer select-none group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChange(option.value)}
                  className="sr-only peer"
                />
                {/* Custom round checkbox */}
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center peer-checked:bg-[#56A8FF] peer-checked:border-[#56A8FF] group-hover:border-[#56A8FF]/60 transition-all duration-200">
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              <span className="text-sm font-semibold text-[#202020]/90 group-hover:text-black transition-colors duration-150">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;

const SalarySlider = ({
  value = 500000,
  min = 1200,
  max = 500000,
  onChange,
}) => {
  const formatCurrency = (val) => {
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}k`;
    }
    return `$${val}`;
  };

  // Custom text representation of full range
  const displayRange = `$1200 - $${Number(value).toLocaleString()}`;

  return (
    <div className="flex flex-col space-y-1.5 w-44 lg:w-48 select-none">
      <div className="flex justify-between items-center text-xs">
        <span className="text-brand-muted font-medium">Salary Range</span>
        <span className="text-[#56A8FF] font-semibold">{displayRange}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        className="w-full h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-[#56A8FF] outline-none"
      />
    </div>
  );
};

export default SalarySlider;

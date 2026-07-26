import FilterSection from "../FilterSection/FilterSection";

const Sidebar = ({
  workingSchedule = [],
  setWorkingSchedule,
  employmentType = [],
  setEmploymentType,
}) => {
  const scheduleOptions = [
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
    { label: "Internship", value: "internship" },
    { label: "Project Work", value: "project-work" },
    { label: "Volunteering", value: "volunteering" },
  ];

  const typeOptions = [
    { label: "Full Day", value: "full-day" },
    { label: "Flexible Schedule", value: "flexible" },
    { label: "Shift Work", value: "shift-work" },
    { label: "Remote Work", value: "remote" },
    { label: "Shift Method", value: "shift-method" },
  ];

  const handleScheduleChange = (value) => {
    if (workingSchedule.includes(value)) {
      setWorkingSchedule(workingSchedule.filter((v) => v !== value));
    } else {
      setWorkingSchedule([...workingSchedule, value]);
    }
  };

  const handleTypeChange = (value) => {
    if (employmentType.includes(value)) {
      setEmploymentType(employmentType.filter((v) => v !== value));
    } else {
      setEmploymentType([...employmentType, value]);
    }
  };

  return (
    <aside className="w-full bg-white rounded-[24px] p-6 shadow-sm border border-neutral-100 flex flex-col space-y-8 select-none">
      {/* Advertisement Card */}
      <div className="relative rounded-[24px] p-6 bg-gradient-to-br from-[#222] to-[#0f0f0f] overflow-hidden text-white flex flex-col justify-between min-h-[220px]">
        {/* Glowing visual blobs for premium UI */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#56A8FF]/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#56A8FF]/5 rounded-full blur-lg pointer-events-none"></div>

        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
          <h2 className="text-xl font-bold leading-snug tracking-tight text-white">
            Get Your Best Profession with LuckyJob
          </h2>
          <button className="w-fit bg-[#56A8FF] hover:bg-[#56A8FF]/90 hover:scale-105 active:scale-95 text-black font-semibold px-6 py-2.5 rounded-full text-xs shadow-md transition-all duration-200 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col space-y-6 px-1">
        <FilterSection
          title="Working Schedule"
          options={scheduleOptions}
          selectedValues={workingSchedule}
          onChange={handleScheduleChange}
        />

        <div className="border-b border-neutral-100 pt-2"></div>

        <FilterSection
          title="Employment Type"
          options={typeOptions}
          selectedValues={employmentType}
          onChange={handleTypeChange}
        />
      </div>
    </aside>
  );
};

export default Sidebar;

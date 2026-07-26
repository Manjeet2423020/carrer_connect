const CompanyTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    "Overview",
    "Activities",
    "Jobs",
    "Employees",
    "Reviews",
    "Gallery",
    "Contact",
  ];

  return (
    <div className="w-full bg-white rounded-full p-2 border border-neutral-100 flex items-center overflow-x-auto space-x-2 scrollbar-none select-none mb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`text-xs font-bold px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-[#56A8FF] text-white shadow-sm"
                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default CompanyTabs;

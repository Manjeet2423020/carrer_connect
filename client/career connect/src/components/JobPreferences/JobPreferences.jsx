import React from "react";
import { FiEdit3 } from "react-icons/fi";

const JobPreferences = ({ job }) => {
  const preferences = [
    { label: "Preferred Gender", value: job.prefGender || "Any" },
    { label: "Education Level", value: job.education || "Bachelor's Degree" },
    { label: "Experience Level", value: job.experienceRequired || "3-5 Yrs" },
    { label: "Nationality", value: job.prefNationality || "Any / Global" },
    { label: "Age Limit", value: job.prefAge || "22-45 Years" },
    { label: "Languages Required", value: job.prefLanguages || "English (Fluent)" },
    { label: "Employment Type", value: job.schedule || "Full Time" },
    { label: "Work Location Mode", value: job.type || "Remote" },
    { label: "Salary Type", value: job.salaryType || "Yearly Range" },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[#202020]">Candidate Preferences</h2>
        <button
          className="w-9 h-9 rounded-full bg-[#F5F6F8] text-[#8C8C8C] hover:text-black hover:bg-neutral-200 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-transparent"
          title="Edit Preferences"
        >
          <FiEdit3 className="text-sm" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {preferences.map((pref, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[18px] bg-[#F5F6F8] border border-neutral-100/50 hover:bg-[#E8F4FF]/50 transition-colors duration-200"
          >
            <span className="text-[11px] font-semibold text-[#8C8C8C] uppercase tracking-wider block">
              {pref.label}
            </span>
            <span className="text-sm font-bold text-[#202020] mt-1 block">
              {pref.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPreferences;

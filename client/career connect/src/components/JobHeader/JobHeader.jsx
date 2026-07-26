import React, { useState } from "react";
import {
  FiBriefcase,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiBookmark,
  FiShare2,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";

const JobHeader = ({ job, onApply, onSave, onPrev, onNext }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSaved, setIsSaved] = useState(job.isBookmarked || false);
  const [isFavorite, setIsFavorite] = useState(false);

  const tabs = ["Overview", "Information", "Activity", "Applicants", "Company"];

  return (
    <div className="w-full bg-[#151515] rounded-[28px] p-6 sm:p-8 text-white shadow-xl select-none mb-8">
      {/* Top Breadcrumb / Prev-Next Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-6 mb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C8C8C]">
          <span>Dashboard</span>
          <span>/</span>
          <span>Jobs</span>
          <span>/</span>
          <span className="text-[#56A8FF]">{job.title}</span>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full bg-[#202020] flex items-center justify-center text-[#8C8C8C] hover:text-white hover:bg-[#282828] transition-all duration-200 cursor-pointer active:scale-95"
            title="Previous Job"
          >
            <FiChevronLeft className="text-lg" />
          </button>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full bg-[#202020] flex items-center justify-center text-[#8C8C8C] hover:text-white hover:bg-[#282828] transition-all duration-200 cursor-pointer active:scale-95"
            title="Next Job"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Main Title & Action Buttons Section */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-6">
        {/* Title & Metadata */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <span className="inline-block text-xs font-extrabold tracking-wider text-black bg-[#56A8FF] px-3.5 py-1.5 rounded-full uppercase">
              {job.company}
            </span>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {job.title}
            </h1>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:flex xl:flex-wrap gap-4 text-xs font-semibold text-[#8C8C8C] pt-2">
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <span className="font-extrabold text-[10px]">ID</span>
              </span>
              <span>ID: #{job.id || "10284"}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <FiBriefcase />
              </span>
              <span>{job.schedule || "Full Time"}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <FiMapPin />
              </span>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <FiUsers />
              </span>
              <span>{job.openPositions || "2"} Openings</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <FiCalendar />
              </span>
              <span>Posted: {job.date}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#202020] flex items-center justify-center text-[#56A8FF]">
                <FiAward />
              </span>
              <span>Exp: {job.experienceRequired || "3-5 Yrs"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setIsSaved(!isSaved);
              if (onSave) onSave(!isSaved);
            }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
              isSaved
                ? "bg-[#56A8FF] text-black"
                : "bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828]"
            }`}
            title="Save Job"
          >
            <FiBookmark className="text-lg" />
          </button>
          <button
            className="w-11 h-11 rounded-full bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            title="Share Job"
          >
            <FiShare2 className="text-lg" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-[#202020] text-[#8C8C8C] hover:text-red-400 hover:bg-[#282828]"
            }`}
            title="Favorite"
          >
            <FiHeart className="text-lg" />
          </button>
          <button
            className="w-11 h-11 rounded-full bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-neutral-800"
            title="Edit Details"
          >
            <FiEdit3 className="text-lg" />
          </button>
          <button
            onClick={onApply}
            className="bg-[#56A8FF] hover:bg-[#56A8FF]/90 text-black text-sm font-extrabold px-7 py-3 rounded-full transition-all duration-200 shadow-lg cursor-pointer active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto space-x-8 border-t border-neutral-800 mt-8 pt-4 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-bold pb-2 relative transition-colors duration-200 whitespace-nowrap cursor-pointer ${
              activeTab === tab ? "text-[#56A8FF]" : "text-[#8C8C8C] hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#56A8FF] rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobHeader;

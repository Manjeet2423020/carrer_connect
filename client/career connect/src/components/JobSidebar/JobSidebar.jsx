import React, { useState } from "react";
import { FiCalendar, FiClock, FiGlobe, FiAward, FiStar } from "react-icons/fi";
import JobInformation from "../JobInformation/JobInformation";
import HiringTeam from "../HiringTeam/HiringTeam";
import JobStatistics from "../JobStatistics/JobStatistics";

const JobSidebar = ({ job }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Application Timeline mock data
  const publishedDate = job.date || "25 May, 2026";
  const closingDate = job.closingDate || "25 June, 2026";
  const daysRemaining = job.daysRemaining || 14;
  const progressPercent = Math.min(100, Math.max(0, ((30 - daysRemaining) / 30) * 100));

  return (
    <aside className="w-full space-y-6">
      {/* CARD 1: Application Timeline */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
        <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
          <span>Application Timeline</span>
          <FiClock className="text-[#56A8FF]" />
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8C8C8C] font-semibold">Published Date</span>
            <span className="text-[#202020] font-bold">{publishedDate}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8C8C8C] font-semibold">Closing Date</span>
            <span className="text-[#202020] font-bold">{closingDate}</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#56A8FF] rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#8C8C8C]">Progress</span>
              <span className="text-[#56A8FF]">{daysRemaining} Days Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Job Information */}
      <JobInformation job={job} />

      {/* CARD 3: Analytics */}
      <JobStatistics />

      {/* CARD 4: Recruiter Team */}
      <HiringTeam />

      {/* CARD 5: Company Information */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
        <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
          Company Information
        </h3>

        <div className="space-y-5">
          {/* Logo & Rating Header */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-[16px] bg-[#F5F6F8] flex items-center justify-center shadow-xs overflow-hidden shrink-0 border border-neutral-100">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-[#202020] font-extrabold text-lg">
                  {job.company ? job.company[0] : "C"}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202020] leading-snug">
                {job.company}
              </h4>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <FiStar className="text-amber-400 fill-amber-400 text-xs mt-[-1px]" />
                <span className="text-xs font-bold text-[#202020]">
                  {job.companyRating || "4.8"}
                </span>
                <span className="text-[10px] font-semibold text-[#8C8C8C]">
                  ({job.companyReviews || "142"} Reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2.5 text-xs border-t border-b border-neutral-100/60 py-3.5">
            <div className="flex justify-between items-center">
              <span className="text-[#8C8C8C] font-semibold">Founded</span>
              <span className="text-[#202020] font-bold">
                {job.companyFounded || "2015"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8C8C8C] font-semibold">Employees</span>
              <span className="text-[#202020] font-bold">
                {job.companySize || "100-500 Employees"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8C8C8C] font-semibold">Industry</span>
              <span className="text-[#202020] font-bold">
                {job.industry || "Software & Tech"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8C8C8C] font-semibold">Website</span>
              <a
                href={job.companyWebsite || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-[#56A8FF] hover:underline flex items-center gap-1 font-bold"
              >
                {job.companyWebsite ? "Visit Website" : "luckyjob.com"}
                <FiGlobe className="text-[10px]" />
              </a>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`w-full py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 text-center ${
              isFollowing
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                : "bg-black hover:bg-neutral-800 text-white shadow-sm"
            }`}
          >
            {isFollowing ? "Following" : "Follow Company"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default JobSidebar;

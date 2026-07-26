import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiBookmark, FiMapPin, FiBriefcase, FiAward, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

const CompanyJobs = ({ company, jobs = [] }) => {
  const [bookmarkedList, setBookmarkedList] = useState({});

  const toggleBookmark = (id) => {
    setBookmarkedList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApply = (title) => {
    alert(`Your application for the ${title} position has been successfully submitted!`);
  };

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none">
      <h2 className="text-lg font-bold text-[#202020] mb-6">Open Positions</h2>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => {
            const isSaved = bookmarkedList[job.id] || false;
            return (
              <div
                key={job.id}
                className="p-5 rounded-[20px] bg-[#F5F6F8] hover:bg-[#E8F4FF]/30 border border-neutral-100/60 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-300 group"
              >
                {/* Left: Job Info */}
                <div className="flex-1 space-y-3.5">
                  <div className="flex items-start justify-between md:justify-start md:items-center gap-3">
                    <h3 className="text-base font-extrabold text-[#202020] group-hover:text-[#56A8FF] transition-colors duration-150">
                      {job.title}
                    </h3>
                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className="md:hidden w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs text-neutral-500 hover:text-black cursor-pointer"
                    >
                      {isSaved ? (
                        <FaBookmark className="text-xs text-[#56A8FF]" />
                      ) : (
                        <FiBookmark className="text-xs" />
                      )}
                    </button>
                  </div>

                  {/* Metadata Chips Grid */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-neutral-500">
                    <div className="flex items-center space-x-1.5">
                      <FiBriefcase className="text-[#56A8FF]" />
                      <span>{job.schedule || "Full Time"}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiAward className="text-[#56A8FF]" />
                      <span>{job.experienceRequired || "3-5 Years"}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiDollarSign className="text-[#56A8FF]" />
                      <span>{job.salary || "$120,000/Yr"}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiMapPin className="text-[#56A8FF]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiCalendar className="text-[#56A8FF]" />
                      <span>Posted: {job.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => toggleBookmark(job.id)}
                    className="hidden md:flex w-10 h-10 rounded-full bg-white items-center justify-center shadow-xs text-neutral-500 hover:text-black transition-all duration-200 cursor-pointer active:scale-90 border border-neutral-100"
                    title="Bookmark Job"
                  >
                    {isSaved ? (
                      <FaBookmark className="text-sm text-[#56A8FF]" />
                    ) : (
                      <FiBookmark className="text-sm" />
                    )}
                  </button>
                  
                  <Link
                    to={`/jobs/${job.id}`}
                    className="bg-white border border-neutral-200 hover:border-neutral-300 text-xs font-bold py-3 px-5 rounded-full transition-all duration-200 cursor-pointer active:scale-95 text-center"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleApply(job.title)}
                    className="bg-black hover:bg-neutral-800 text-white text-xs font-bold py-3 px-5 rounded-full shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="text-2xl mb-2">🔍</span>
          <span className="text-xs font-bold text-neutral-500">No active positions posted.</span>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;

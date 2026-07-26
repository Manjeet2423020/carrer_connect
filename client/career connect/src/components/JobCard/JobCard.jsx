import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBookmark, FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

const JobCard = ({ job }) => {
  const [bookmarked, setBookmarked] = useState(job.isBookmarked || false);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  return (
    <div
      className={`relative p-6 rounded-[24px] ${job.cardBg} flex flex-col justify-between h-full hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 ease-out group select-none cursor-pointer border border-[#202020]/5`}
    >
      <div>
        {/* Top Date & Bookmark */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-[#202020] bg-white/70 px-3.5 py-1.5 rounded-full border border-white/40 shadow-2xs">
            {job.date}
          </span>
          <button
            onClick={toggleBookmark}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-500 hover:text-black shadow-sm active:scale-90 transition-all duration-200 cursor-pointer"
          >
            {bookmarked ? (
              <FaBookmark className="text-sm text-[#56A8FF]" />
            ) : (
              <FiBookmark className="text-sm" />
            )}
          </button>
        </div>

        {/* Company & Job info */}
        <div className="flex items-center space-x-3.5 mb-5">
          <Link
            to={`/company/${job.id}`}
            className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-xs overflow-hidden shrink-0"
          >
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-[#202020] font-extrabold text-lg">
                {job.company[0]}
              </span>
            )}
          </Link>
          <div>
            <h4 className="text-[11px] font-semibold text-[#8C8C8C] tracking-wider uppercase">
              {job.company}
            </h4>
            <h3 className="text-base font-bold text-[#202020] leading-snug group-hover:text-black transition-colors duration-150 mt-0.5">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[11px] font-semibold text-[#202020] bg-white/50 px-3 py-1 rounded-full border border-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer (Salary, Location & Button) */}
      <div className="flex items-center justify-between border-t border-[#202020]/5 pt-5 mt-auto">
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#202020]">
            {job.salary}
          </span>
          <span className="text-[11px] font-semibold text-[#8C8C8C] flex items-center gap-1 mt-0.5">
            <FiMapPin className="text-[#56A8FF]" /> {job.location}
          </span>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="bg-black hover:bg-neutral-800 text-white text-xs font-bold py-3 px-5 rounded-full shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

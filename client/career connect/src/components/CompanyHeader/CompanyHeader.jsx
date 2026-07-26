import React, { useState } from "react";
import {
  FiCheck,
  FiStar,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiGlobe,
  FiHeart,
  FiShare2,
} from "react-icons/fi";

const CompanyHeader = ({ company }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="w-full bg-[#151515] rounded-[28px] p-6 sm:p-8 text-white shadow-xl select-none mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-[#8C8C8C] border-b border-neutral-800 pb-5 mb-6">
        <span>Home</span>
        <span>/</span>
        <span>Companies</span>
        <span>/</span>
        <span className="text-[#56A8FF]">{company.name}</span>
      </div>

      {/* Main Info Section */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-6">
        {/* Left: Logo and Name */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 flex-1">
          {/* Logo Container */}
          <div className="w-20 h-20 rounded-[24px] bg-white flex items-center justify-center shadow-xs overflow-hidden shrink-0 border border-neutral-800">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <span className="text-[#202020] font-extrabold text-3xl">
                {company.name[0]}
              </span>
            )}
          </div>

          {/* Texts & Badges */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {company.name}
              </h1>
              {company.isVerified && (
                <span className="w-5 h-5 rounded-full bg-[#56A8FF] flex items-center justify-center text-black font-extrabold text-[10px]" title="Verified Company">
                  <FiCheck strokeWidth={4} />
                </span>
              )}
              <div className="flex items-center space-x-1 bg-[#202020] px-2.5 py-1 rounded-full text-xs font-bold text-amber-400">
                <FiStar className="fill-amber-400 text-xs" />
                <span>{company.rating || "4.8"}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[#8C8C8C]">
              <div className="flex items-center space-x-2">
                <FiMapPin className="text-[#56A8FF] text-sm shrink-0" />
                <span>{company.location || "San Francisco, CA"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUsers className="text-[#56A8FF] text-sm shrink-0" />
                <span>{company.followersCount || "15k"} Followers</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-[#56A8FF] text-sm shrink-0" />
                <span>Founded {company.founded || "2010"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiGlobe className="text-[#56A8FF] text-sm shrink-0" />
                <a
                  href={company.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-white transition-colors duration-150"
                >
                  {company.websiteDisplay || "company.com"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border ${
              isFavorite
                ? "bg-red-500 border-transparent text-white"
                : "bg-[#202020] border-neutral-800 text-[#8C8C8C] hover:text-red-400 hover:bg-[#282828]"
            }`}
            title="Save Company"
          >
            <FiHeart className="text-lg" />
          </button>
          <button
            className="w-11 h-11 rounded-full bg-[#202020] text-[#8C8C8C] hover:text-white hover:bg-[#282828] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-neutral-800"
            title="Share Profile"
          >
            <FiShare2 className="text-lg" />
          </button>
          <a
            href={company.website || "#"}
            target="_blank"
            rel="noreferrer"
            className="bg-[#202020] border border-neutral-800 text-xs font-bold px-5 py-3 rounded-full hover:bg-[#282828] hover:text-white transition-all duration-200 cursor-pointer active:scale-95 block text-center"
          >
            Visit Website
          </a>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`text-xs font-extrabold px-6 py-3 rounded-full transition-all duration-200 shadow-lg cursor-pointer active:scale-95 ${
              isFollowing
                ? "bg-[#202020] hover:bg-[#252525] text-white border border-neutral-800"
                : "bg-[#56A8FF] hover:bg-[#56A8FF]/90 text-black"
            }`}
          >
            {isFollowing ? "Following" : "Follow Company"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;

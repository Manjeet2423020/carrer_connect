import React, { useState } from "react";
import {
  FiGrid,
  FiTrendingUp,
  FiMessageSquare,
  FiUser,
  FiExternalLink,
  FiFlag,
  FiShare2,
  FiHeart,
  FiBriefcase,
  FiUsers,
  FiStar,
  FiDollarSign,
  FiPercent,
} from "react-icons/fi";
import ContactCard from "../ContactCard/ContactCard";

const CompanySidebar = ({ company }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const recruiters = [
    {
      name: "Sarah Jenkins",
      role: "Lead Tech Recruiter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      status: "Online",
    },
    {
      name: "David Chen",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      status: "Away",
    },
  ];

  const handleShare = () => {
    alert("Profile share link copied to clipboard!");
  };

  const handleReport = () => {
    alert("Thank you. A report ticket has been generated for review.");
  };

  return (
    <aside className="w-full space-y-6 select-none">
      {/* CARD 1: Company Statistics */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
          Company Statistics
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiBriefcase className="text-[#56A8FF]" /> Active Jobs
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.activeJobsCount || "3"} Jobs
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiUsers className="text-[#56A8FF]" /> Employees
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.companySize || "100-500"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiUsers className="text-[#56A8FF]" /> Followers
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.followersCount || "15k"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiStar className="text-[#56A8FF]" /> Rating
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.rating || "4.8"} / 5.0
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiPercent className="text-[#56A8FF]" /> Hiring Success
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.hiringSuccess || "94%"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8C8C] flex items-center gap-2">
              <FiDollarSign className="text-[#56A8FF]" /> Average Salary
            </span>
            <span className="text-xs font-extrabold text-[#202020]">
              {company.avgSalary || "$115,000/Yr"}
            </span>
          </div>
        </div>
      </div>

      {/* CARD 2: Quick Actions */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs space-y-3">
        <button
          onClick={() => alert(`Applied to general candidate pool for ${company.name}!`)}
          className="w-full py-3.5 rounded-full bg-[#56A8FF] hover:bg-[#56A8FF]/90 text-black text-xs font-extrabold shadow-sm transition-all duration-200 cursor-pointer active:scale-95 text-center block"
        >
          Apply to Pool
        </button>
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`w-full py-3.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
            isFollowing
              ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200"
              : "bg-black hover:bg-neutral-800 text-white shadow-sm"
          }`}
        >
          <FiHeart className={isFollowing ? "fill-red-500 text-red-500" : ""} />
          <span>{isFollowing ? "Following" : "Follow Company"}</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleShare}
            className="py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border border-neutral-200"
          >
            <FiShare2 />
            <span>Share</span>
          </button>
          <a
            href={company.website || "#"}
            target="_blank"
            rel="noreferrer"
            className="py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border border-neutral-200 block text-center"
          >
            <FiExternalLink />
            <span>Website</span>
          </a>
        </div>

        <button
          onClick={handleReport}
          className="w-full py-3 rounded-full bg-red-50/50 hover:bg-red-50 text-red-600 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border border-red-100/50 mt-1"
        >
          <FiFlag />
          <span>Report Company</span>
        </button>
      </div>

      {/* CARD 3: Hiring Team */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
          Hiring Team
        </h3>
        <div className="space-y-5">
          {recruiters.map((rec, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                    <img
                      src={rec.avatar}
                      alt={rec.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border border-white rounded-full ${
                    rec.status === "Online" ? "bg-green-500" : "bg-amber-400"
                  }`}></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#202020]">
                    {rec.name}
                  </span>
                  <span className="text-[10px] font-semibold text-[#8C8C8C] tracking-wide">
                    {rec.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => alert(`Opened messaging portal with ${rec.name}.`)}
                  className="w-8 h-8 rounded-full bg-[#F5F6F8] hover:bg-[#E8F4FF] text-neutral-600 hover:text-[#56A8FF] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                  title="Message"
                >
                  <FiMessageSquare className="text-sm" />
                </button>
                <button
                  onClick={() => alert(`Viewing recruiter profile...`)}
                  className="w-8 h-8 rounded-full bg-[#F5F6F8] hover:bg-[#E8F4FF] text-neutral-600 hover:text-[#56A8FF] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                  title="View Profile"
                >
                  <FiUser className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 4: Contact Information */}
      <ContactCard company={company} />
    </aside>
  );
};

export default CompanySidebar;

import React from "react";
import { FiMessageSquare, FiUserPlus } from "react-icons/fi";

const HiringTeam = () => {
  const recruiters = [
    {
      name: "Sarah Jenkins",
      role: "Lead Tech Recruiter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      isOnline: true,
    },
    {
      name: "David Chen",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      isOnline: true,
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
      <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
        Recruiter Team
      </h3>
      <div className="space-y-5">
        {recruiters.map((recruiter, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Left: Avatar & Info */}
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-200 border border-neutral-100">
                  <img
                    src={recruiter.avatar}
                    alt={recruiter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {recruiter.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#202020]">
                  {recruiter.name}
                </span>
                <span className="text-xs font-semibold text-[#8C8C8C]">
                  {recruiter.role}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2">
              <button
                className="w-8 h-8 rounded-full bg-[#F5F6F8] hover:bg-[#E8F4FF] text-neutral-600 hover:text-[#56A8FF] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                title="Message Recruiter"
              >
                <FiMessageSquare className="text-sm" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-[#F5F6F8] hover:bg-[#E8F4FF] text-neutral-600 hover:text-[#56A8FF] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                title="Assign Candidate"
              >
                <FiUserPlus className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringTeam;

import React from "react";
import { FiTrendingUp, FiEye, FiCheckSquare, FiBookOpen } from "react-icons/fi";

const JobStatistics = () => {
  const stats = [
    { label: "Views", value: "1,248", change: "+12% vs last week", icon: <FiEye className="text-[#56A8FF]" /> },
    { label: "Applicants", value: "142", change: "+8% vs last week", icon: <FiCheckSquare className="text-emerald-500" /> },
    { label: "Read Rate", value: "78%", change: "+2% vs last week", icon: <FiBookOpen className="text-amber-500" /> },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
      <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
        <span>Job Analytics</span>
        <FiTrendingUp className="text-[#56A8FF] text-lg" />
      </h3>

      <div className="space-y-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F5F6F8] border border-neutral-100/50">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm shadow-2xs">
                {stat.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-base font-bold text-[#202020]">
                  {stat.value}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {stat.change}
            </span>
          </div>
        ))}

        {/* Profile Match Score */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#202020] mb-1.5">
            <span>Profile Match Meter</span>
            <span className="text-[#56A8FF] font-bold">92% Match</span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#56A8FF] to-emerald-400 rounded-full" style={{ width: "92%" }}></div>
          </div>
          <span className="text-[10px] text-[#8C8C8C] font-medium mt-1 block">
            Your profile matches 92% of the requirements for this job.
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobStatistics;

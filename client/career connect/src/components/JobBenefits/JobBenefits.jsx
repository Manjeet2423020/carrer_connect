import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const JobBenefits = () => {
  const benefits = [
    "Competitive Salary",
    "Health Insurance",
    "Flexible Working Hours",
    "Paid Leave",
    "Performance Bonus",
    "Learning Budget",
    "Career Growth",
    "Annual Trips",
    "Hybrid Work",
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none">
      <h2 className="text-lg font-bold text-[#202020] mb-5">Benefits & Perks</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 bg-[#F5F6F8] p-4 rounded-[18px] border border-neutral-100/50 hover:bg-[#E6FAFA]/50 transition-colors duration-200"
          >
            <FiCheckCircle className="text-[#56A8FF] text-lg shrink-0" />
            <span className="text-sm font-bold text-[#202020]">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBenefits;

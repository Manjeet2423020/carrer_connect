import React from "react";
import {
  FiGrid,
  FiBriefcase,
  FiAward,
  FiDollarSign,
  FiBookOpen,
  FiMapPin,
  FiMonitor,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

const JobInformation = ({ job }) => {
  const infoItems = [
    {
      label: "Department",
      value: job.department || "Engineering",
      icon: <FiGrid className="text-[#56A8FF]" />,
    },
    {
      label: "Employment Type",
      value: job.schedule || "Full Time",
      icon: <FiBriefcase className="text-[#56A8FF]" />,
    },
    {
      label: "Experience Required",
      value: job.experienceRequired || "3-5 Yrs",
      icon: <FiAward className="text-[#56A8FF]" />,
    },
    {
      label: "Offered Salary",
      value: job.salary || "$120,000/Yr",
      icon: <FiDollarSign className="text-[#56A8FF]" />,
    },
    {
      label: "Education",
      value: job.education || "Bachelor's Degree",
      icon: <FiBookOpen className="text-[#56A8FF]" />,
    },
    {
      label: "Location",
      value: job.location || "San Francisco, CA",
      icon: <FiMapPin className="text-[#56A8FF]" />,
    },
    {
      label: "Work Mode",
      value: job.type || "Remote",
      icon: <FiMonitor className="text-[#56A8FF]" />,
    },
    {
      label: "Industry",
      value: job.industry || "Software & Tech",
      icon: <FiGlobe className="text-[#56A8FF]" />,
    },
    {
      label: "Company Size",
      value: job.companySize || "100-500 Employees",
      icon: <FiUsers className="text-[#56A8FF]" />,
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
      <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
        Job Information
      </h3>
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3.5">
            <span className="w-9 h-9 rounded-xl bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm">
              {item.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-bold text-[#202020] mt-0.5">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobInformation;

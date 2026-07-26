import {
  FiUserCheck,
  FiBriefcase,
  FiRefreshCw,
  FiMap,
  FiAward,
} from "react-icons/fi";

const CompanyActivity = () => {
  const activities = [
    {
      title: "New Job Posted",
      desc: "Published an opening for 'Senior React Developer' in Stockholm.",
      time: "2 hours ago",
      icon: <FiBriefcase className="text-blue-500" />,
      dotBg: "bg-blue-50",
    },
    {
      title: "Recent Hiring",
      desc: "Welcomed 3 new Software Engineers to the Core Infrastructure squad.",
      time: "1 day ago",
      icon: <FiUserCheck className="text-emerald-500" />,
      dotBg: "bg-emerald-50",
    },
    {
      title: "Company Update",
      desc: "Updated remote work guidelines, introducing new asynchronous workspace protocols.",
      time: "3 days ago",
      icon: <FiRefreshCw className="text-amber-500" />,
      dotBg: "bg-amber-50",
    },
    {
      title: "Office Event",
      desc: "Held the annual summer visual brainstorming workshop in the San Francisco HQ.",
      time: "1 week ago",
      icon: <FiMap className="text-purple-500" />,
      dotBg: "bg-purple-50",
    },
    {
      title: "Promotion announcement",
      desc: "Sarah Jenkins was promoted to Lead Technical Recruiter.",
      time: "2 weeks ago",
      icon: <FiAward className="text-red-500" />,
      dotBg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none">
      <h2 className="text-lg font-bold text-[#202020] mb-6">
        Recent Activities
      </h2>
      <div className="relative pl-6 border-l border-neutral-100 space-y-8 ml-3">
        {activities.map((act, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Circle Connector */}
            <span
              className={`absolute top-0.5 left-[-35px] w-7 h-7 rounded-full flex items-center justify-center border border-white shadow-2xs ${act.dotBg} text-xs shrink-0`}
            >
              {act.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wider">
                {act.time}
              </span>
              <h4 className="text-sm font-bold text-[#202020] mt-1">
                {act.title}
              </h4>
              <p className="text-xs font-semibold text-neutral-500 mt-1 leading-relaxed">
                {act.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyActivity;

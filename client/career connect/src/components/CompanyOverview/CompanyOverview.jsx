import React from "react";
import {
  FiCheckCircle,
  FiGlobe,
  FiActivity,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";

const CompanyOverview = ({ company }) => {
  const infoBlocks = [
    { label: "Website", value: company.websiteDisplay || "slack.com", icon: <FiGlobe /> },
    { label: "Industry", value: company.industry || "Software", icon: <FiActivity /> },
    { label: "Company Size", value: company.companySize || "1000-5000", icon: <FiUsers /> },
    { label: "Founded", value: company.founded || "2009", icon: <FiCalendar /> },
    { label: "Headquarters", value: company.hqLocation || "San Francisco", icon: <FiMapPin /> },
    { label: "Country", value: company.country || "United States", icon: <FiGlobe /> },
    { label: "City", value: company.city || "San Francisco", icon: <FiMapPin /> },
    { label: "Email", value: company.email || "info@slack.com", icon: <FiMail /> },
    { label: "Phone", value: company.phone || "+1 415-555-0199", icon: <FiPhone /> },
    { label: "Working Hours", value: company.workingHours || "Mon - Fri (9:00 - 18:00)", icon: <FiClock /> },
  ];

  const socialLinks = [
    { label: "LinkedIn", value: company.linkedin || "linkedin.com/company/slack", icon: <FiLinkedin /> },
    { label: "Twitter", value: company.twitter || "twitter.com/slack", icon: <FiTwitter /> },
    { label: "Facebook", value: company.facebook || "facebook.com/slack", icon: <FiFacebook /> },
    { label: "Instagram", value: company.instagram || "instagram.com/slack", icon: <FiInstagram /> },
  ];

  const benefits = [
    { title: "Competitive Salary", desc: "Top tier salary packages.", icon: "💰" },
    { title: "Remote Work", desc: "Flexible remote location configs.", icon: "🏠" },
    { title: "Flexible Hours", desc: "Work when you are most productive.", icon: "🕒" },
    { title: "Medical Insurance", desc: "Comprehensive health coverage.", icon: "🏥" },
    { title: "Learning Budget", desc: "Paid seminars, courses & books.", icon: "📚" },
    { title: "Career Growth", desc: "Accelerated promotions & programs.", icon: "📈" },
    { title: "Performance Bonus", desc: "Annual incentives on results.", icon: "🏆" },
    { title: "Annual Trips", desc: "Yearly retreats & company gatherings.", icon: "✈️" },
    { title: "Stock Options", desc: "Own equity shares in the firm.", icon: "🪙" },
    { title: "Gym Membership", desc: "Keep physically active & healthy.", icon: "💪" },
  ];

  const techStack = [
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Redis",
    "GraphQL",
    "Tailwind CSS",
    "Next.js",
  ];

  const gallery = [
    {
      title: "Office Culture",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Work Environment",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Team Collaboration",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Learning Programs",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* About Company Card */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#202020] mb-4">About Company</h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-8">
          {company.description ||
            "Slack is a communication platform that brings people, information, and tools together. Designed to help teams collaborate more effectively, Slack is used by millions of professionals worldwide. Our team is dedicated to crafting a platform that improves work-life balance and drives corporate agility."}
        </p>

        {/* Info Grid */}
        <h3 className="text-xs font-extrabold text-[#202020] uppercase tracking-wider mb-4">
          Company Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoBlocks.map((block, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 bg-[#F5F6F8] p-4 rounded-[18px] border border-neutral-100/50"
            >
              <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-sm text-[#56A8FF] shadow-2xs">
                {block.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
                  {block.label}
                </span>
                <span className="text-xs font-bold text-[#202020] mt-0.5 break-all">
                  {block.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Socials Sub-grid */}
        <h3 className="text-xs font-extrabold text-[#202020] uppercase tracking-wider mb-4 mt-6">
          Social Profiles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={`https://${social.value}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2.5 bg-[#F5F6F8] hover:bg-[#E8F4FF]/50 p-3.5 rounded-[18px] border border-neutral-100/50 transition-colors duration-200"
            >
              <span className="text-sm text-[#56A8FF]">{social.icon}</span>
              <span className="text-xs font-bold text-[#202020]">{social.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Why Join Card (Benefits) */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#202020] mb-5">Why Join This Company</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3.5 bg-[#F5F6F8] p-4.5 rounded-[18px] border border-neutral-100/50 hover:bg-[#E6FAFA]/50 transition-colors duration-200"
            >
              <span className="text-2xl shrink-0">{benefit.icon}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#202020]">
                  {benefit.title}
                </span>
                <span className="text-[11px] font-semibold text-[#8C8C8C] mt-0.5 leading-snug">
                  {benefit.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Card */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#202020] mb-4">Company Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-bold text-neutral-700 bg-[#F5F6F8] px-4 py-2 rounded-full border border-neutral-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Life At Company Gallery Card */}
      <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#202020] mb-5">Life at Company</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="relative h-48 rounded-[20px] overflow-hidden group border border-neutral-100"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <span className="text-xs font-bold text-white tracking-wide bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;

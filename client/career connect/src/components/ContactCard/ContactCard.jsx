import {
  FiMail,
  FiPhone,
  FiGlobe,
  FiLinkedin,
  FiMapPin,
  FiMap,
} from "react-icons/fi";

const ContactCard = ({ company }) => {
  const handleMapClick = () => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(company.hqLocation || company.location)}`,
      "_blank",
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 shadow-xs select-none">
      <h3 className="text-base font-bold text-[#202020] mb-5 pb-3 border-b border-neutral-100">
        Contact Information
      </h3>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-start space-x-3">
          <span className="w-8 h-8 rounded-lg bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm text-[#56A8FF]">
            <FiMail />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
              Email Address
            </span>
            <a
              href={`mailto:${company.email || "info@company.com"}`}
              className="text-xs font-bold text-[#202020] hover:text-[#56A8FF] transition-colors mt-0.5"
            >
              {company.email || "info@company.com"}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3">
          <span className="w-8 h-8 rounded-lg bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm text-[#56A8FF]">
            <FiPhone />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
              Phone Number
            </span>
            <a
              href={`tel:${company.phone || "+1 415-555-0199"}`}
              className="text-xs font-bold text-[#202020] hover:text-[#56A8FF] transition-colors mt-0.5"
            >
              {company.phone || "+1 415-555-0199"}
            </a>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start space-x-3">
          <span className="w-8 h-8 rounded-lg bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm text-[#56A8FF]">
            <FiGlobe />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
              Official Website
            </span>
            <a
              href={company.website || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#56A8FF] hover:underline mt-0.5"
            >
              {company.websiteDisplay || "company.com"}
            </a>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start space-x-3">
          <span className="w-8 h-8 rounded-lg bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm text-[#56A8FF]">
            <FiLinkedin />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
              LinkedIn
            </span>
            <a
              href={`https://${company.linkedin || "linkedin.com"}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#202020] hover:text-[#56A8FF] transition-colors mt-0.5"
            >
              {company.name} LinkedIn
            </a>
          </div>
        </div>

        {/* Office Address */}
        <div className="flex items-start space-x-3 border-t border-neutral-100/60 pt-4">
          <span className="w-8 h-8 rounded-lg bg-[#F5F6F8] flex items-center justify-center shrink-0 text-sm text-[#56A8FF]">
            <FiMapPin />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
              Office Address
            </span>
            <span className="text-xs font-bold text-[#202020] mt-0.5 leading-relaxed">
              {company.address || "500 Howard St, San Francisco, CA 94105"}
            </span>
          </div>
        </div>

        {/* Google Map Button */}
        <button
          onClick={handleMapClick}
          className="w-full mt-2 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 border border-neutral-200"
        >
          <FiMap className="text-sm" />
          <span>Google Map Location</span>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

import { useState } from "react";
import { FiBookmark, FiShare2 } from "react-icons/fi";

const ActionButtons = ({ job, onApply, onSave }) => {
  const [isSaved, setIsSaved] = useState(job.isBookmarked || false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200/80 p-4 flex items-center justify-between gap-4 z-40 lg:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.06)] select-none">
      {/* Save Button */}
      <button
        onClick={() => {
          setIsSaved(!isSaved);
          if (onSave) onSave(!isSaved);
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer active:scale-95 border ${
          isSaved
            ? "bg-[#56A8FF] border-transparent text-black"
            : "bg-[#F5F6F8] border-neutral-100 text-neutral-600"
        }`}
        title="Save Job"
      >
        <FiBookmark className="text-lg" />
      </button>

      {/* Primary Apply Button */}
      <button
        onClick={onApply}
        className="flex-1 bg-[#56A8FF] hover:bg-[#56A8FF]/90 text-black text-sm font-extrabold py-3.5 px-6 rounded-full text-center transition-all duration-200 shadow-md cursor-pointer active:scale-95"
      >
        Apply Now
      </button>

      {/* Share Button */}
      <button
        className="w-12 h-12 rounded-full bg-[#F5F6F8] border border-neutral-100 text-neutral-600 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer active:scale-95"
        title="Share Job"
      >
        <FiShare2 className="text-lg" />
      </button>
    </div>
  );
};

export default ActionButtons;

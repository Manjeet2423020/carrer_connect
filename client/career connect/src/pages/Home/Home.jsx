import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PopularJobs from "../../components/PopularJobs/PopularJobs";
import Footer from "../../components/Footer/Footer";

// Helper dummy data for jobs matching pastel design criteria
const INITIAL_JOBS = [
  {
    id: 1,
    date: "25 May, 2026",
    company: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    title: "Senior Product Designer",
    tags: ["Full Time", "Remote", "Design"],
    schedule: "full-time",
    type: "remote",
    salary: "$120,000/Yr",
    salaryVal: 120000,
    location: "San Francisco, CA",
    cardBg: "bg-[#E8F4FF]",
    isBookmarked: true,
  },
  {
    id: 2,
    date: "22 May, 2026",
    company: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    title: "Lead UX Researcher",
    tags: ["Part Time", "Flexible", "Research"],
    schedule: "part-time",
    type: "flexible",
    salary: "$95,000/Yr",
    salaryVal: 95000,
    location: "New York, NY",
    cardBg: "bg-[#FFEBF0]",
    isBookmarked: false,
  },
  {
    id: 3,
    date: "20 May, 2026",
    company: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg", // Clean circular browser/spotify-like vector icon
    title: "Senior React Developer",
    tags: ["Full Time", "Remote", "React"],
    schedule: "full-time",
    type: "remote",
    salary: "$145,000/Yr",
    salaryVal: 145000,
    location: "Stockholm, SE",
    cardBg: "bg-[#FFF3EB]",
    isBookmarked: false,
  },
  {
    id: 4,
    date: "18 May, 2026",
    company: "Airbnb",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    title: "Staff Product Manager",
    tags: ["Full Time", "Full Day", "Product"],
    schedule: "full-time",
    type: "full-day",
    salary: "$195,000/Yr",
    salaryVal: 195000,
    location: "Los Angeles, CA",
    cardBg: "bg-[#F2F4F7]",
    isBookmarked: true,
  },
  {
    id: 5,
    date: "14 May, 2026",
    company: "Stripe",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    title: "Technical Writer",
    tags: ["Internship", "Remote", "Documentation"],
    schedule: "internship",
    type: "remote",
    salary: "$75,000/Yr",
    salaryVal: 75000,
    location: "Seattle, WA",
    cardBg: "bg-[#E6FAFA]",
    isBookmarked: false,
  },
  {
    id: 6,
    date: "10 May, 2026",
    company: "Notion",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    title: "Lead Brand Designer",
    tags: ["Project Work", "Flexible", "Brand"],
    schedule: "project-work",
    type: "flexible",
    salary: "$105,000/Yr",
    salaryVal: 105000,
    location: "San Francisco, CA",
    cardBg: "bg-[#F3E8FF]",
    isBookmarked: false,
  },
  {
    id: 7,
    date: "08 May, 2026",
    company: "Dribbble",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    title: "Visual Designer",
    tags: ["Part Time", "Remote", "UI/UX"],
    schedule: "part-time",
    type: "remote",
    salary: "$90,000/Yr",
    salaryVal: 90000,
    location: "New York, NY",
    cardBg: "bg-[#E8F4FF]",
    isBookmarked: false,
  },
  {
    id: 8,
    date: "04 May, 2026",
    company: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    title: "DevOps Engineer",
    tags: ["Full Time", "Remote", "Cloud"],
    schedule: "full-time",
    type: "remote",
    salary: "$165,000/Yr",
    salaryVal: 165000,
    location: "Remote, US",
    cardBg: "bg-[#FFEBF0]",
    isBookmarked: false,
  },
  {
    id: 9,
    date: "02 May, 2026",
    company: "Linear",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    title: "Backend Engineer",
    tags: ["Project Work", "Shift Work", "NodeJS"],
    schedule: "project-work",
    type: "shift-work",
    salary: "$135,000/Yr",
    salaryVal: 135000,
    location: "London, UK",
    cardBg: "bg-[#FFF3EB]",
    isBookmarked: false,
  },
];

const Home = () => {
  // Filters State
  const [searchVal, setSearchVal] = useState("");
  const [salaryVal, setSalaryVal] = useState(500000);
  const [workingSchedule, setWorkingSchedule] = useState([]);
  const [employmentType, setEmploymentType] = useState([]);
  const [sortBy, setSortBy] = useState("Last Updated");

  // Sidebar toggle state for mobile viewports
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Reactive filtering logic
  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter((job) => {
      // 1. Search Query Filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        job.company.toLowerCase().includes(searchVal.toLowerCase());

      // 2. Salary Filter
      const matchesSalary = job.salaryVal <= salaryVal;

      // 3. Working Schedule Filter
      const matchesSchedule =
        workingSchedule.length === 0 || workingSchedule.includes(job.schedule);

      // 4. Employment Type Filter
      const matchesType =
        employmentType.length === 0 || employmentType.includes(job.type);

      return matchesSearch && matchesSalary && matchesSchedule && matchesType;
    });
  }, [searchVal, salaryVal, workingSchedule, employmentType]);

  // Handle Sort Change (mock trigger)
  const handleSortChange = (option) => {
    setSortBy(option);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] px-4 md:px-10 py-8 flex flex-col space-y-8 select-none relative">
      {/* Top Premium Navbar */}
      <Navbar
        searchVal={searchVal}
        onSearchChange={(e) => setSearchVal(e.target.value)}
        salaryVal={salaryVal}
        onSalaryChange={setSalaryVal}
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start w-full">
        {/* Desktop Sidebar (visible on large screen) */}
        <div className="hidden lg:block w-full">
          <Sidebar
            workingSchedule={workingSchedule}
            setWorkingSchedule={setWorkingSchedule}
            employmentType={employmentType}
            setEmploymentType={setEmploymentType}
          />
        </div>

        {/* Right content area */}
        <main className="w-full flex-1">
          <PopularJobs
            jobs={filteredJobs}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onToggleSidebar={() => setIsSidebarOpen(true)}
          />
        </main>
      </div>

      {/* Mobile Sidebar/Filters Slide-out Panel Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        >
          {/* Sidebar container */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white h-full shadow-2xl overflow-y-auto p-4 transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close action */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-[#202020]">Filters</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-sm text-neutral-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <Sidebar
              workingSchedule={workingSchedule}
              setWorkingSchedule={setWorkingSchedule}
              employmentType={employmentType}
              setEmploymentType={setEmploymentType}
            />
          </div>
        </div>
      )}

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Home;

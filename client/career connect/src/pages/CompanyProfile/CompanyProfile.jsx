import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CompanyHeader from "../../components/CompanyHeader/CompanyHeader";
import CompanyTabs from "../../components/CompanyTabs/CompanyTabs";
import CompanyOverview from "../../components/CompanyOverview/CompanyOverview";
import CompanyActivity from "../../components/CompanyActivity/CompanyActivity";
import CompanyJobs from "../../components/CompanyJobs/CompanyJobs";
import CompanySidebar from "../../components/CompanySidebar/CompanySidebar";
import ContactCard from "../../components/ContactCard/ContactCard";

// Import DETAILED_JOBS to extract job listings dynamically
import { DETAILED_JOBS } from "../JobDetails/JobDetails";

const MOCK_COMPANIES = [
  {
    id: 1,
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    isVerified: true,
    rating: "4.8",
    followersCount: "1.2M",
    companySize: "1000-5000 Employees",
    founded: "2009",
    website: "https://slack.com",
    websiteDisplay: "slack.com",
    location: "San Francisco, CA",
    hqLocation: "San Francisco, CA",
    country: "United States",
    city: "San Francisco",
    email: "careers@slack.com",
    phone: "+1 415-555-0199",
    linkedin: "linkedin.com/company/slack",
    twitter: "twitter.com/slack",
    facebook: "facebook.com/slack",
    instagram: "instagram.com/slack",
    workingHours: "Mon - Fri (9:00 AM - 6:00 PM)",
    description:
      "Slack is the collaboration hub that brings people, information, and tools together to get work done. From global Fortune 100 companies to corner markets, Slack helps teams communicate, collaborate, and automate their processes in a single secure environment.",
    companyReviews: 1240,
    companyFounded: "2009",
    industry: "Enterprise SaaS",
    activeJobsCount: 1,
    hiringSuccess: "94%",
    avgSalary: "$130,000/Yr",
    address: "500 Howard St, San Francisco, CA 94105",
  },
  {
    id: 2,
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    isVerified: true,
    rating: "4.9",
    followersCount: "780K",
    companySize: "500-1000 Employees",
    founded: "2012",
    website: "https://figma.com",
    websiteDisplay: "figma.com",
    location: "New York, NY",
    hqLocation: "San Francisco, CA",
    country: "United States",
    city: "New York",
    email: "careers@figma.com",
    phone: "+1 415-288-0233",
    linkedin: "linkedin.com/company/figma",
    twitter: "twitter.com/figma",
    facebook: "facebook.com/figma",
    instagram: "instagram.com/figma",
    workingHours: "Mon - Fri (9:00 AM - 6:00 PM)",
    description:
      "Figma is a leading collaborative design tool that helps teams brainstorm, design, and prototype digital interfaces together in real-time. Figma connects everyone in the design process so teams can ship better products, faster.",
    companyReviews: 890,
    companyFounded: "2012",
    industry: "Design Technology",
    activeJobsCount: 1,
    hiringSuccess: "96%",
    avgSalary: "$125,000/Yr",
    address: "760 Market St, San Francisco, CA 94102",
  },
  {
    id: 3,
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
    isVerified: true,
    rating: "4.7",
    followersCount: "3.5M",
    companySize: "5000+ Employees",
    founded: "2006",
    website: "https://spotify.com",
    websiteDisplay: "spotify.com",
    location: "Stockholm, SE",
    hqLocation: "Stockholm, Sweden",
    country: "Sweden",
    city: "Stockholm",
    email: "careers@spotify.com",
    phone: "+46 8-555-2199",
    linkedin: "linkedin.com/company/spotify",
    twitter: "twitter.com/spotify",
    facebook: "facebook.com/spotify",
    instagram: "instagram.com/spotify",
    workingHours: "Mon - Fri (8:30 AM - 5:30 PM)",
    description:
      "Spotify is the world's most popular audio streaming subscription service. We connect creators and listeners with a catalog of millions of tracks and podcast episodes, driving technical innovation in audio recommendation algorithms and real-time streaming.",
    companyReviews: 3100,
    companyFounded: "2006",
    industry: "Audio Streaming",
    activeJobsCount: 1,
    hiringSuccess: "92%",
    avgSalary: "$140,000/Yr",
    address: "Regeringsgatan 19, 111 53 Stockholm, Sweden",
  },
  {
    id: 4,
    name: "Airbnb",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    isVerified: true,
    rating: "4.8",
    followersCount: "2.1M",
    companySize: "5000+ Employees",
    founded: "2008",
    website: "https://airbnb.com",
    websiteDisplay: "airbnb.com",
    location: "Los Angeles, CA",
    hqLocation: "San Francisco, CA",
    country: "United States",
    city: "Los Angeles",
    email: "careers@airbnb.com",
    phone: "+1 888-247-2622",
    linkedin: "linkedin.com/company/airbnb",
    twitter: "twitter.com/airbnb",
    facebook: "facebook.com/airbnb",
    instagram: "instagram.com/airbnb",
    workingHours: "Mon - Fri (9:00 AM - 6:00 PM)",
    description:
      "Airbnb operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities. Based in San Francisco, California, the platform is accessible via website and mobile app.",
    companyReviews: 2450,
    companyFounded: "2008",
    industry: "Travel Marketplace",
    activeJobsCount: 1,
    hiringSuccess: "93%",
    avgSalary: "$150,000/Yr",
    address: "888 Brannan St, San Francisco, CA 94103",
  },
  {
    id: 5,
    name: "Stripe",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    isVerified: true,
    rating: "4.9",
    followersCount: "1.8M",
    companySize: "5000+ Employees",
    founded: "2010",
    website: "https://stripe.com",
    websiteDisplay: "stripe.com",
    location: "Seattle, WA",
    hqLocation: "South San Francisco, CA",
    country: "United States",
    city: "Seattle",
    email: "jobs@stripe.com",
    phone: "+1 415-358-0099",
    linkedin: "linkedin.com/company/stripe",
    twitter: "twitter.com/stripe",
    facebook: "facebook.com/stripe",
    instagram: "instagram.com/stripe",
    workingHours: "Mon - Fri (9:00 AM - 6:00 PM)",
    description:
      "Stripe is a financial infrastructure platform for the internet. Millions of companies—from the world's largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.",
    companyReviews: 1780,
    companyFounded: "2010",
    industry: "Financial Technology",
    activeJobsCount: 1,
    hiringSuccess: "95%",
    avgSalary: "$135,000/Yr",
    address: "354 Oyster Point Blvd, South San Francisco, CA 94080",
  },
  {
    id: 6,
    name: "Notion",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    isVerified: true,
    rating: "4.8",
    followersCount: "950K",
    companySize: "100-500 Employees",
    founded: "2013",
    website: "https://notion.so",
    websiteDisplay: "notion.so",
    location: "San Francisco, CA",
    hqLocation: "San Francisco, CA",
    country: "United States",
    city: "San Francisco",
    email: "careers@makenotion.com",
    phone: "+1 415-345-0211",
    linkedin: "linkedin.com/company/notion-labs",
    twitter: "twitter.com/notionhq",
    facebook: "facebook.com/notion",
    instagram: "instagram.com/notion",
    workingHours: "Mon - Fri (9:00 AM - 6:00 PM)",
    description:
      "Notion is the all-in-one workspace that combines notes, docs, project management, and wikis into a single, highly customizable workspace. Notion is used by individuals and teams worldwide to coordinate and structure their daily workloads.",
    companyReviews: 670,
    companyFounded: "2013",
    industry: "Productivity SaaS",
    activeJobsCount: 1,
    hiringSuccess: "94%",
    avgSalary: "$120,000/Yr",
    address: "2300 Harrison St, San Francisco, CA 94110",
  },
];

const CompanyProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  // Retrieve current company, fallback to Slack (ID 1)
  const currentCompany = useMemo(() => {
    const comp = MOCK_COMPANIES.find((c) => c.id === Number(id));
    return comp || MOCK_COMPANIES[0];
  }, [id]);

  // Extract jobs associated with current company dynamically
  const companyJobs = useMemo(() => {
    return DETAILED_JOBS.filter(
      (job) => job.company.toLowerCase() === currentCompany.name.toLowerCase(),
    );
  }, [currentCompany]);

  // Dynamically switch content rendered in the main layout based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <CompanyOverview company={currentCompany} />;
      case "Activities":
        return <CompanyActivity />;
      case "Jobs":
        return <CompanyJobs company={currentCompany} jobs={companyJobs} />;
      case "Employees":
        return (
          <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none text-center py-12">
            <span className="text-3xl mb-2 block">👥</span>
            <h3 className="text-sm font-bold text-[#202020]">
              Employees Directory
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              This directory is currently private and only available to
              connected members.
            </p>
          </div>
        );
      case "Reviews":
        return (
          <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none text-center py-12">
            <span className="text-3xl mb-2 block">⭐</span>
            <h3 className="text-sm font-bold text-[#202020]">
              Company Reviews
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              There are currently {currentCompany.companyReviews} reviews
              available in our portal.
            </p>
          </div>
        );
      case "Gallery":
        return (
          <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none text-center py-12">
            <span className="text-3xl mb-2 block">🖼️</span>
            <h3 className="text-sm font-bold text-[#202020]">Photo Gallery</h3>
            <p className="text-xs text-neutral-500 mt-1">
              View historical snaps of office workshops, retreats, and team
              gatherings.
            </p>
          </div>
        );
      case "Contact":
        return <ContactCard company={currentCompany} />;
      default:
        return <CompanyOverview company={currentCompany} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] px-4 md:px-10 py-8 flex flex-col space-y-8 select-none relative pb-10">
      {/* Navbar */}
      <Navbar
        searchVal=""
        onSearchChange={() => {}}
        salaryVal={500000}
        onSalaryChange={() => {}}
      />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-8 py-2 sm:py-6 flex-1">
        {/* Company Header Info */}
        <CompanyHeader company={currentCompany} />

        {/* Categories Tab Selector */}
        <CompanyTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start w-full">
          {/* Main Area (70%) */}
          <div className="space-y-8 flex-1">{renderTabContent()}</div>

          {/* Sidebar Area (30%) */}
          <div className="w-full lg:w-[360px] shrink-0">
            <CompanySidebar company={currentCompany} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CompanyProfile;
export { MOCK_COMPANIES };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsThunk } from "../../redux/jobSlice";
import Navbar from "../../components/Navbar/Navbar";
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiSearch } from "react-icons/fi";

const FindJob = () => {
  const dispatch = useDispatch();
  const { jobsList, loading, error, pagination } = useSelector((state) => state.jobs);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    dispatch(fetchJobsThunk());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchJobsThunk({ keyword, location, jobType }));
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-4 md:px-8 py-6">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Header & Search Filter Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Find Your Dream Job 🚀
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Explore top career opportunities from leading technology companies
        </p>

        {/* Filter Bar */}
        <form onSubmit={handleSearch} className="bg-[#151515] p-4 rounded-2xl border border-neutral-800 flex flex-col md:flex-row gap-4 mb-8 shadow-xl">
          <div className="flex-1 flex items-center bg-[#202020] px-4 py-2.5 rounded-xl border border-neutral-700">
            <FiSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Job title or keywords (e.g. Node.js)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>

          <div className="flex-1 flex items-center bg-[#202020] px-4 py-2.5 rounded-xl border border-neutral-700">
            <FiMapPin className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Location (e.g. Remote, Bangalore)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="bg-[#202020] text-white px-4 py-2.5 rounded-xl border border-neutral-700 focus:outline-none text-sm"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#56A8FF] hover:bg-blue-400 text-black font-bold rounded-xl transition shadow-lg text-sm"
          >
            Search Jobs
          </button>
        </form>

        {/* Jobs List Grid */}
        {loading ? (
          <div className="text-center py-16 text-indigo-400 font-semibold text-lg">
            Loading latest jobs... ⏳
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : jobsList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No jobs found matching your criteria. Try adjusting your search filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobsList.map((job) => (
              <div
                key={job._id}
                className="bg-[#151515] p-6 rounded-2xl border border-neutral-800 hover:border-[#56A8FF] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Company Logo & Job Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={job.company?.logo || "https://via.placeholder.com/40"}
                        alt={job.company?.name}
                        className="w-12 h-12 rounded-xl object-contain bg-white p-1"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white leading-snug">{job.title}</h3>
                        <p className="text-sm text-[#56A8FF] font-medium">{job.company?.name}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full uppercase">
                      {job.jobType}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Requirements Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements?.map((req, idx) => (
                      <span key={idx} className="bg-[#202020] text-gray-300 text-xs px-2.5 py-1 rounded-md border border-neutral-700">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Location, Salary & Details Button */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FiMapPin className="mr-1 text-[#56A8FF]" /> {job.location}
                    </span>
                    <span className="flex items-center text-green-400 font-semibold">
                      ₹{(job.salary / 100000).toFixed(1)} LPA
                    </span>
                  </div>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="px-4 py-2 bg-neutral-800 hover:bg-[#56A8FF] hover:text-black text-white font-medium rounded-lg transition text-xs"
                  >
                    View Details
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;

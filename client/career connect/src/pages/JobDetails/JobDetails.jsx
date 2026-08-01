import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetailsThunk } from "../../redux/jobSlice";
import { applyJobApi } from "../../services/application.service";
import Navbar from "../../components/Navbar/Navbar";
import { FiMapPin, FiBriefcase, FiDollarSign, FiCheckCircle, FiArrowLeft, FiGlobe, FiClock } from "react-icons/fi";


const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedJob: job,
    loading,
    error,
  } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetailsThunk(id));
    }
  }, [dispatch, id]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setApplying(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await applyJobApi(id);
      if (res.success) {
        setMessage({
          type: "success",
          text: "🎉 Application submitted successfully! Status: Pending.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to apply. Make sure your resume is uploaded in profile!",
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-4 md:px-8 py-6">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-6">
        <Link
          to="/find-job"
          className="inline-flex items-center text-gray-400 hover:text-white text-sm mb-6 transition"
        >
          <FiArrowLeft className="mr-2" /> Back to Jobs
        </Link>

        {loading ? (
          <div className="text-center py-20 text-indigo-400 text-lg">
            Loading Job Details... ⏳
          </div>
        ) : error || !job ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl text-center">
            {error || "Job not found!"}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Banner Card */}
            <div className="bg-[#151515] p-8 rounded-3xl border border-neutral-800 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-5">
                <img
                  src={job.company?.logo || "https://via.placeholder.com/60"}
                  alt={job.company?.name}
                  className="w-16 h-16 rounded-2xl object-contain bg-white p-2"
                />
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                    {job.title}
                  </h1>
                  <p className="text-[#56A8FF] font-semibold text-base mt-1 flex items-center gap-2">
                    <FiBriefcase /> {job.company?.name}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              {user?.role !== "recruiter" && user?.role !== "admin" && (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="px-8 py-3 bg-[#56A8FF] hover:bg-blue-400 text-black font-bold rounded-xl text-base shadow-xl transition transform hover:scale-105 disabled:opacity-50"
                >
                  {applying ? "Submitting..." : "Apply Now"}
                </button>
              )}
            </div>

            {/* Notification Messages */}
            {message.text && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${message.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
              >
                {message.text}
              </div>
            )}

            {/* Key Job Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#151515] p-4 rounded-2xl border border-neutral-800">
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <FiDollarSign className="text-[#56A8FF]" /> Salary Offered
                </p>
                <p className="text-lg font-bold text-green-400 mt-1">
                  ₹{(job.salary / 100000).toFixed(1)} LPA
                </p>
              </div>

              <div className="bg-[#151515] p-4 rounded-2xl border border-neutral-800">
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <FiMapPin className="text-[#56A8FF]" /> Location
                </p>
                <p className="text-base font-semibold text-white mt-1">
                  {job.location}
                </p>
              </div>

              <div className="bg-[#151515] p-4 rounded-2xl border border-neutral-800">
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <FiBriefcase className="text-[#56A8FF]" /> Job Type
                </p>
                <p className="text-base font-semibold text-white mt-1 capitalize">
                  {job.jobType}
                </p>
              </div>

              <div className="bg-[#151515] p-4 rounded-2xl border border-neutral-800">
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <FiClock className="text-[#56A8FF]" /> Experience Level
                </p>
                <p className="text-base font-semibold text-white mt-1 capitalize">
                  {job.experienceLevel}
                </p>
              </div>
            </div>

            {/* Full Job Description Section */}
            <div className="bg-[#151515] p-8 rounded-3xl border border-neutral-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">
                  About the Role
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Skill Requirements */}
              {job.requirements?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">
                    Key Skill Requirements
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-[#202020] p-3 rounded-xl border border-neutral-700"
                      >
                        <FiCheckCircle className="text-[#56A8FF] shrink-0" />
                        <span className="text-gray-200 text-sm font-medium">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;

import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "../pages/Home/Home";
import FindJob from "../pages/FindJob/FindJob";
import Messages from "../pages/Messages/Messages";
import Hiring from "../pages/Hiring/Hiring";
import Community from "../pages/Community/Community";
import FAQ from "../pages/FAQ/FAQ";
import SavedJobs from "../pages/SavedJobs/SavedJobs";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import JobDetails from "../pages/JobDetails/JobDetails";
import CompanyProfile from "../pages/CompanyProfile/CompanyProfile";
import SearchResults from "../pages/SearchResults/SearchResults";
import NotFound from "../pages/NotFound/NotFound";

// Auth Pages (Aapke lowercase filenames ke acccording)
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/find-job" element={<FindJob />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/hiring" element={<Hiring />} />
      <Route path="/community" element={<Community />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/company/:id" element={<CompanyProfile />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

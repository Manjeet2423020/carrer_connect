import TopActions from "../TopActions/TopActions";
import JobCard from "../JobCard/JobCard";

const PopularJobs = ({ jobs = [], sortBy, onSortChange, onToggleSidebar }) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Top Header Actions */}
      <TopActions
        sortBy={sortBy}
        onSortChange={onSortChange}
        onToggleSidebar={onToggleSidebar}
      />

      {/* Grid Container */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-[24px] border border-neutral-100 shadow-sm text-center">
          <span className="text-4xl mb-3">🔍</span>
          <h3 className="text-lg font-bold text-[#202020]">No jobs found</h3>
          <p className="text-sm text-[#8C8C8C] mt-1 max-w-xs">
            Try adjusting your search criteria, salary range, or category
            filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularJobs;

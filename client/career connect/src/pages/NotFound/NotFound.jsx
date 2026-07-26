import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F6F8] text-center p-4">
      <h1 className="text-6xl font-bold text-neutral-800">404</h1>
      <p className="text-xl text-neutral-600 mt-2">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 bg-black hover:bg-neutral-800 text-white text-sm font-bold py-3 px-6 rounded-full shadow-md transition-all duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/logout.mutation";
import toast from "react-hot-toast";

/**
 * Header Component
 *
 * Features:
 * - A centered title ("Bankroll Buddy") with a minimalist subline divider.
 * - A logout button on the far right.
 * - Responsive and modern design.
 */
const Header = () => {
  const [logoutUser, { loading }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthUser"],
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-6 py-4 w-full max-w-7xl mx-auto relative">
      {/* Title and Link */}
      <div className="flex items-center justify-between w-full">
        <div className="w-1/3" /> {/* Empty div for spacing */}

        <Link
          to="/"
          className="text-4xl md:text-6xl font-bold text-gray-100 hover:text-teal-400 transition-all text-center whitespace-nowrap"
        >
          Bankroll Buddy
        </Link>

        {/* Logout Button */}
        <div className="w-1/3 flex justify-end">
          <button
            className={`flex items-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-md shadow hover:bg-teal-500 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <span className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin"></span>
            ) : (
              <MdLogout className="w-5 h-5" />
            )}
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* Subline for a minimalist divider */}
      <div className="flex items-center mt-4">
        <div className="w-16 h-[2px] bg-gray-500"></div>
        <p className="mx-4 text-sm text-gray-400 tracking-wide uppercase">
          Track your finances effortlessly
        </p>
        <div className="w-16 h-[2px] bg-gray-500"></div>
      </div>
    </div>
  );
};

export default Header;

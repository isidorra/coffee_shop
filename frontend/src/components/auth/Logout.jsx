import { useAuthContext } from "../../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const Logout = () => {
  const { setAuthUser } = useAuthContext();

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("user");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 sm:gap-2 md:hover:bg-dark-gray/10 md:py-1 md:px-2 duration-200"
    >
      <MdOutlineLogout className="text-lg" />
      <span className="hidden sm:block">Logout</span>
    </button>
  );
};

export default Logout;

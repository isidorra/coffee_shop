import { useAuthContext } from "../../context/AuthContext";
import { useCategoriesContext } from "../../context/CategoriesContext";
import useGetCategories from "../../hooks/category/useGetCategories";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import Logout from "../auth/Logout";

const MobileMenu = () => {
  const { loading } = useGetCategories();
  const { categories } = useCategoriesContext();
  const { authUser } = useAuthContext();

  return (
    <div className="block md:hidden py-3">
      <div className="flex flex-col uppercase text-sm gap-4">
      
            <Link to={"/"}>
            Home
            </Link>
            {!loading && categories && categories.map((category) => (
                <Link
                to={`/all-products/filter/${category.id}`}
                key={category.id}>
                {category.name}
                </Link>
            ))}

            <div className="w-1/2 h-[1px] bg-secondary/50"></div>
            <Link to={"/cart"} className="flex items-center gap-2 capitalize">
                <IoBagOutline className="text-lg" />
                {authUser && <span>Cart</span>}
            </Link>

            <Link to={authUser ? "/customer-profile" : "/sign-up"} className="flex items-center gap-2 capitalize">
                <FaUserLarge />
                {authUser && <span>{authUser.firstName}</span>}
            </Link>

            {authUser && <Logout />}
      </div>
    </div>
  );
};

export default MobileMenu;

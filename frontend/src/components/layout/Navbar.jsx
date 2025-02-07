import Logo from "./Logo";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import { useCategoriesContext } from "../../context/CategoriesContext";
import useGetCategories from "../../hooks/category/useGetCategories";
import Logout from "../auth/Logout";
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading } = useGetCategories();
  const { categories } = useCategoriesContext();

  const [isMenuOpen, setIsOpenMenu] = useState(false);

  return (
    <div className="max-container px-5 py-2 md:py-3 border-b border-secondary">
      <div className="flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex md:items-center md:gap-7">
          <Link
            to={"/"}
            className="hover:border-b hover:border-secondary duration-200"
          >
            Home
          </Link>
          {!loading &&
            categories &&
            categories.map((category) => (
              <Link
                to={`/all-products/filter/${category.id}`}
                key={category.id}
                className="hover:border-b hover:border-secondary duration-200"
              >
                {category.name}
              </Link>
            ))}
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Link
            to={"/cart"}
            className="flex items-center gap-2 hover:bg-dark-gray/10 py-1 px-2 duration-200"
          >
            <IoBagOutline className="text-lg" />
            {authUser && <span>Cart</span>}
          </Link>

          <Link
            to={authUser ? "/customer-profile" : "/sign-up"}
            className="flex items-center gap-2 hover:bg-dark-gray/10 py-1 px-2 duration-200"
          >
            <FaUserLarge />
            {authUser && <span>{authUser.firstName}</span>}
          </Link>

          {authUser && <Logout />}
        </div>

        <button onClick={() => setIsOpenMenu(!isMenuOpen)} className="block md:hidden text-2xl">
          {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {isMenuOpen && <MobileMenu/>}
    </div>
  );
};

export default Navbar;

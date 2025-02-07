import { PiCoffeeBeanFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center sm:mx-0 gap-1 text-lg md:text-xl font-semibold text-dark-gray w-5 sm:w-auto">
        <span className="hidden sm:block">coffee</span>
        <PiCoffeeBeanFill className="text-accent bg-dark-gray rounded-full p-[1px]"/>
        <span className="hidden sm:block">shop</span>
    </Link>
  )
}

export default Logo
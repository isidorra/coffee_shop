import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const PersonalInfo = ({personalInfo}) => {
  return (
    <div className="mt-1 sm:mt-3">
        <h3 className="text-lg font-semibold">Personal Info</h3>

        <div className="pl-2">
            <div className="flex items-center gap-2">
                <FaCircleUser/>
                <p>{personalInfo.firstName} {personalInfo.lastName}</p>
            </div>
            <div className="flex items-center gap-2">
                <MdEmail />
                <p>{personalInfo.email}</p>
            </div>
        </div>
    </div>
  )
}

export default PersonalInfo
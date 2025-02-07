import { useAuthContext } from "../../context/AuthContext";
import useGetProfileInfo from "../../hooks/user/useGetProfileInfo"
import { LoaderIcon } from "react-hot-toast";
import PersonalInfo from "../user/PersonalInfo";
import DeliveryInfo from "./DeliveryInfo";

const CustomerInfo = () => {
    const {loading} = useGetProfileInfo();
    const {profileInfo} = useAuthContext();

  return (
    <>
        <h1 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">
            Profile
        </h1>

        <div>
            {loading && <LoaderIcon className="text-secondary" />}
            {!loading && !profileInfo && <p>No profile info.</p>}
            {!loading && profileInfo && 
                <div>
                    <PersonalInfo personalInfo={profileInfo} />
                    <DeliveryInfo deliveryInfo={profileInfo}/>
                </div>
            }
        </div>
    </>
  )
}

export default CustomerInfo
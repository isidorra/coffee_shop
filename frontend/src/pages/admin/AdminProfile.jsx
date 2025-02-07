import { LoaderIcon } from "react-hot-toast";
import useGetProfileInfo from "../../hooks/user/useGetProfileInfo";
import PersonalInfo from "../../components/user/PersonalInfo";
import { useAuthContext } from "../../context/AuthContext";

const AdminProfile = () => {
  const { loading } = useGetProfileInfo();
  const {profileInfo} = useAuthContext();

  return (
    <div className="p-5">
      <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

      <div>
        {loading && <LoaderIcon className="text-secondary" />}
        {!loading && !profileInfo && <p>No profile info.</p>}
        {!loading && profileInfo && <PersonalInfo personalInfo={profileInfo} />}
      </div>
    </div>
  );
};

export default AdminProfile;

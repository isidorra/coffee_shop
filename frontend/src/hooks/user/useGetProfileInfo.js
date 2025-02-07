import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const useGetProfileInfo = () => {
  const [loading, setLoading] = useState(false);
  const {setProfileInfo} = useAuthContext();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getProfileInfo = async() => {
      let url = "";
      if(authUser.role === "ADMIN")
        url = `/api/admin`;
      else if(authUser.role === "CUSTOMER")
        url = `/api/customer`;
      else return;

      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authUser.jwt}`
          }
        });

        if(response.status === 200) {
          setProfileInfo(response.data);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfileInfo();
  }, [authUser, setProfileInfo])

  return {loading};
}

export default useGetProfileInfo
import axios from "axios";
import { useEffect, useState } from "react"
import {useAuthContext} from "../../context/AuthContext";

const useGetAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getAnalytics = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/analytics", {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });

            if(response.status === 200)
                setAnalytics(response.data);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getAnalytics();
  }, [authUser])

  return {loading, analytics};
}

export default useGetAnalytics
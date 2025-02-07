import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const useGetYearlyReport = (year) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getYearlyReport = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/analytics/${parseInt(year)}`, {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });

            if(response.status === 200) {
                setReport(response.data.monthlyReports);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getYearlyReport();
  }, [authUser, year])

  return {loading, report};
}

export default useGetYearlyReport
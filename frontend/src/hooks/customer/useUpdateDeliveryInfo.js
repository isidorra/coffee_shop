import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useUpdateDeliveryInfo = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setProfileInfo} = useAuthContext();

  const updateDeliveryInfo = async(address, city, country, phoneNumber, zipCode) => {
    if(!address || !city || !country || !phoneNumber || !zipCode) {
        toast.error("All fields are required.");
        return false;
    }

    setLoading(true);
    try {
        const response = await axios.put("/api/customer", {address, city, country, phoneNumber, zipCode}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 200) {
            toast.success("Delivery Info updated!");
            setProfileInfo({
                id: response.data.user.id,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                address: response.data.deliveryInfo.address,
                city: response.data.deliveryInfo.city,
                country: response.data.deliveryInfo.country,
                zipCode: response.data.deliveryInfo.zipCode,
                phoneNumber: response.data.deliveryInfo.phoneNumber,
            })
            return true;
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, updateDeliveryInfo};
}

export default useUpdateDeliveryInfo
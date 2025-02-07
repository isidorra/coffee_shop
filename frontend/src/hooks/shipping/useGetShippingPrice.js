import { useEffect, useState } from "react"
import axios from "axios";
const useGetShippingPrice = () => {
    const [loadingShippingPrice, setLoadingShippingPrice] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0);

    useEffect(() => {
        const getShippingPrice = async() => {
            setLoadingShippingPrice(true);
            try {
                const response = await axios.get("/api/shipping-price");
                if(response.status === 200)
                    setShippingPrice(response.data.price);
            } catch(error) {
                console.log(error);
            } finally {
                setLoadingShippingPrice(false);
            }
        }

        getShippingPrice();

    }, [shippingPrice])

    return {loadingShippingPrice, shippingPrice};
}

export default useGetShippingPrice
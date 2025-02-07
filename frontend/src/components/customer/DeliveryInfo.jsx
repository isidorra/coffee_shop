import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import useUpdateDeliveryInfo from "../../hooks/customer/useUpdateDeliveryInfo";
import { LoaderIcon } from "react-hot-toast";

const DeliveryInfo = ({ deliveryInfo }) => {
    const [openForm, setOpenForm] = useState(false);
    const [address, setAddress] = useState(deliveryInfo.address);
    const [city, setCity] = useState(deliveryInfo.city);
    const [country, setCountry] = useState(deliveryInfo.country);
    const [phoneNumber, setPhoneNumber] = useState(deliveryInfo.phoneNumber);
    const [zipCode, setZipCode] = useState(deliveryInfo.zipCode);
    const {loading, updateDeliveryInfo} = useUpdateDeliveryInfo();

    const handleEdit = async(ev) => {
        ev.preventDefault();
        await updateDeliveryInfo(address, city, country, phoneNumber, zipCode);
    }
  return (
    <div className="mt-3 border-t border-secondary/20 pt-3">
      <div className="flex items-center gap-10">
        <h3 className="text-lg font-semibold">Delivery Info</h3>

        <button onClick={() => setOpenForm(!openForm)} className="border border-secondary/20 px-2 flex items-center gap-1">
            <MdEdit />
            <span>Edit</span>
        </button>
      </div>

      <div className="pl-2">
        <div className="flex items-center gap-2">
          <FaHome />
          <p>{deliveryInfo.address ? deliveryInfo.address : "-"}</p>
        </div>

        <div className="flex items-center gap-2">
          <FaLocationDot />
          <p>
            {deliveryInfo.zipCode ? deliveryInfo.zipCode : "-"},{" "}
            {deliveryInfo.city ? deliveryInfo.city : "-"},{" "}
            {deliveryInfo.country ? deliveryInfo.country : "-"}
          </p>
        </div>

        <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <p>{deliveryInfo.phoneNumber ? deliveryInfo.phoneNumber : "-"}</p>
        </div>
      </div>

      {openForm &&
        <div className="mt-5">
            <h4 className="font-semibold">Edit Delivery Info</h4>
            <form onSubmit={handleEdit} className="max-w-64">
                <input value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" type="text" required className="border border-secondary/50 p-1 bg-transparent block my-1 w-full"/>
                <input value={city} onChange={ev => setCity(ev.target.value)} placeholder="City" type="text" required className="border border-secondary/50 p-1 bg-transparent block my-1 w-full"/>
                <input value={country} onChange={ev => setCountry(ev.target.value)} placeholder="Country" type="text" required className="border border-secondary/50 p-1 bg-transparent block my-1 w-full"/>
                <input value={zipCode} onChange={ev => setZipCode(ev.target.value)} placeholder="Zip Code" type="text" required className="border border-secondary/50 p-1 bg-transparent block my-1 w-full"/>
                <input value={phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} placeholder="Phone Number" type="text" required className="border border-secondary/50 p-1 bg-transparent block my-1 w-full"/>
                <button disabled={loading} className="bg-secondary text-primary w-full p-1">
                    {loading ? <LoaderIcon/> : <span>Edit</span>}
                </button>
            </form>
        </div>
      }
    </div>
  );
};

export default DeliveryInfo;

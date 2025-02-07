import CustomerOrders from "../../components/order/CustomerOrders";
import CustomerInfo from "../../components/customer/CustomerInfo";

const CustomerProfile = () => {


  return (
    <div className="max-container px-5 py-3">
      <CustomerInfo/>

      <div className="mt-10">
        <h2 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">
          Orders
        </h2>
        <CustomerOrders/>
      </div>
    </div>
  );
};

export default CustomerProfile;

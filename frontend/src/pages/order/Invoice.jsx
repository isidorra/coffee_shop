import { useParams } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { format } from "date-fns";
import useGetOrderById from "../../hooks/order/useGetOrderById";
import { LoaderIcon } from "react-hot-toast";
import html2pdf from "html2pdf.js";
const Invoice = () => {
  const { orderId } = useParams();
  const { loading, order } = useGetOrderById(orderId);

  const handleDownloadPdf = () => {
    const element = document.getElementById("invoice");
    html2pdf(element);
  };

  return (
    <div className="p-5" id="invoice">
      {loading && <LoaderIcon />}
      {!loading && !order && <p>Order not found.</p>}
      {!loading && order && order.status === "CANCELED" && (
        <p>Order canceled.</p>
      )}
      {!loading && order && order.status !== "CANCELED" && (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Invoice #{orderId}</h1>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 bg-secondary p-2 text-primary"
              data-html2canvas-ignore
            >
              <IoMdDownload />
              <span>Download PDF</span>
            </button>
          </div>
          <p>Company: CoffeeShop</p>
          <p>Date: {format(new Date(), "dd.MM.yyyy")}</p>

          <div className="mt-10">
            <h2 className="font-semibold text-lg">Delivery Info</h2>
            <p>
              {order.customerDto.firstName} {order.customerDto.lastName}
            </p>
            <p>{order.customerDto.address}</p>
            <p>
              {order.customerDto.zipCode}, {order.customerDto.city},{" "}
              {order.customerDto.country}
            </p>
            <p>{order.customerDto.phoneNumber}</p>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-lg">Order Info</h2>
            <p>
              <span className="font-semibold">Created at: </span>
              {format(new Date(order.createdAt), "dd.MM.yyyy")}
            </p>
            <p className="font-semibold">Items</p>
            {order.items.map((item) => (
              <div className="flex items-center gap-10 pl-3" key={item.id}>
                <p>
                  {item.product.name} x {item.quantity}
                </p>
                <p>${item.product.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t border-secondary/20 py-2 mt-2">
              <p>
                <span className="font-semibold">Shipping:</span> $
                {order.shippingPrice}
              </p>
              <p>
                <span className="font-semibold">Total:</span>
                <span>${order.totalAmount}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;

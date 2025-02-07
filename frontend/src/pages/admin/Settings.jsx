import { useProductsContext } from "../../context/ProductsContext";
import useGetProducts from "../../hooks/product/useGetProducts";
import { useState, useEffect } from "react";
import useSetFeaturedProduct from "../../hooks/product/useSetFeaturedProduct";
import toast from "react-hot-toast";
import useGetShippingPrice from "../../hooks/shipping/useGetShippingPrice";
import useUpdateShipping from "../../hooks/shipping/useUpdateShipping";

const Settings = () => {
  const { loading } = useGetProducts();
  const { loadingShippingPrice, shippingPrice } = useGetShippingPrice();
  const { products } = useProductsContext();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const { loadingUpdate, updateProduct } = useSetFeaturedProduct();
  const {loadingUpdateShipping, updateShipping} = useUpdateShipping();

  useEffect(() => {
    if (products && products.length > 0) {
      const featuredProduct = products.find((product) => product.featured);
      if (featuredProduct) {
        setSelectedProduct(featuredProduct.id);
      }
    }

    if (shippingPrice) {
      setSelectedShipping(shippingPrice);
    }
  }, [products, shippingPrice]);

  const handleUpdate = async (ev) => {
    const productId = ev.target.value;
    setSelectedProduct(productId);

    const success = await updateProduct(productId);
    if (success) {
      toast.success("Product updated!");
    } else {
      toast.error("Failed to update product.");
    }
  };

  const handleUpdateShipping = async(ev) => {
    ev.preventDefault();
    const success = await updateShipping(selectedShipping);
    if(success) 
        toast.success("Shipping price updated.");
    else 
        toast.error("Shipping price update failed.");
  } 

  return (
    <div className="p-5">
      <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>

      <div>
        <h2 className="text-lg mt-5">Featured Product</h2>
        {!loading && products && (
          <select
            disabled={loadingUpdate}
            value={selectedProduct}
            onChange={handleUpdate}
            className="w-full p-2 bg-transparent border border-secondary/50 mt-2"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <h2 className="text-lg mt-5">Shipping Price ($)</h2>
        <form onSubmit={handleUpdateShipping} className="mt-2">
          <input
            value={selectedShipping}
            onChange={(ev) => setSelectedShipping(ev.target.value)}
            className="p-2 bg-transparent border border-secondary/50"
            type="number"
          />
          <button disabled={loadingUpdateShipping} className="bg-secondary text-primary py-2 px-4 ml-2">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

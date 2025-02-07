import { Link } from "react-router-dom";
import useGetProducts from "../../hooks/product/useGetProducts";
import { useProductsContext } from "../../context/ProductsContext";
import Search from "../../components/product/Search";
import useRefillStockQuantity from "../../hooks/product/useRefillStockQuantity";
import { useState } from "react";

const Products = () => {
  const { loading } = useGetProducts();
  const { products } = useProductsContext();
  const {loading: loadingRefill, refillStockQuantity} = useRefillStockQuantity();
  const [refillQuantities, setRefillQuantities] = useState({});

  const handleQuantityChange = (productId, value) => {
    setRefillQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Number(value)),
    }));
  };

  const handleRefill = async (productId) => {
    const quantity = refillQuantities[productId] || 1; 
    const success = await refillStockQuantity(productId, quantity);
    if (success) {
      setRefillQuantities((prev) => ({
        ...prev,
        [productId]: 1, 
      }));
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>

        <Link
          to={"/create-product"}
          className="bg-secondary text-primary px-3 py-2 sm:px-5 text-sm sm:text-base focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        >
          + Add Product
        </Link>
      </div>
      <div className="flex justify-end mt-2">
        <Search />
      </div>

      <table className="w-full mx-auto mt-4">
        <thead>
          <tr className="text-primary bg-secondary">
            <th className="text-xs sm:text-base font-medium p-1">Image</th>
            <th className="text-xs sm:text-base font-medium">Name</th>
            <th className="text-xs sm:text-base font-medium">Category</th>
            <th className="text-xs sm:text-base font-medium">Price $</th>
            <th className="text-xs sm:text-base font-medium">In Stock</th>
            <th className="text-xs sm:text-base font-medium">Featured</th>
            <th className="text-xs sm:text-base font-medium">Refill</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            products &&
            products.map((product) => (
              <tr
                key={product.id}
                className="border-y border-dark-gray/20 p-1 hover:bg-dark-gray/20 duration-200"
              >
                <td>
                  <Link to={`/product/${product.id}`} className="block">
                    <img
                      src={`http://localhost:8080/uploads/${product.image}`}
                      className="mx-auto h-8 sm:h-16"
                    />
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/product/${product.id}`} className="block text-xs sm:text-base">
                    {product.name}
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/product/${product.id}`} className="block text-xs sm:text-base">
                    {product.category.name}
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/product/${product.id}`} className="block text-xs sm:text-base">
                    {product.price}
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/product/${product.id}`} className="block text-xs sm:text-base">
                    {product.stockQuantity}
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/product/${product.id}`} className="block text-xs sm:text-base">
                    {product.featured ? "Yes" : "No"}
                  </Link>
                </td>
                <td className="text-center">
                  <div className="w-fit flex items-center gap-2 justify-center mx-auto">
                  <input
                      value={refillQuantities[product.id] || 1} 
                      onChange={(ev) => handleQuantityChange(product.id, ev.target.value)}
                      type="number"
                      min={1}
                      className="block w-12 sm:w-20 border border-secondary/50 sm:p-1 bg-transparent outline-none"
                    />
                    <button
                      disabled={loadingRefill}
                      onClick={() => handleRefill(product.id)}
                      className="bg-secondary text-primary sm:py-1 px-3"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

import { useParams } from "react-router-dom";
import useGetProductsByCategory from "../../hooks/product/useGetProductsByCategory";
import { LoaderIcon } from "react-hot-toast";
import ProductCard from "../../components/product/ProductCard";
import useGetCategories from "../../hooks/category/useGetCategories";
import { useCategoriesContext } from "../../context/CategoriesContext";

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const { loading, products } = useGetProductsByCategory(categoryId);
  const {loading: categoryLoading} = useGetCategories();
  const {categories} = useCategoriesContext();

  const categoryName = categories && categoryId ? categories.find((category) => String(category.id) === String(categoryId))?.name : undefined;
  return (
    <div className="max-container px-5 py-3 mt-5">
      <h1 className="uppercase text-2xl font-semibold text-dark-gray">
        {categoryLoading ? (<LoaderIcon />) : categoryName ? (categoryName) : ("Category not found")}
      </h1>
      {loading && <LoaderIcon />}
      {!loading && (!products || products.length === 0) && <p>No products for selected category.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {!loading &&
          products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;

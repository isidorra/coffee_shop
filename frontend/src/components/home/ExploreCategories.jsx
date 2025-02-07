import { Link } from "react-router-dom";
import { useCategoriesContext } from "../../context/CategoriesContext";
import useGetCategories from "../../hooks/category/useGetCategories";

const ExploreCategories = () => {
    const {loading} = useGetCategories();
    const {categories} = useCategoriesContext();
  return (
    <div className="max-container px-5 py-3 mt-10">
        <h2 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">Explore Categories</h2>

        <div className="grid md:grid-cols-3 gap-5 mt-5">
            {!loading && categories && categories.map((category) =>
                <div key={category.id} className="bg-secondary text-primary flex flex-col gap-5 items-center justify-center py-10">
                    <p className="uppercase text-2xl md:text-4xl">{category.name}</p>
                    <Link to={`/all-products/filter/${category.id}`} className="text-accent border-b border-accent hover:opacity-70 duration-200">See products</Link>
                </div>  
            )}
        </div>
    </div>
  )
}

export default ExploreCategories
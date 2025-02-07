import CreateCategory from "../../components/category/CreateCategory"
import {useCategoriesContext} from "../../context/CategoriesContext";
import useGetCategories from "../../hooks/category/useGetCategories";

const Categories = () => {
    const {loading} = useGetCategories();
    const {categories} = useCategoriesContext();
  return (
    <div className="p-5">
        <h1 className="text-xl sm:text-2xl font-semibold">Categories</h1>
        <CreateCategory/>

        <div className="mt-5 text-sm sm:text-base">
            {!loading && categories && categories.map((category) => 
                <p key={category.id} className="border-b border-dark-gray/20 p-2">
                    {category.name}
                </p>
            )}
        </div>
    </div>
  )
}

export default Categories
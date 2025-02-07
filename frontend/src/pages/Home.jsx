import ExploreCategories from "../components/home/ExploreCategories"
import LatestProducts from "../components/home/LatestProducts"
import FeaturedProduct from "../components/product/FeaturedProduct"

const Home = () => {
  return (
    <div>
      <FeaturedProduct/>
      <LatestProducts/>
      <ExploreCategories/>
    </div>
  )
}

export default Home
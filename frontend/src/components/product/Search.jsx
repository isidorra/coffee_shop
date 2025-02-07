import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useSearch from "../../hooks/product/useSearch";
import { LoaderIcon } from "react-hot-toast";
const Search = () => {
    const [query, setQuery] = useState("");
    const {loading, search} = useSearch();

    const handleSubmit = async(ev) => {
        ev.preventDefault();
        await search(query);
    }
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <input placeholder="Search..." value={query} onChange={ev => setQuery(ev.target.value)} className="bg-transparent border block w-full border-secondary/50 p-[2px] sm:p-1 outline-none"/>
        <button disabled={loading} className="bg-secondary text-primary p-1 sm:p-2">
            {loading ? <LoaderIcon/> : <IoIosSearch />}
        </button>
    </form>
  )
}

export default Search
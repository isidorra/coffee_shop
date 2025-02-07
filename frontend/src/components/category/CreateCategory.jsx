import { useState } from "react";
import useCreateCategorie from "../../hooks/category/useCreateCategorie";
import { LoaderIcon } from "react-hot-toast";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const { loading, createCategory } = useCreateCategorie();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const success = await createCategory(name);
    if(success) setName("");
  };

  return (
    <div className="mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-5 justify-center"
      >
        <input
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          type="text"
          required
          placeholder="New Category"
          className="w-full bg-transparent border border-dark-gray p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />
        <button disabled={loading} className="bg-secondary text-primary py-2 px-5 focus:outline focus:outline-offset-1 focus:outline-secondary/20">
          {loading ? <LoaderIcon/> : <span>Add</span>}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;

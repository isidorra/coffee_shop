import { useState } from "react";
import { useCategoriesContext } from "../../context/CategoriesContext";
import useGetCategories from "../../hooks/category/useGetCategories";
import useCreateProduct from "../../hooks/product/useCreateProduct";
import { LoaderIcon } from "react-hot-toast";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateProduct = () => {
  const { loading } = useGetCategories();
  const { categories } = useCategoriesContext();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [category, setCategory] = useState(0);
  const [file, setFile] = useState(null);

  const { loadingCreating, createProduct } = useCreateProduct();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const success = await createProduct(
      name,
      description,
      category,
      price,
      stockQuantity,
      file
    );
    if (success) {
      setName("");
      setDescription("");
      setPrice(1);
      setStockQuantity(1);
      setCategory(0);
      setFile(null);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl sm:text-2xl font-semibold">New Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <label className="text-sm uppercase block font-semibold mt-3">
              Name
            </label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              required
              className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
            />
          </div>

          <div>
            <label className="text-sm uppercase block font-semibold mt-3">
              Category
            </label>
            <select
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              required
              className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
            >
              <option value={0} disabled>
                Select Category
              </option>
              {!loading &&
                categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm uppercase block font-semibold mt-3">
              Price $
            </label>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
              step="0.01"
              min={1}
              required
              className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
            />
          </div>

          <div>
            <label className="text-sm uppercase block font-semibold mt-3">
              In Stock
            </label>
            <input
              value={stockQuantity}
              onChange={(ev) => setStockQuantity(ev.target.value)}
              type="number"
              min={1}
              required
              className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
            />
          </div>

          <div>
            <label className="text-sm uppercase block font-semibold mt-3">
              Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
            />
          </div>
        </div>

        <div className="mt-5">
            <label className="text-sm uppercase block font-semibold mt-3">
              Description
            </label>
          <ReactQuill theme="snow" className="border border-dark-gray bg-transparent w-full p-1 focus:outline focus:outline-offset-1 focus:outline-secondary/20"  value={description} onChange={newDesc => setDescription(newDesc)} modules={modules}/>
        </div>

        <button disabled={loadingCreating} className="w-full bg-secondary text-primary uppercase p-2 mt-3">
          {loadingCreating ? <LoaderIcon/> : <span>Add</span>}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

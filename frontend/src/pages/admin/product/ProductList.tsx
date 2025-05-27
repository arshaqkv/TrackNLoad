import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Table, { Column } from "../../../components/common/Table";
import {
  deleteProduct,
  getAllProducts,
} from "../../../features/admin/adminThunk";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

const backend = config.app.BACKEND;

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.admin);

  const handleDeleteProduct = async (id: string) => {
    const result = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(getAllProducts());
    } else if (deleteProduct.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const columns: Column<Product>[] = [
    { key: "name", label: "Name" },
    {
      key: "image",
      label: "",
      render: (product) => (
        <img
          src={`${backend}/${product?.image}`}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { key: "price", label: "Price", render: (product) => `₹${product.price}` },
    { key: "category", label: "Category" },

    {
      key: "actions",
      label: "Actions",
      render: (product) => (
        <div className="flex items-center">
          <Link to={`edit/${product._id}`}>
            <Edit className="cursor-pointer" />
          </Link>
          <button onClick={() => handleDeleteProduct(product._id)}>
            <Trash className="ml-2 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Link to={"add"}>
        <button className="mb-4 bg-lime-950 p-2 px-4 text-white rounded cursor-pointer hover:bg-green-800">
          Add Product
        </button>
      </Link>
      <Table columns={columns} data={products} />
    </div>
  );
};

export default ProductsList;

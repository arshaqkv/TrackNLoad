import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "../../../features/admin/adminThunk";
import { useAppDispatch } from "../../../app/hooks";

// TypeScript types
interface ProductFormValues {
  name: string;
  price: number;
  category: string;
  image: File | null;
}

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<any>(null)

const  initialValues: ProductFormValues = {
    name: "",
    price: 0,
    category: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    category: Yup.string()
      .oneOf(
        ["electronics", "clothing", "grocery", "books", "beauty"],
        "Invalid category"
      )
      .required("Category is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (
    values: ProductFormValues,
    { resetForm }: FormikHelpers<ProductFormValues>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("category", values.category);
    if (values.image) {
      formData.append("image", values.image);
    }

    const result = await dispatch(createProduct(formData));
    if (createProduct.fulfilled.match(result)) {
      toast.success(result.payload.message);
      resetForm();
      setPreviewImage(null); // Clear preview
      navigate("/admin/product");
    } else if (createProduct.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Product
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full mt-1 p-2 border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={`w-full mt-1 p-2 border ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className={`w-full mt-1 p-2 border ${
                formik.touched.category && formik.errors.category
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="grocery">Grocery</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  formik.setFieldValue("image", file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              className={`w-full mt-1 p-2 border ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.image}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="mb-4">
              <p className="text-gray-700 mb-1">Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-h-64 object-contain border rounded"
              />
            </div>
          )}

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-lime-950 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full hover:bg-lime-950 hover:text-white mt-2 border font-semibold py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

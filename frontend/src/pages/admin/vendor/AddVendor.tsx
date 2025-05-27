import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createVendor } from "../../../features/admin/adminThunk";
import { useAppDispatch } from "../../../app/hooks";

interface VendorFormValues {
  name: string;
  email: string;
  phone: string;
  location: string;
}

const AddVendor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: VendorFormValues = {
    name: "",
    email: "",
    phone: "",
    location: "",
  };

  const formik = useFormik<VendorFormValues>({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: async (
      values: VendorFormValues,
      { resetForm }: FormikHelpers<VendorFormValues>
    ) => {
      const result = await dispatch(createVendor(values));
      if (createVendor.fulfilled.match(result)) {
        toast.success(result.payload.message);
        resetForm();
        navigate("/admin/vendor");
      } else if (createVendor.rejected.match(result)) {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Vendor
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "text" },
            { name: "location", label: "Location", type: "text" },
          ].map(({ name, label, type }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name as keyof VendorFormValues]}
                className={`w-full mt-1 p-2 border ${
                  formik.touched[name as keyof VendorFormValues] &&
                  formik.errors[name as keyof VendorFormValues]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {formik.touched[name as keyof VendorFormValues] &&
                formik.errors[name as keyof VendorFormValues] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[name as keyof VendorFormValues]}
                  </p>
                )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-lime-950 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Add Vendor
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

export default AddVendor;

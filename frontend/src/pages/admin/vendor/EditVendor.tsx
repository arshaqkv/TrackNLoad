import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../app/store"; // adjust this import based on your setup
import { editVendor, getVendor } from "../../../features/admin/adminThunk";

interface VendorFormValues {
  name: string;
  email: string;
  phone: string;
  location: string;
}

const EditVendor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [vendor, setVendor] = useState<VendorFormValues>({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await dispatch(getVendor(id));
        if (getVendor.fulfilled.match(result)) {
          setVendor(result.payload.vendor);
        }
      }
    };

    fetchData();
  }, [dispatch, id]);

  const formik = useFormik<VendorFormValues>({
    enableReinitialize: true,
    initialValues: vendor,
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
      if (id) {
        const result = await dispatch(editVendor({ id, data: values }));
        if (editVendor.fulfilled.match(result)) {
          toast.success(result.payload.message);
          resetForm();
          navigate("/admin/vendor");
        } else if (editVendor.rejected.match(result)) {
          toast.error(result.payload as string);
        }
      }
    },
  });

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Vendor
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
            Edit Vendor
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

export default EditVendor;

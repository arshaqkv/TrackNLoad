import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../app/hooks";
import { createTruckDriver } from "../../../features/admin/adminThunk";

type TruckDriverFormValues = {
  name: string;
  mobile: string;
  address: string;
  password: string;
  dlNumber: string;
};

const AddTruckDriver: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: TruckDriverFormValues = {
    name: "",
    mobile: "",
    address: "",
    password: "",
    dlNumber: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    dlNumber: Yup.string()
      .matches(/^[A-Z]{2}[0-9]{6}$/, "Invalid number (e.g., DK129303)")
      .required("Driving License number is required"),
  });

  const onSubmit = async (
    values: TruckDriverFormValues,
    { resetForm }: FormikHelpers<TruckDriverFormValues>
  ) => {
    const result = await dispatch(createTruckDriver(values));
    if (createTruckDriver.fulfilled.match(result)) {
      toast.success(result.payload.message);
      resetForm();
      navigate("/admin/truck-driver");
    } else if (createTruckDriver.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  const formik = useFormik<TruckDriverFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Truck Driver
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "mobile", label: "Mobile", type: "text", maxLength: 10 },
            { name: "address", label: "Address", type: "text" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "dlNumber",
              label: "Driving License Number",
              type: "text",
            },
          ].map(({ name, label, type, maxLength }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                maxLength={maxLength}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name as keyof TruckDriverFormValues]}
                className={`w-full mt-1 p-2 border ${
                  formik.touched[name as keyof TruckDriverFormValues] &&
                  formik.errors[name as keyof TruckDriverFormValues]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {formik.touched[name as keyof TruckDriverFormValues] &&
                formik.errors[name as keyof TruckDriverFormValues] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[name as keyof TruckDriverFormValues]}
                  </p>
                )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-lime-950 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Add Driver
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

export default AddTruckDriver;

import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  editTruckDriver,
  getTruckDriver,
} from "../../../features/admin/adminThunk";
import { useAppDispatch } from "../../../app/hooks";

interface TruckDriver {
  name: string;
  mobile: string;
  address: string;
  dlNumber: string;
}

const EditTruckDriver: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [driver, setDriver] = useState<TruckDriver>({
    name: "",
    mobile: "",
    address: "",
    dlNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const result = await dispatch(getTruckDriver(id));
      if (getTruckDriver.fulfilled.match(result)) {
        setDriver(result.payload.user);
      }
    };
    fetchUser();
  }, [dispatch, id]);

  const formik = useFormik<TruckDriver>({
    enableReinitialize: true,
    initialValues: driver,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      address: Yup.string().required("Address is required"),
      dlNumber: Yup.string()
        .matches(/^[A-Z]{2}[0-9]{6}$/, "Invalid number(e.g., DK129303)")
        .required("Driving License number is required"),
    }),
    onSubmit: async (
      values: TruckDriver,
      { resetForm }: FormikHelpers<TruckDriver>
    ) => {
      if (!id) return;
      const result = await dispatch(editTruckDriver({ id, data: values }));
      if (editTruckDriver.fulfilled.match(result)) {
        toast.success(result.payload.message);
        resetForm();
        navigate("/admin/truck-driver");
      } else if (editTruckDriver.rejected.match(result)) {
        toast.error(result.payload as string);
      }
    },
  });

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Truck Driver
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "mobile", label: "Mobile", type: "text", maxLength: 10 },
            { name: "address", label: "Address", type: "text" },
            { name: "dlNumber", label: "Driving License Number", type: "text" },
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
                value={formik.values[name as keyof TruckDriver]}
                className={`w-full mt-1 p-2 border ${
                  formik.touched[name as keyof TruckDriver] &&
                  formik.errors[name as keyof TruckDriver]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {formik.touched[name as keyof TruckDriver] &&
                formik.errors[name as keyof TruckDriver] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[name as keyof TruckDriver]}
                  </p>
                )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-lime-950 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Update Driver
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

export default EditTruckDriver;

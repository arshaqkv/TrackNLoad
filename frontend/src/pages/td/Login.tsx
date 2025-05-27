import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar";
import { loginUser } from "../../features/user/authThunk";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormValues {
  mobile: string;
  password: string;
}

const Login: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (
      values: LoginFormValues,
      { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
      const result = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        navigate("/");
      } else if (loginUser.rejected.match(result)) {
        toast.error(result.payload as string);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            TrackNLoad Login
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                {...formik.getFieldProps("mobile")}
                className={`w-full mt-1 p-2 border rounded ${
                  formik.touched.mobile && formik.errors.mobile
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Enter your mobile"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.mobile}
                </p>
              )}
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                className={`w-full mt-1 p-2 border rounded ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}

              <button
                type="button"
                className="absolute top-10 right-3 hover:cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeOff className="size-5 text-gray-400" />
                ) : (
                  <Eye className="size-5 text-gray-400" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-2 rounded"
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getVendorsForTD } from "../../features/user/authThunk";

const SelectVendor = () => {
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVendorsForTD());
  }, []);

  const selectVendor = (vendorId: string) => {
    localStorage.setItem("selectedVendor", vendorId);
    navigate("/create-order");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Select a Vendor
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors?.map((vendor: any) => (
          <div
            key={vendor._id}
            onClick={() => selectVendor(vendor._id)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">
              {vendor.name}
            </h3>
            <p className="text-gray-500">{vendor.location}</p>
            <p>{vendor.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectVendor;

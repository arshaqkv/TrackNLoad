import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Table, { Column } from "../../../components/common/Table";
import {
  deleteVendor,
  getAllVendors,
} from "../../../features/admin/adminThunk";
import toast from "react-hot-toast";

type Vendor = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
};

const VendorsList = () => {
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.admin);

  const columns: Column<Vendor>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
    {
      key: "actions",
      label: "Actions",
      render: (vendor) => (
        <div className="flex items-center">
          <Link to={`edit/${vendor._id}`}>
            <Edit className="cursor-pointer" />
          </Link>
          <button onClick={() => handleDeleteVendor(vendor._id)}>
            <Trash className="ml-2 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteVendor = async (id: string) => {
    const result = await dispatch(deleteVendor(id));
    if (deleteVendor.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(getAllVendors());
    } else if (deleteVendor.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  useEffect(() => {
    dispatch(getAllVendors());
  }, [dispatch]);
  return (
    <div className="p-6">
      <Link to={"add"}>
        <button className="mb-4 bg-lime-950 p-2 px-4 text-white rounded cursor-pointer hover:bg-green-800">
          Add Vendor
        </button>
      </Link>
      <Table columns={columns} data={vendors} />
    </div>
  );
};

export default VendorsList;

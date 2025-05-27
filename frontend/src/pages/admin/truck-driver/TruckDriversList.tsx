import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteTruckDriver,
  getAllTruckDrivers,
} from "../../../features/admin/adminThunk";
import Table, { Column } from "../../../components/common/Table";
import toast from "react-hot-toast";

type TruckDriver = {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  dlNumber: string;
};

const TruckDriversList = () => {
  const dispatch = useAppDispatch();
  const { truckDrivers } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllTruckDrivers());
  }, [dispatch]);

  const columns: Column<TruckDriver>[] = [
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile" },
    { key: "address", label: "Address" },
    { key: "dlNumber", label: "Driving Licence No" },
    {
      key: "actions",
      label: "Actions",
      render: (driver) => (
        <div className="flex items-center">
          <Link to={`edit/${driver._id}`}>
            <Edit className="cursor-pointer" />
          </Link>
          <button onClick={() => handleDeleteTD(driver._id)}>
            <Trash className="ml-2 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteTD = async (id: string) => {
    const result = await dispatch(deleteTruckDriver(id));
    if (deleteTruckDriver.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(getAllTruckDrivers());
    } else if (deleteTruckDriver.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };
  return (
    <div className="p-6">
      <Link to={"add"}>
        <button className="mb-4 bg-lime-950 p-2 px-4 text-white rounded cursor-pointer hover:bg-green-800">
          Add User
        </button>
      </Link>
      <Table columns={columns} data={truckDrivers} />
    </div>
  );
};

export default TruckDriversList;

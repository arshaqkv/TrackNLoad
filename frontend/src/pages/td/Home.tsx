import { useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar";
import SelectVendor from "../../components/td/SelectVendor";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      
      <Navbar />
      <h1 className="text-center font-semibold p-4 ">Welcome back {user?.name}</h1>
      <SelectVendor />
    </>
  );
};

export default Home;
